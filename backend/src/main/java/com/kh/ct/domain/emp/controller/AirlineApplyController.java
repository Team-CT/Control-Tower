package com.kh.ct.domain.emp.controller;

import com.kh.ct.domain.emp.dto.AirlineApplyDto;
import com.kh.ct.domain.emp.service.AirlineApplyService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/super-admin/airline-applications")
@RequiredArgsConstructor
public class AirlineApplyController {

    private final AirlineApplyService airlineApplyService;

    @GetMapping
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
    public ResponseEntity<AirlineApplyDto.DetailResponse> getApplicationDetail(
            @PathVariable Long id
    ) {
        AirlineApplyDto.DetailResponse detail = airlineApplyService.getApplicationDetail(id);
        return ResponseEntity.ok(detail);
    }

    @PostMapping("/{id}/approve")
    public ResponseEntity<Void> approveApplication(
            @PathVariable Long id
    ) {
        airlineApplyService.approveApplication(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/reject")
    public ResponseEntity<Void> rejectApplication(
            @PathVariable Long id,
            @Valid @RequestBody AirlineApplyDto.RejectRequest request
    ) {
        airlineApplyService.rejectApplication(id, request.getReason());
        return ResponseEntity.ok().build();
    }
}

