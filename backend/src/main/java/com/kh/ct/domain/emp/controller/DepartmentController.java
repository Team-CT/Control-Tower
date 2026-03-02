package com.kh.ct.domain.emp.controller;

import com.kh.ct.domain.emp.dto.DepartmentDto;
import com.kh.ct.domain.emp.service.DepartmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/departments")
public class DepartmentController {

    private final DepartmentService departmentService;

    @GetMapping
    public DepartmentDto.ApiResponse<?> list(
            @RequestParam(required = false) String q,
            @PageableDefault(size = 12, sort = "departmentId", direction = Sort.Direction.ASC) Pageable pageable
    ) {
        return DepartmentDto.ApiResponse.ok(departmentService.getDepartmentList(q, pageable));
    }

    @GetMapping("/{deptId}")
    public DepartmentDto.ApiResponse<?> detail(@PathVariable Long deptId) {
        return DepartmentDto.ApiResponse.ok(departmentService.getDepartmentDetail(deptId));
    }

    @PostMapping
    public DepartmentDto.ApiResponse<?> create(@RequestBody DepartmentDto.CreateRequest req) {
        return DepartmentDto.ApiResponse.ok(departmentService.createDepartment(req));
    }

    // ✅ 하위 조직 생성(팀도 Department)
    @PostMapping("/{deptId}/children")
    public DepartmentDto.ApiResponse<?> createChild(
            @PathVariable Long deptId,
            @RequestBody DepartmentDto.CreateChildRequest req
    ) {
        return DepartmentDto.ApiResponse.ok(departmentService.createChildDepartment(deptId, req));
    }

    @PutMapping("/{deptId}")
    public DepartmentDto.ApiResponse<?> update(
            @PathVariable Long deptId,
            @RequestBody DepartmentDto.UpdateRequest req
    ) {
        return DepartmentDto.ApiResponse.ok(departmentService.updateDepartment(deptId, req));
    }

    @DeleteMapping("/{deptId}")
    public DepartmentDto.ApiResponse<?> deactivate(@PathVariable Long deptId) {
        departmentService.deactivateDepartment(deptId);
        return DepartmentDto.ApiResponse.ok("부서 비활성화 완료");
    }

    // ✅ 구성원 목록
    @GetMapping("/{deptId}/members")
    public DepartmentDto.ApiResponse<?> members(@PathVariable Long deptId) {
        return DepartmentDto.ApiResponse.ok(departmentService.getDepartmentMembers(deptId));
    }

    // ✅ 구성원 추가(배정)
    @PostMapping("/{deptId}/members")
    public DepartmentDto.ApiResponse<?> addMember(
            @PathVariable Long deptId,
            @RequestBody DepartmentDto.MemberAddRequest req
    ) {
        return DepartmentDto.ApiResponse.ok(departmentService.addDepartmentMember(deptId, req));
    }

    // ✅ 구성원 제거(해제)
    @DeleteMapping("/{deptId}/members/{empId}")
    public DepartmentDto.ApiResponse<?> removeMember(
            @PathVariable Long deptId,
            @PathVariable String empId
    ) {
        departmentService.removeDepartmentMember(deptId, empId);
        return DepartmentDto.ApiResponse.ok("구성원 제거 완료");
    }
}