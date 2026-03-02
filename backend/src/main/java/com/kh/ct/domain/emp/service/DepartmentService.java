package com.kh.ct.domain.emp.service;

import com.kh.ct.domain.emp.dto.DepartmentDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface DepartmentService {
    Page<DepartmentDto.ListItem> getDepartmentList(String q, Pageable pageable);
    DepartmentDto.DetailResponse getDepartmentDetail(Long deptId);

    DepartmentDto.ListItem createDepartment(DepartmentDto.CreateRequest req);
    DepartmentDto.ListItem updateDepartment(Long departmentId, DepartmentDto.UpdateRequest req);
    void deactivateDepartment(Long departmentId);

    DepartmentDto.ListItem createChildDepartment(Long parentDeptId, DepartmentDto.CreateChildRequest req);

    List<DepartmentDto.MemberItem> getDepartmentMembers(Long deptId);
    DepartmentDto.MemberItem addDepartmentMember(Long deptId, DepartmentDto.MemberAddRequest req);
    void removeDepartmentMember(Long deptId, String empId);
}