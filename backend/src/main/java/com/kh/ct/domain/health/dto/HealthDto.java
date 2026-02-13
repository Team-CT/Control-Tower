package com.kh.ct.domain.health.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.kh.ct.domain.emp.entity.Emp;
import com.kh.ct.domain.health.entity.EmpPhysicalTest;
import com.kh.ct.domain.health.entity.ProgramApply;
import com.kh.ct.global.entity.File;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public class HealthDto {
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class PhysicalTestRequest {

        @JsonProperty("emp_id")
        private Emp empId;

        @JsonProperty("test_date")
        private LocalDateTime testDate;

        @JsonProperty("weight")
        private Integer weight;

        @JsonProperty("height")
        private Integer height;

        @JsonProperty("blood_sugar")
        private Integer bloodSugar;

        @JsonProperty("systolic_blood_pressure")
        private Integer systolicBloodPressure;

        @JsonProperty("cholesterol")
        private Integer cholesterol;

        @JsonProperty("diastolic_blood_pressure")
        private Integer diastolicBloodPressure;

        @JsonProperty("heart_rate")
        private Integer heartRate;

        @JsonProperty("bmi")
        private Integer bmi;

        @JsonProperty("body_fat")
        private Integer bodyFat;

        @JsonProperty("file_id")
        private File fileId;

        public EmpPhysicalTest toEntity() {
            return EmpPhysicalTest.builder()
                    .empId(empId)
                    .testDate(testDate)
                    .weight(weight)
                    .height(height)
                    .heartRate(heartRate)
                    .bmi(bmi)
                    .bloodSugar(bloodSugar)
                    .systolicBloodPressure(systolicBloodPressure)
                    .cholesterol(cholesterol)
                    .diastolicBloodPressure(diastolicBloodPressure)
                    .bodyFat(bodyFat)
                    .fileId(fileId)
                    .build();
        }

    }


    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class PhysicalTestResponse {
        @JsonProperty("test_date")
        private LocalDateTime testDate; // "2026-01-26" 형태 권장
        private Integer height;
        private Integer weight;
        @JsonProperty("blood_sugar")
        private Integer bloodSugar;
        @JsonProperty("systolic_blood_pressure")
        private Integer systolicBloodPressure;
        @JsonProperty("diastolic_blood_pressure")
        private Integer diastolicBloodPressure;
        private Integer cholesterol;
        @JsonProperty("heart_rate")
        private Integer heartRate;
        private Integer bmi;
        @JsonProperty("body_fat")
        private Integer bodyFat;
        @JsonProperty("file_id")
        private Long fileId;

        public static PhysicalTestResponse from (PhysicalTestRequest  physicalTest) {
            return PhysicalTestResponse.builder()
                    .testDate(physicalTest.getTestDate())
                    .height(physicalTest.getHeight())
                    .weight(physicalTest.getWeight())
                    .bloodSugar(physicalTest.getBloodSugar())
                    .systolicBloodPressure(physicalTest.getSystolicBloodPressure())
                    .diastolicBloodPressure(physicalTest.getDiastolicBloodPressure())
                    .cholesterol(physicalTest.getCholesterol())
                    .heartRate(physicalTest.getHeartRate())
                    .bmi(physicalTest.getBmi())
                    .bodyFat(physicalTest.getBodyFat())
                    .build();
        }

        public static PhysicalTestResponse from(EmpPhysicalTest e) {
            return PhysicalTestResponse.builder()
                    .testDate(e.getTestDate())   // Response가 LocalDateTime이면 그대로
                    .height(e.getHeight())
                    .weight(e.getWeight())
                    .bloodSugar(e.getBloodSugar())
                    .systolicBloodPressure(e.getSystolicBloodPressure())
                    .diastolicBloodPressure(e.getDiastolicBloodPressure())
                    .cholesterol(e.getCholesterol())
                    .heartRate(e.getHeartRate())
                    .bmi(e.getBmi())
                    .bodyFat(e.getBodyFat())
                    .fileId(e.getFileId() != null ? e.getFileId().getFileId() : null)
                    .build();
        }


    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class PhysicalTestDetailResponse {
        @JsonProperty("emp_id")
        private String empId;
        @JsonProperty("emp_name")
        private String empName;
        @JsonProperty("start_date")
        private LocalDateTime startDate;
        @JsonProperty("department_name")
        private String departmentName;
        private String job;
        private String email;
        private String phone;
        private String address;

        @JsonProperty("test_date")
        private LocalDateTime testDate; // "2026-01-26" 형태 권장
        private Integer height;
        private Integer weight;
        @JsonProperty("blood_sugar")
        private Integer bloodSugar;
        @JsonProperty("systolic_blood_pressure")
        private Integer systolicBloodPressure;
        @JsonProperty("diastolic_blood_pressure")
        private Integer diastolicBloodPressure;
        private Integer cholesterol;
        @JsonProperty("heart_rate")
        private Integer heartRate;
        private Integer bmi;
        @JsonProperty("body_fat")
        private Integer bodyFat;

        @JsonProperty("health_point")
        private Integer healthPoint;

        public static PhysicalTestDetailResponse from(EmpPhysicalTest e) {
            return PhysicalTestDetailResponse.builder()
                    .testDate(e.getTestDate())
                    .height(e.getHeight())
                    .weight(e.getWeight())
                    .bloodSugar(e.getBloodSugar())
                    .systolicBloodPressure(e.getSystolicBloodPressure())
                    .diastolicBloodPressure(e.getDiastolicBloodPressure())
                    .cholesterol(e.getCholesterol())
                    .heartRate(e.getHeartRate())
                    .bmi(e.getBmi())
                    .bodyFat(e.getBodyFat())
                    .build();
        }


    }


    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AdminEmpHealthRow {
        @JsonProperty("emp_id")
        private String empId;
        @JsonProperty("emp_name")
        private String empName;
        @JsonProperty("department_name")
        private String departmentName;  // 부서 엔티티에서 가져오는 값
        private String job;
        @JsonProperty("start_date")
        private LocalDateTime startDate;
        @JsonProperty("test_date")
        private LocalDateTime testDate; // 최근 검진일
        @JsonProperty("health_point")
        private Integer healthPoint;          // 개인건강 점수


    }

    /**
     * 건강 프로그램 신청 요청 DTO
     */
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ApplyRequest {
        private String programCode; // counseling, exercise, rest

        private LocalDateTime startDate;

        private LocalDateTime endDate;

        private String reason;
    }

    /**
     * 건강 프로그램 신청 내역 응답 DTO
     * DDD 아키텍처 - Application Layer
     */
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ProgramHistoryResponse {
        
        @JsonProperty("program_apply_id")
        private String programApplyId;
        
        @JsonProperty("program_name")
        private String programName;  // 프로그램 내용 (상담/운동/휴식)
        
        @JsonProperty("program_code")
        private String programCode;  // 프로그램 코드
        
        @JsonProperty("category")
        private String category;  // 카테고리 (한글명)
        
        @JsonProperty("apply_date")
        private LocalDateTime applyDate;  // 신청일
        
        @JsonProperty("start_date")
        private LocalDateTime startDate;  // 시작일
        
        @JsonProperty("end_date")
        private LocalDateTime endDate;  // 종료일
        
        @JsonProperty("status")
        private String status;  // 상태 (PENDING/APPROVED/REJECTED)
        
        @JsonProperty("apply_reason")
        private String applyReason;  // 신청 사유
        
        @JsonProperty("cancel_reason")
        private String cancelReason;  // 반려 사유
        
        @JsonProperty("applicant_name")
        private String applicantName;  // 신청자명

        @JsonProperty("manager_name")
        private String managerName;    // 담당자명 (승인 시)
        
        /**
         * Entity를 DTO로 변환
         * @param entity ProgramApply 엔티티
         * @return ProgramHistoryResponse DTO
         */
        public static ProgramHistoryResponse from(ProgramApply entity) {
            if (entity == null) {
                return null;
            }
            
            // Program 엔티티에서 일정 정보 추출
            LocalDateTime startDate = null;
            LocalDateTime endDate = null;
            String programName = null;
            
            if (entity.getProgram() != null) {
                programName = entity.getProgram().getProgramContent();
                
                if (entity.getProgram().getScheduleId() != null) {
                    startDate = entity.getProgram().getScheduleId().getStartDate();
                    endDate = entity.getProgram().getScheduleId().getEndDate();
                }
            }
            
            // 프로그램 코드에 따른 카테고리명 매핑
            String category = getCategoryName(entity.getProgramCode());

            // 담당자 이름 매핑
            String managerName = (entity.getProgramApplyManager() != null) 
                    ? entity.getProgramApplyManager().getEmpName() 
                    : null;
            
            return ProgramHistoryResponse.builder()
                    .programApplyId(entity.getProgramApplyId())
                    .programName(programName)
                    .programCode(entity.getProgramCode())
                    .category(category)
                    .applyDate(entity.getProgramApplyDate())
                    .startDate(startDate)
                    .endDate(endDate)
                    .status(entity.getProgramApplyStatus() != null ? 
                            entity.getProgramApplyStatus().name() : null)
                    .applyReason(entity.getProgramApplyReason())
                    .cancelReason(entity.getProgramApplyCancelReason())
                    .applicantName(entity.getProgramApplyApplicant() != null ? 
                            entity.getProgramApplyApplicant().getEmpName() : null)
                    .managerName(managerName)
                    .build();
        }
        
        /**
         * 프로그램 코드를 한글 카테고리명으로 변환
         * @param programCode 프로그램 코드
         * @return 한글 카테고리명
         */
        private static String getCategoryName(String programCode) {
            if (programCode == null) {
                return "기타";
            }
            
            return switch (programCode.toLowerCase()) {
                case "counseling" -> "상담";
                case "exercise" -> "운동";
                case "rest" -> "휴식";
                default -> programCode;
            };
        }
    }

    /**
     * [Admin] 신청 상세 정보 응답 DTO
     */
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ApplyDetailResponse {
        @JsonProperty("program_apply_id")
        private String programApplyId;
        @JsonProperty("emp_name")
        private String empName;
        @JsonProperty("emp_no")
        private String empNo;
        @JsonProperty("department_name")
        private String departmentName; // 부서명 (없으면 직급 등 표시)
        @JsonProperty("program_name")
        private String programName;
        @JsonProperty("apply_reason")
        private String applyReason;
        @JsonProperty("apply_date")
        private LocalDateTime applyDate;
        @JsonProperty("status")
        private String status;
        @JsonProperty("start_date")
        private LocalDateTime startDate;
        @JsonProperty("end_date")
        private LocalDateTime endDate;
        
        // 승인된 경우 담당자 정보
        @JsonProperty("manager_name")
        private String managerName;
        
        // 반려된 경우 반려 사유
        @JsonProperty("reject_reason")
        private String rejectReason;
    }

    /**
     * [Admin] 승인 요청 DTO
     */
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ApproveRequest {
        private String programApplyId;
        private String managerId; // 담당자 사번 (배정)
    }

    /**
     * [Admin] 반려 요청 DTO
     */
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class RejectRequest {
        private String programApplyId;
        private String reason; // 반려 사유
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class EmpHealthResponse {
        @JsonProperty("emp_id")
        private String empId;
        @JsonProperty("health_point")
        private Integer healthPoint;
        @JsonProperty("stress_point")
        private Integer stressPoint;
        @JsonProperty("fatigue_point")
        private Integer fatiguePoint;
        @JsonProperty("physical_point")
        private Integer physicalPoint;
        @JsonProperty("emp_name")
        private String empName;
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class HealthTrendPoint {
        private LocalDate date;
        private Integer healthPoint;
        private Integer physicalPoint;
        private Integer stressPoint;
        private Integer fatiguePoint;
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class EmpHealthTrendResponse {
        private String empId;
        private int days;
        private List<HealthTrendPoint> series;
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class EmpHealthRecordResponse {
        private Long workTime;
        private Integer surveyCnt;
        private Integer programCnt;
        private Integer scoreChg;
    }

}
