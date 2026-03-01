package com.kh.ct.domain.emp.service;

import com.kh.ct.domain.emp.dto.DepartmentDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface DepartmentService {
    Page<DepartmentDto.ListItem> getDepartmentList(String q, Pageable pageable);
    DepartmentDto.DetailResponse getDepartmentDetail(Long deptId);
}