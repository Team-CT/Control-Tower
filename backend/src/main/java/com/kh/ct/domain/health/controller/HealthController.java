package com.kh.ct.domain.health.controller;

import com.kh.ct.domain.health.dto.HealthDto;
import com.kh.ct.domain.health.service.HealthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/health")
@RequiredArgsConstructor
@Validated
public class HealthController {

    private final HealthService healthService;

    /**
     * 건강 정보 텍스트 추출
     * @param file
     * @return
     */
    @PostMapping(value = "/preview", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<HealthDto.PhysicalTestResponse> preview(@RequestParam(value = "file", required = true) MultipartFile file) {
        //서비스 호출

        HealthDto.PhysicalTestResponse empPhysicalTestId = healthService.preview(file);

        return ResponseEntity.ok(empPhysicalTestId);
    }

    /**
     * 건강 정보 제출
     * @param empId
     * @param file
     * @param data
     * @return
     */
    @PostMapping(value = "/save", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Long> save (@RequestParam("empId") String empId,
                      @RequestPart("file") MultipartFile file,
                      @RequestPart("data") HealthDto.PhysicalTestRequest data) {
        System.out.println(empId);
        System.out.println(file);
        System.out.println(data);
        Long empPhysicalTestId = healthService.save(file, empId, data);

        return ResponseEntity.ok(empPhysicalTestId);
    }



}
