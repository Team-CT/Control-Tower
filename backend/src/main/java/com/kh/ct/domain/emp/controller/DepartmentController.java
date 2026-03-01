package com.kh.ct.domain.emp.controller;

import com.kh.ct.domain.emp.dto.DepartmentDto;
import com.kh.ct.domain.emp.service.DepartmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
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
}