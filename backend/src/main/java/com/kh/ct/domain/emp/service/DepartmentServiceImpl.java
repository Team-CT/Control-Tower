package com.kh.ct.domain.emp.service;

import com.kh.ct.domain.emp.dto.DepartmentDto;
import com.kh.ct.domain.emp.entity.Department;
import com.kh.ct.domain.emp.entity.Emp;
import com.kh.ct.domain.emp.repository.DepartmentRepository;
import com.kh.ct.global.common.CommonEnums;
import com.kh.ct.global.exception.BusinessException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DepartmentServiceImpl implements DepartmentService {

    private final DepartmentRepository departmentRepository;

    @Override
    public Page<DepartmentDto.ListItem> getDepartmentList(String q, Pageable pageable) {

        Page<Department> page = departmentRepository.findTopDepartments(
                CommonEnums.CommonStatus.Y,
                q,
                pageable
        );

        return page.map(d -> {
            DepartmentDto.ListItem.ManagerInfo managerInfo = toManagerInfo(d.getManager());

            return DepartmentDto.ListItem.builder()
                    .id(d.getDepartmentId())
                    .name(d.getDepartmentName())
                    .description(d.getDescription())
                    .manager(managerInfo)
                    .totalMembers(d.getEmpCount() == null ? 0 : d.getEmpCount())
                    .totalTeams(d.getChildren() == null ? 0 : d.getChildren().size()) // ⚠ N+1 가능
                    .build();
        });
    }

    @Override
    public DepartmentDto.DetailResponse getDepartmentDetail(Long deptId) {

        if (deptId == null || deptId <= 0) {
            throw new BusinessException(HttpStatus.BAD_REQUEST, "deptId가 올바르지 않습니다.");
        }

        Department dept = departmentRepository.findByIdWithManager(deptId)
                .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND,
                        "부서를 찾을 수 없습니다. deptId=" + deptId));

        List<Department> children = departmentRepository.findChildren(
                deptId, CommonEnums.CommonStatus.Y
        );

        // 화면 상단용 manager 문자열
        String managerDisplay = toManagerDisplay(dept.getManager());

        DepartmentDto.DetailResponse.DeptInfo deptInfo =
                DepartmentDto.DetailResponse.DeptInfo.builder()
                        .id(dept.getDepartmentId())
                        .name(dept.getDepartmentName())
                        .engName(null)
                        .manager(managerDisplay)
                        .totalMembers(dept.getEmpCount() == null ? 0 : dept.getEmpCount())
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
                                .count(c.getEmpCount() == null ? 0 : c.getEmpCount())
                                .task(null)
                                .build())
                        .toList();

        return DepartmentDto.DetailResponse.builder()
                .deptInfo(deptInfo)
                .subTeams(subTeams)
                .build();
    }

    /**
     * ✅ 목록 카드용 manager 객체 변환
     * - Emp 엔티티의 실제 필드명에 맞춰 수정 필요
     */
    private DepartmentDto.ListItem.ManagerInfo toManagerInfo(Emp manager) {
        if (manager == null) return null;

        // ⚠️ 아래 2줄의 getter는 Emp 엔티티에 맞게 조정해야 함
        String name = safe(manager.getEmpName());
        String role = null;

        // 예시: Emp에 job/role 중 하나가 있다고 가정
        // - 프로젝트에 맞게 하나만 남기면 됨
        try {
            // 만약 manager.getJob()이 있으면 사용
            role = (String) manager.getClass().getMethod("getJob").invoke(manager);
        } catch (Exception ignore) {
            // manager.getRole()이 있으면 사용
            try {
                role = String.valueOf(manager.getClass().getMethod("getRole").invoke(manager));
            } catch (Exception ignore2) {
                role = null;
            }
        }

        return DepartmentDto.ListItem.ManagerInfo.builder()
                .name(name)
                .role(role)
                .build();
    }

    /**
     * ✅ 상세 화면 상단용 문자열 ("박지훈 전무" 같은 형태)
     */
    private String toManagerDisplay(Emp manager) {
        if (manager == null) return null;

        String name = safe(manager.getEmpName());
        String role = null;

        try {
            role = (String) manager.getClass().getMethod("getJob").invoke(manager);
        } catch (Exception ignore) {
            try {
                role = String.valueOf(manager.getClass().getMethod("getRole").invoke(manager));
            } catch (Exception ignore2) {
                role = null;
            }
        }

        if (role == null || role.isBlank()) return name;
        return name + " " + role;
    }

    private String toLeaderName(Emp leader) {
        if (leader == null) return null;
        return safe(leader.getEmpName());
    }

    private String safe(String s) {
        return s == null ? "" : s;
    }
}