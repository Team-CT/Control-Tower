package com.kh.ct.domain.emp.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

public class DepartmentDto {

    /* =========================================================
     * 1️⃣ 공통 응답 래퍼
     * ========================================================= */
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class ApiResponse<T> {
        private boolean success;
        private T data;
        private String message;

        public static <T> ApiResponse<T> ok(T data) {
            return ApiResponse.<T>builder()
                    .success(true)
                    .data(data)
                    .message(null)
                    .build();
        }

        public static <T> ApiResponse<T> fail(String message) {
            return ApiResponse.<T>builder()
                    .success(false)
                    .data(null)
                    .message(message)
                    .build();
        }
    }

    /* =========================================================
     * 2️⃣ 부서 목록 (DepartmentManagement 카드용)
     * ========================================================= */
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class ListItem {

        private Long id;
        private String name;

        private String description;
        private ManagerInfo manager;

        private Integer totalMembers; // ✅ Emp COUNT 결과
        private Integer totalTeams;   // ✅ 하위 Department COUNT 결과

        @Getter
        @AllArgsConstructor
        @NoArgsConstructor
        @Builder
        public static class ManagerInfo {
            private String name;
            private String role;
        }
    }

    /* =========================================================
     * 3️⃣ 부서 상세 응답 (DepartmentDetail 화면용)
     * ========================================================= */
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class DetailResponse {

        private DeptInfo deptInfo;
        private List<SubTeam> subTeams;

        @Getter
        @AllArgsConstructor
        @NoArgsConstructor
        @Builder
        public static class DeptInfo {
            private Long id;
            private String name;

            private String engName; // 확장 대비
            private String manager;
            private Integer totalMembers; // ✅ Emp COUNT 결과

            private String location; // 확장 대비
            private String phone;    // 확장 대비
            private String description;
        }

        @Getter
        @AllArgsConstructor
        @NoArgsConstructor
        @Builder
        public static class SubTeam {
            private Long id;
            private String name;

            private String leader;
            private Integer count; // ✅ Emp COUNT 결과
            private String task;   // 확장 대비
        }
    }

    /* =========================================================
     * 4️⃣ 부서 생성 요청
     * ========================================================= */
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class CreateRequest {
        private String departmentName;
        private Long parentDepartmentId;
        private String managerEmpId;
        private String description;
    }

    /* =========================================================
     * 5️⃣ 부서 수정 요청 (empCount 제거)
     * ========================================================= */
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class UpdateRequest {
        private String departmentName;
        private String managerEmpId;
        private String description;
    }

    /* =========================================================
     * ✅ 6️⃣ 하위 조직 생성 요청
     * ========================================================= */
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class CreateChildRequest {
        private String departmentName;
        private String managerEmpId;
        private String description;
    }

    /* =========================================================
     * ✅ 7️⃣ 구성원 DTO
     * ========================================================= */
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class MemberItem {
        private String empId;
        private String empNo;
        private String empName;

        private String departmentName;

        private String role;
        private String job;
        private String phone;
        private String email;

        private String empStatus;
    }

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class MemberAddRequest {
        private String empId;
    }
}