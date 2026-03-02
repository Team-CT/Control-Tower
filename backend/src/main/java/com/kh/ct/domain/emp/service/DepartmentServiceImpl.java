package com.kh.ct.domain.emp.service;

import com.kh.ct.domain.emp.dto.DepartmentDto;
import com.kh.ct.domain.emp.entity.Department;
import com.kh.ct.domain.emp.entity.Emp;
import com.kh.ct.domain.emp.repository.DepartmentRepository;
import com.kh.ct.domain.emp.repository.EmpRepository;
import com.kh.ct.global.common.CommonEnums;
import com.kh.ct.global.exception.BusinessException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DepartmentServiceImpl implements DepartmentService {

    private final DepartmentRepository departmentRepository;
    private final EmpRepository empRepository;

    @Override
    public Page<DepartmentDto.ListItem> getDepartmentList(String q, Pageable pageable) {

        Page<Department> page = departmentRepository.findTopDepartments(
                CommonEnums.CommonStatus.Y,
                q,
                pageable
        );

        List<Department> departments = page.getContent();
        if (departments.isEmpty()) return page.map(this::toListItemWithCountsZero);

        List<Long> deptIds = departments.stream()
                .map(Department::getDepartmentId)
                .filter(Objects::nonNull)
                .toList();

        // ✅ 직원 수 집계 (부서 N개여도 쿼리 1번)
        Map<Long, Integer> memberCountMap = empRepository
                .countEmployeesByDepartmentIds(deptIds, CommonEnums.EmpStatus.Y)
                .stream()
                .collect(Collectors.toMap(
                        EmpRepository.DeptEmpCountView::getDepartmentId,
                        v -> v.getCnt() == null ? 0 : v.getCnt().intValue()
                ));

        // ✅ 팀(자식 부서) 수 집계 (N+1 방지)
        Map<Long, Integer> teamCountMap = departmentRepository
                .countChildrenByParentIds(deptIds, CommonEnums.CommonStatus.Y)
                .stream()
                .collect(Collectors.toMap(
                        DepartmentRepository.ChildCountView::getParentId,
                        v -> v.getCnt() == null ? 0 : v.getCnt().intValue()
                ));

        return page.map(d -> {
            DepartmentDto.ListItem.ManagerInfo managerInfo = toManagerInfo(d.getManager());

            int totalMembers = memberCountMap.getOrDefault(d.getDepartmentId(), 0);
            int totalTeams = teamCountMap.getOrDefault(d.getDepartmentId(), 0);

            return DepartmentDto.ListItem.builder()
                    .id(d.getDepartmentId())
                    .name(d.getDepartmentName())
                    .description(d.getDescription())
                    .manager(managerInfo)
                    .totalMembers(totalMembers)
                    .totalTeams(totalTeams)
                    .build();
        });
    }

    @Override
    public DepartmentDto.DetailResponse getDepartmentDetail(Long deptId) {

        validateDeptId(deptId);

        Department dept = departmentRepository.findByIdWithManager(deptId)
                .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND,
                        "부서를 찾을 수 없습니다. deptId=" + deptId));

        if (dept.getDepartmentStatus() == CommonEnums.CommonStatus.N) {
            throw new BusinessException(HttpStatus.CONFLICT, "비활성화된 부서입니다.");
        }

        // ✅ 하위 팀 목록
        List<Department> children = departmentRepository.findChildren(
                deptId, CommonEnums.CommonStatus.Y
        );

        // ✅ 부서(본인 + 자식들) 직원 수를 한번에 집계
        List<Long> countTargetIds = new ArrayList<>();
        countTargetIds.add(deptId);
        for (Department c : children) {
            if (c.getDepartmentId() != null) countTargetIds.add(c.getDepartmentId());
        }

        Map<Long, Integer> memberCountMap = empRepository
                .countEmployeesByDepartmentIds(countTargetIds, CommonEnums.EmpStatus.Y)
                .stream()
                .collect(Collectors.toMap(
                        EmpRepository.DeptEmpCountView::getDepartmentId,
                        v -> v.getCnt() == null ? 0 : v.getCnt().intValue()
                ));

        int deptMemberCount = memberCountMap.getOrDefault(deptId, 0);

        String managerDisplay = toManagerDisplay(dept.getManager());

        DepartmentDto.DetailResponse.DeptInfo deptInfo =
                DepartmentDto.DetailResponse.DeptInfo.builder()
                        .id(dept.getDepartmentId())
                        .name(dept.getDepartmentName())
                        .engName(null)
                        .manager(managerDisplay)
                        .totalMembers(deptMemberCount)
                        .location(null)
                        .phone(null)
                        .description(dept.getDescription())
                        .build();

        List<DepartmentDto.DetailResponse.SubTeam> subTeams =
                children.stream()
                        .map(c -> DepartmentDto.DetailResponse.SubTeam.builder()
                                .id(c.getDepartmentId())
                                .name(c.getDepartmentName())
                                .leader(toLeaderName(c.getManager()))
                                .count(memberCountMap.getOrDefault(c.getDepartmentId(), 0))
                                .task(null)
                                .build())
                        .toList();

        return DepartmentDto.DetailResponse.builder()
                .deptInfo(deptInfo)
                .subTeams(subTeams)
                .build();
    }

    /* =========================================================
     * ✅ 생성
     * ========================================================= */
    @Override
    @Transactional
    public DepartmentDto.ListItem createDepartment(DepartmentDto.CreateRequest req) {

        if (req == null) throw new BusinessException(HttpStatus.BAD_REQUEST, "요청 바디가 비어 있습니다.");

        String name = safe(req.getDepartmentName()).trim();
        if (name.isEmpty()) throw new BusinessException(HttpStatus.BAD_REQUEST, "departmentName은 필수입니다.");

        departmentRepository.findByDepartmentNameAndDepartmentStatus(name, CommonEnums.CommonStatus.Y)
                .ifPresent(d -> { throw new BusinessException(HttpStatus.CONFLICT, "이미 존재하는 활성 부서명입니다."); });

        Department parent = null;
        if (req.getParentDepartmentId() != null) {
            parent = departmentRepository.findById(req.getParentDepartmentId())
                    .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "상위 부서를 찾을 수 없습니다."));
        }

        Emp manager = null;
        if (req.getManagerEmpId() != null && !req.getManagerEmpId().trim().isEmpty()) {
            String managerEmpId = req.getManagerEmpId().trim();
            manager = empRepository.findByEmpIdAndEmpStatus(managerEmpId, CommonEnums.EmpStatus.Y)
                    .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "부서장(담당자)을 찾을 수 없습니다."));
        }

        Department saved = departmentRepository.save(
                Department.builder()
                        .departmentName(name)
                        .parentDepartment(parent)
                        .manager(manager)
                        .description(req.getDescription())
                        .departmentStatus(CommonEnums.CommonStatus.Y)
                        .build()
        );

        // 생성 직후 직원/팀 수는 0으로 DTO 반환
        return toListItem(saved, 0, 0);
    }

    /* =========================================================
     * ✅ 하위 조직 생성
     * ========================================================= */
    @Override
    @Transactional
    public DepartmentDto.ListItem createChildDepartment(Long parentDeptId, DepartmentDto.CreateChildRequest req) {

        validateDeptId(parentDeptId);
        if (req == null) throw new BusinessException(HttpStatus.BAD_REQUEST, "요청 바디가 비어 있습니다.");

        Department parent = departmentRepository.findById(parentDeptId)
                .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "상위 부서를 찾을 수 없습니다. deptId=" + parentDeptId));

        if (parent.getDepartmentStatus() == CommonEnums.CommonStatus.N) {
            throw new BusinessException(HttpStatus.CONFLICT, "비활성화된 상위 부서에는 생성할 수 없습니다.");
        }

        String name = safe(req.getDepartmentName()).trim();
        if (name.isEmpty()) throw new BusinessException(HttpStatus.BAD_REQUEST, "departmentName은 필수입니다.");

        departmentRepository.findByDepartmentNameAndDepartmentStatus(name, CommonEnums.CommonStatus.Y)
                .ifPresent(d -> { throw new BusinessException(HttpStatus.CONFLICT, "이미 존재하는 활성 부서명입니다."); });

        Emp manager = null;
        if (req.getManagerEmpId() != null && !req.getManagerEmpId().trim().isEmpty()) {
            manager = empRepository.findByEmpIdAndEmpStatus(req.getManagerEmpId().trim(), CommonEnums.EmpStatus.Y)
                    .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "부서장(담당자)을 찾을 수 없습니다."));
        }

        Department saved = departmentRepository.save(
                Department.builder()
                        .departmentName(name)
                        .parentDepartment(parent)
                        .manager(manager)
                        .description(req.getDescription())
                        .departmentStatus(CommonEnums.CommonStatus.Y)
                        .build()
        );

        return toListItem(saved, 0, 0);
    }

    /* =========================================================
     * ✅ 수정
     * ========================================================= */
    @Override
    @Transactional
    public DepartmentDto.ListItem updateDepartment(Long deptId, DepartmentDto.UpdateRequest req) {

        validateDeptId(deptId);
        if (req == null) throw new BusinessException(HttpStatus.BAD_REQUEST, "요청 바디가 비어 있습니다.");

        Department dept = departmentRepository.findByIdWithManager(deptId)
                .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "부서를 찾을 수 없습니다. deptId=" + deptId));

        if (dept.getDepartmentStatus() == CommonEnums.CommonStatus.N) {
            throw new BusinessException(HttpStatus.CONFLICT, "비활성화된 부서는 수정할 수 없습니다.");
        }

        if (req.getDepartmentName() != null) {
            String newName = req.getDepartmentName().trim();
            if (newName.isEmpty()) throw new BusinessException(HttpStatus.BAD_REQUEST, "departmentName은 비워둘 수 없습니다.");

            if (!newName.equals(dept.getDepartmentName())) {
                departmentRepository.findByDepartmentNameAndDepartmentStatus(newName, CommonEnums.CommonStatus.Y)
                        .ifPresent(d -> { throw new BusinessException(HttpStatus.CONFLICT, "이미 존재하는 활성 부서명입니다."); });
                dept.changeName(newName);
            }
        }

        if (req.getManagerEmpId() != null) {
            String managerEmpId = req.getManagerEmpId().trim();
            if (managerEmpId.isEmpty()) {
                dept.changeManager(null);
            } else {
                Emp manager = empRepository.findByEmpIdAndEmpStatus(managerEmpId, CommonEnums.EmpStatus.Y)
                        .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "부서장(담당자)을 찾을 수 없습니다."));
                dept.changeManager(manager);
            }
        }

        if (req.getDescription() != null) {
            dept.changeDescription(req.getDescription());
        }

        // ✅ 수정 후 최신 카운트 계산해서 반환(정확)
        int members = (int) empRepository.countByDepartmentId_DepartmentIdAndEmpStatus(deptId, CommonEnums.EmpStatus.Y);
        int teams = departmentRepository.existsByParentDepartment_DepartmentId(deptId)
                ? (int) departmentRepository.countChildrenByParentIds(List.of(deptId), CommonEnums.CommonStatus.Y)
                .stream().findFirst().map(v -> v.getCnt().intValue()).orElse(0)
                : 0;

        return toListItem(dept, members, teams);
    }

    /* =========================================================
     * ✅ 구성원 목록
     * ========================================================= */
    @Override
    public List<DepartmentDto.MemberItem> getDepartmentMembers(Long deptId) {

        validateDeptId(deptId);

        Department dept = departmentRepository.findById(deptId)
                .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "부서를 찾을 수 없습니다. deptId=" + deptId));

        if (dept.getDepartmentStatus() == CommonEnums.CommonStatus.N) {
            throw new BusinessException(HttpStatus.CONFLICT, "비활성화된 부서입니다.");
        }

        List<Emp> members = empRepository.findByDepartmentId_DepartmentId(deptId);

        return members.stream().map(e -> DepartmentDto.MemberItem.builder()
                .empId(e.getEmpId())
                .empNo(e.getEmpNo())
                .empName(e.getEmpName())
                .departmentName(dept.getDepartmentName())
                .role(e.getRole() == null ? null : e.getRole().name())
                .job(e.getJob())
                .phone(e.getPhone())
                .email(e.getEmail())
                .empStatus(e.getEmpStatus() == null ? null : e.getEmpStatus().name())
                .build()).toList();
    }

    /* =========================================================
     * ✅ 구성원 추가(배정) - empCount 증감 삭제
     * ========================================================= */
    @Override
    @Transactional
    public DepartmentDto.MemberItem addDepartmentMember(Long deptId, DepartmentDto.MemberAddRequest req) {

        validateDeptId(deptId);
        if (req == null || req.getEmpId() == null || req.getEmpId().trim().isEmpty()) {
            throw new BusinessException(HttpStatus.BAD_REQUEST, "empId는 필수입니다.");
        }

        Department dept = departmentRepository.findById(deptId)
                .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "부서를 찾을 수 없습니다. deptId=" + deptId));

        if (dept.getDepartmentStatus() == CommonEnums.CommonStatus.N) {
            throw new BusinessException(HttpStatus.CONFLICT, "비활성화된 부서에는 배정할 수 없습니다.");
        }

        Emp emp = empRepository.findByEmpIdAndEmpStatus(req.getEmpId().trim(), CommonEnums.EmpStatus.Y)
                .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "직원을 찾을 수 없습니다. empId=" + req.getEmpId()));

        // 멱등: 이미 같은 부서면 그대로 반환
        if (emp.getDepartmentId() != null
                && emp.getDepartmentId().getDepartmentId() != null
                && emp.getDepartmentId().getDepartmentId().equals(deptId)) {
            return DepartmentDto.MemberItem.builder()
                    .empId(emp.getEmpId())
                    .empNo(emp.getEmpNo())
                    .empName(emp.getEmpName())
                    .departmentName(dept.getDepartmentName())
                    .role(emp.getRole() == null ? null : emp.getRole().name())
                    .job(emp.getJob())
                    .phone(emp.getPhone())
                    .email(emp.getEmail())
                    .empStatus(emp.getEmpStatus() == null ? null : emp.getEmpStatus().name())
                    .build();
        }

        // ✅ 배정만 수행 (카운트는 조회 시 COUNT로 해결)
        emp.changeDepartment(dept);

        return DepartmentDto.MemberItem.builder()
                .empId(emp.getEmpId())
                .empNo(emp.getEmpNo())
                .empName(emp.getEmpName())
                .departmentName(dept.getDepartmentName())
                .role(emp.getRole() == null ? null : emp.getRole().name())
                .job(emp.getJob())
                .phone(emp.getPhone())
                .email(emp.getEmail())
                .empStatus(emp.getEmpStatus() == null ? null : emp.getEmpStatus().name())
                .build();
    }

    /* =========================================================
     * ✅ 구성원 제거(해제) - empCount 증감 삭제
     * ========================================================= */
    @Override
    @Transactional
    public void removeDepartmentMember(Long deptId, String empId) {

        validateDeptId(deptId);
        if (empId == null || empId.trim().isEmpty()) throw new BusinessException(HttpStatus.BAD_REQUEST, "empId가 비어 있습니다.");

        Department dept = departmentRepository.findById(deptId)
                .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "부서를 찾을 수 없습니다. deptId=" + deptId));

        if (dept.getDepartmentStatus() == CommonEnums.CommonStatus.N) {
            throw new BusinessException(HttpStatus.CONFLICT, "비활성화된 부서입니다.");
        }

        Emp emp = empRepository.findByEmpIdAndEmpStatus(empId.trim(), CommonEnums.EmpStatus.Y)
                .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "직원을 찾을 수 없습니다. empId=" + empId));

        if (emp.getDepartmentId() == null
                || emp.getDepartmentId().getDepartmentId() == null
                || !emp.getDepartmentId().getDepartmentId().equals(deptId)) {
            throw new BusinessException(HttpStatus.CONFLICT, "해당 직원은 이 부서에 소속되어 있지 않습니다.");
        }

        emp.changeDepartment(null);
    }

    /* =========================================================
     * ✅ 비활성화(트리 전체) - resetCount 제거
     * ========================================================= */
    @Override
    @Transactional
    public void deactivateDepartment(Long deptId) {

        validateDeptId(deptId);

        Department dept = departmentRepository.findById(deptId)
                .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND,
                        "부서를 찾을 수 없습니다. deptId=" + deptId));

        if (dept.getDepartmentStatus() == CommonEnums.CommonStatus.N) return;

        List<Long> treeIds = collectDepartmentTreeIds(deptId);

        // 구성원 소속 해제
        empRepository.bulkDetachDepartment(treeIds);

        // 부서 트리 비활성화
        departmentRepository.bulkDeactivate(treeIds, CommonEnums.CommonStatus.N);
    }

    /* =========================
       Helper
     ========================= */

    private void validateDeptId(Long deptId) {
        if (deptId == null || deptId <= 0) throw new BusinessException(HttpStatus.BAD_REQUEST, "deptId가 올바르지 않습니다.");
    }

    private List<Long> collectDepartmentTreeIds(Long rootId) {
        ArrayDeque<Long> dq = new ArrayDeque<>();
        ArrayList<Long> ids = new ArrayList<>();
        dq.add(rootId);

        while (!dq.isEmpty()) {
            Long currentId = dq.poll();
            ids.add(currentId);

            List<Department> children = departmentRepository.findChildrenAll(currentId);
            for (Department c : children) dq.add(c.getDepartmentId());
        }
        return ids;
    }

    private DepartmentDto.ListItem toListItemWithCountsZero(Department d) {
        return toListItem(d, 0, 0);
    }

    private DepartmentDto.ListItem toListItem(Department d, int members, int teams) {
        return DepartmentDto.ListItem.builder()
                .id(d.getDepartmentId())
                .name(d.getDepartmentName())
                .description(d.getDescription())
                .manager(toManagerInfo(d.getManager()))
                .totalMembers(Math.max(members, 0))
                .totalTeams(Math.max(teams, 0))
                .build();
    }

    private DepartmentDto.ListItem.ManagerInfo toManagerInfo(Emp manager) {
        if (manager == null) return null;

        String name = safe(manager.getEmpName());
        String roleText = null;

        if (manager.getJob() != null && !manager.getJob().isBlank()) roleText = manager.getJob();
        else if (manager.getRole() != null) roleText = manager.getRole().name();

        return DepartmentDto.ListItem.ManagerInfo.builder()
                .name(name)
                .role(roleText)
                .build();
    }

    private String toManagerDisplay(Emp manager) {
        if (manager == null) return null;

        String name = safe(manager.getEmpName());
        String roleText = null;

        if (manager.getJob() != null && !manager.getJob().isBlank()) roleText = manager.getJob();
        else if (manager.getRole() != null) roleText = manager.getRole().name();

        if (roleText == null || roleText.isBlank()) return name;
        return name + " " + roleText;
    }

    private String toLeaderName(Emp leader) {
        if (leader == null) return null;
        return safe(leader.getEmpName());
    }

    private String safe(String s) {
        return s == null ? "" : s;
    }
}