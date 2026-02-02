package com.kh.ct.domain.emp.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

public class AccountActivationDto {

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ActivationInfoResponse {
        private String email;
        private String airlineName;
        private String country;
        private LocalDateTime activationDate;
        private Boolean isValid;
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ActivationRequest {
        @NotBlank(message = "비밀번호는 필수입니다")
        @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*]).{8,}$",
                message = "비밀번호는 영문 대소문자, 숫자, 특수문자를 포함하여 8자 이상이어야 합니다")
        private String password;

        @NotBlank(message = "비밀번호 확인은 필수입니다")
        private String passwordConfirm;
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ActivationResponse {
        private String message;
        private Boolean success;
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class RegenerateLinkResponse {
        private String activationLink;
        private String message;
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class InitialSetupRequest {
        private String timezone;
        private String department;
        private String position;
        // 로고 파일은 multipart로 별도 처리
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class InitialSetupResponse {
        private String message;
        private Boolean success;
        private Long airlineId;
    }
}

