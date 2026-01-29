package com.kh.ct.domain.health.service;

import com.kh.ct.domain.health.dto.HealthDto;
import org.springframework.web.multipart.MultipartFile;

public interface HealthService {

    public HealthDto.PhysicalTestResponse preview(MultipartFile file);

    public Long save(MultipartFile pdfFile, String empId, HealthDto.PhysicalTestRequest body);

    public HealthDto.PhysicalTestDetailResponse getEmpPhysicalTestById(String empId, Long physicalTestId);
}
