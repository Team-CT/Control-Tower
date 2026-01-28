package com.kh.ct.domain.emp.controller;

import com.kh.ct.domain.emp.dto.AirlineApplyDto;
import com.kh.ct.domain.emp.service.AirlineApplyService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/super-admin/airline-applications")
@RequiredArgsConstructor
@Tag(name = "AirlineApply", description = "항공사 가입 신청 관리 API")
public class AirlineApplyController {

    private final AirlineApplyService airlineApplyService;

    @GetMapping
    @Operation(summary = "항공사 가입 신청 목록 조회", description = "전체 목록 또는 검색 결과를 조회합니다.")
    public ResponseEntity<List<AirlineApplyDto.ListResponse>> getApplications(
            @RequestParam(required = false) String keyword
    ) {
        List<AirlineApplyDto.ListResponse> applications;
        
        if (keyword != null && !keyword.trim().isEmpty()) {
            applications = airlineApplyService.searchApplications(keyword);
        } else {
            applications = airlineApplyService.getAllApplications();
        }
        
        return ResponseEntity.ok(applications);
    }

    @GetMapping("/{id}")
    @Operation(summary = "항공사 가입 신청 상세 조회", description = "특정 신청의 상세 정보를 조회합니다.")
    public ResponseEntity<AirlineApplyDto.DetailResponse> getApplicationDetail(
            @PathVariable Long id
    ) {
        AirlineApplyDto.DetailResponse detail = airlineApplyService.getApplicationDetail(id);
        return ResponseEntity.ok(detail);
    }

    @PostMapping("/{id}/approve")
    @Operation(summary = "항공사 가입 신청 승인", description = "신청을 승인 처리합니다.")
    public ResponseEntity<Void> approveApplication(
            @PathVariable Long id
    ) {
        airlineApplyService.approveApplication(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/reject")
    @Operation(summary = "항공사 가입 신청 반려", description = "신청을 반려 처리합니다.")
    public ResponseEntity<Void> rejectApplication(
            @PathVariable Long id,
            @Valid @RequestBody AirlineApplyDto.RejectRequest request
    ) {
        airlineApplyService.rejectApplication(id, request.getReason());
        return ResponseEntity.ok().build();
    }
}

