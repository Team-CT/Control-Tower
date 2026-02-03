package com.kh.ct.domain.attendance.controller;

import com.kh.ct.domain.attendance.dto.AttendanceDto;
import com.kh.ct.domain.attendance.service.AdminAttendanceService;
import com.kh.ct.global.dto.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

/**
 * 관리자 근태 관리 Controller
 */
@RestController
@RequestMapping("/api/admin/attendance")
@RequiredArgsConstructor
@Slf4j
public class AdminAttendanceController {

    private final AdminAttendanceService adminAttendanceService;

    /**
     * 관리자 대시보드 데이터 조회
     * - 오늘 기준: 전체 직원, 출근, 지각, 결근 통계
     * - 어제 기준: 전체 직원 근태 상세 리스트
     */
    @GetMapping("/dashboard")
    public ResponseEntity<ApiResponse<AttendanceDto.AdminDashResponse>> getAdminDashboard() {
        log.info("관리자 대시보드 조회 요청");
        
        AttendanceDto.AdminDashResponse response = adminAttendanceService.getAdminDashboard();
        
        return ResponseEntity.ok(ApiResponse.success("관리자 대시보드 조회 성공", response));
    }

    /**
     * 직원별 실시간 현황 조회 (Tab A)
     * - 오늘 날짜 기준 전체 직원의 근태 상태
     */
    @GetMapping("/employees")
    public ResponseEntity<ApiResponse<List<AttendanceDto.EmployeeStatusDto>>> getEmployeeStatus() {
        log.info("직원별 실시간 현황 조회 요청");
        
        List<AttendanceDto.EmployeeStatusDto> response = adminAttendanceService.getEmployeeStatus();
        
        return ResponseEntity.ok(ApiResponse.success("직원별 현황 조회 성공", response));
    }

    /**
     * 근태 특이사항 기록 조회 (Tab B)
     * - 날짜 범위 내 비정상 근태만 필터링 (PRESENT 제외)
     * @param startDate 시작 날짜 (선택사항, 기본값: 30일 전)
     * @param endDate 종료 날짜 (선택사항, 기본값: 오늘)
     */
    @GetMapping("/abnormal")
    public ResponseEntity<ApiResponse<List<AttendanceDto.AttendanceDetailDto>>> getAbnormalAttendance(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        
        log.info("근태 특이사항 조회 요청 - startDate: {}, endDate: {}", startDate, endDate);
        
        List<AttendanceDto.AttendanceDetailDto> response = adminAttendanceService.getAbnormalAttendance(startDate, endDate);
        
        return ResponseEntity.ok(ApiResponse.success("특이사항 조회 성공", response));
    }
}
