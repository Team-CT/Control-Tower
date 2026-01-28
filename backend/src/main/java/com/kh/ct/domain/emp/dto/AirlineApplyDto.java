package com.kh.ct.domain.emp.dto;

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
    public static class ListResponse {
        private Long id;
        private LocalDateTime date;
        private String airlineName;
        private String email;
        private Boolean verificationStatus;
        private String documentStatus;
        private String status;
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class DetailResponse {
        private Long id;
        private LocalDateTime date;
        private String airlineName;
        private String email;
        private String theme;
        private String mainNumber;
        private String airlineAddress;
        private String airlineDesc;
        private Boolean emailDomainVerified;
        private String status;
        private String cancelReason;
        private List<DocumentInfo> documents;
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class DocumentInfo {
        private String fileName;
        private String filePath;
    }

    @Getter
    @NoArgsConstructor
    public static class ApproveRequest {
        // 필요시 추가 필드
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class RejectRequest {
        @NotBlank(message = "반려 사유는 필수입니다")
        private String reason;
    }
}

