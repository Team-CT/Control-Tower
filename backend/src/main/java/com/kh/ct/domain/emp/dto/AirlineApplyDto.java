package com.kh.ct.domain.emp.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

public class AirlineApplyDto {

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @Schema(description = "항공사 가입 신청 목록 응답")
    public static class ListResponse {
        @Schema(description = "신청 ID")
        private Long id;

        @Schema(description = "신청 일시")
        private LocalDateTime date;

        @Schema(description = "항공사명")
        private String airlineName;

        @Schema(description = "담당자 이메일")
        private String email;

        @Schema(description = "도메인 검증 상태 (true=일치, false=불일치)")
        private Boolean verificationStatus;

        @Schema(description = "서류 상태 (PENDING/APPROVED/REJECTED)")
        private String documentStatus;

        @Schema(description = "전체 상태 (pending/approved/rejected)")
        private String status;
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @Schema(description = "항공사 가입 신청 상세 응답")
    public static class DetailResponse {
        @Schema(description = "신청 ID")
        private Long id;

        @Schema(description = "신청 일시")
        private LocalDateTime date;

        @Schema(description = "항공사명")
        private String airlineName;

        @Schema(description = "담당자 이메일")
        private String email;

        @Schema(description = "테마")
        private String theme;

        @Schema(description = "대표 번호")
        private String mainNumber;

        @Schema(description = "항공사 주소")
        private String airlineAddress;

        @Schema(description = "항공사 설명")
        private String airlineDesc;

        @Schema(description = "이메일 도메인 검증 여부")
        private Boolean emailDomainVerified;

        @Schema(description = "상태 (PENDING/APPROVED/REJECTED)")
        private String status;

        @Schema(description = "반려 사유")
        private String cancelReason;

        @Schema(description = "첨부 서류 목록")
        private List<DocumentInfo> documents;
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @Schema(description = "첨부 서류 정보")
    public static class DocumentInfo {
        @Schema(description = "파일명")
        private String fileName;

        @Schema(description = "파일 경로")
        private String filePath;
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Schema(description = "승인 요청")
    public static class ApproveRequest {
        // 필요시 추가 필드
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Schema(description = "반려 요청")
    public static class RejectRequest {
        @NotBlank(message = "반려 사유는 필수입니다")
        @Schema(description = "반려 사유", example = "서류 미비")
        private String reason;
    }
}

