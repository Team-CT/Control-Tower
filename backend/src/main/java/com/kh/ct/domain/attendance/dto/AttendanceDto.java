package com.kh.ct.domain.attendance.dto;

import com.kh.ct.global.common.CommonEnums;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Map;

/**
 * 근태 관련 DTO 통합 클래스
 * Static Inner Class 패턴으로 파일 파편화 방지
 */
public class AttendanceDto {

    /**
     * 월별 통계 요청 DTO
     */
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class MonthlyStatsReq {
        private String empId;
        private int year;
        private int month;
    }

    /**
     * 월별 통계 응답 DTO
     */
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class MonthlyStatsRes {
        private String todayStatus;
        private long lateCount;
        private long absentCount;
        private long totalWorkHours;
        private long presentDaysCount;  // 이번 달 출근 일수
        private long flightHours;       // 이번 달 비행시간 (추후 구현)
        private LocalTime todayInTime;
        private LocalTime todayOutTime;
    }

    /**
     * 캘린더 조회 요청 DTO
     */
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class CalendarReq {
        private String empId;
        private int year;
        private int month;
    }

    /**
     * 캘린더 응답 DTO
     */
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class CalendarRes {
        private Map<Integer, String> attendanceMap;  // 날짜 → 상태
        private Map<Integer, DailyAttendanceDto> dailyDataMap;  // 날짜 → 상세 정보
        private int year;
        private int month;
    }

    /**
     * 일별 근태 정보 DTO
     */
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class DailyAttendanceDto {
        private Long attendanceId;
        private LocalDate attendanceDate;
        private LocalTime inTime;
        private LocalTime outTime;
        private CommonEnums.AttendanceStatus attendanceStatus;
        private Long workHours;
    }
}
