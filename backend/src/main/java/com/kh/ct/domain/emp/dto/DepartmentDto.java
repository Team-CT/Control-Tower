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

        private String description; // ✅ 추가
        private ManagerInfo manager; // ✅ 추가 (프론트 형태에 맞춤)

        // 카드 하단 통계
        private Integer totalMembers; // empCount
        private Integer totalTeams;   // children.size() 또는 집계

        @Getter
        @AllArgsConstructor
        @NoArgsConstructor
        @Builder
        public static class ManagerInfo {
            private String name; // Emp name
            private String role; // Emp 직책/직급(프로젝트 필드에 맞게 서비스에서 세팅)
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

            // 확장 대비 필드
            private String engName;

            // ✅ manager/description을 DB에서 내려주기
            private String manager;     // 화면 상단 표시용 문자열
            private Integer totalMembers;
            private String location;
            private String phone;

            private String description; // ✅ 추가
        }

        @Getter
        @AllArgsConstructor
        @NoArgsConstructor
        @Builder
        public static class SubTeam {

            private Long id;
            private String name;

            private String leader;   // child.manager 기반으로 세팅 가능
            private Integer count;   // empCount
            private String task;     // 확장 대비
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
        private Long parentDepartmentId; // null이면 최상위
        private String managerEmpId;     // ✅ 추가(부서장 지정)
        private String description;      // ✅ 추가
    }

    /* =========================================================
     * 5️⃣ 부서 수정 요청
     * ========================================================= */
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class UpdateRequest {

        private String departmentName;
        private Integer empCount;

        private String managerEmpId; // ✅ 추가
        private String description;  // ✅ 추가
    }
}