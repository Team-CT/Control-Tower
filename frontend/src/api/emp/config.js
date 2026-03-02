// src/api/services/config.js

const {
  VITE_API_URL,
  VITE_API_TIMEOUT = 5000,
  VITE_API_VERSION = "v1",
} = import.meta.env;

export const API_CONFIG = {
  // DEV: Vite proxy를 쓰는 패턴이면 BASE_URL을 ''로 두는 게 맞음
  BASE_URL: import.meta.env.DEV ? "" : VITE_API_URL || "",
  TIMEOUT: Number(VITE_API_TIMEOUT),
  VERSION: VITE_API_VERSION,

  HEADERS: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export const API_ENDPOINTS = {
  // ✅ EMP(직원/회원)
  EMP: {
    CHECK_ID: `/api/emps/checkId`, // GET ?empId=
    PREVIEW_EMP_NO: `/api/emps/empNo/preview`, // GET
    REGISTER: `/api/emps`, // POST
    MANAGERS: `/api/emps/managers`,
    ME: `/api/emps/me`,
    ME_PASSWORD: `/api/emps/me/password`,
    FIND_ID: `/api/emps/findId`,
    MANAGEMENT: `/api/emps/management`,
    LIST: `/api/emps`, // ✅ 목록용 추가 (기존 getEmployees 하드코딩 제거 목적)
    DETAIL: (empId) => `/api/emps/${empId}`, // ✅ 상세용 추가
    PATCH_ROLE_JOB: (empId) => `/api/emps/${empId}/role-job`, // ✅ 수정용 추가
  },

  // ✅ FILE
  FILE: {
    UPLOAD: `/api/file/upload`,
    DELETE: (fileId) => `/api/file/${fileId}`,
  },

  // ✅ DEPARTMENT (백엔드 DepartmentController 기준)
  DEPARTMENT: {
    LIST: `/api/departments`, // GET ?q=&page=&size=
    DETAIL: (deptId) => `/api/departments/${deptId}`, // GET
    CREATE: `/api/departments`, // POST
    UPDATE: (deptId) => `/api/departments/${deptId}`, // PUT
    DEACTIVATE: (deptId) => `/api/departments/${deptId}`, // DELETE

    // ✅ members: 백 스펙엔 includeChildren 없음
    MEMBERS: (deptId) => `/api/departments/${deptId}/members`, // GET
    ADD_MEMBER: (deptId) => `/api/departments/${deptId}/members`, // POST {empId}
    REMOVE_MEMBER: (deptId, empId) => `/api/departments/${deptId}/members/${empId}`, // DELETE

    // ✅ 하위 조직 생성
    CREATE_CHILD: (deptId) => `/api/departments/${deptId}/children`, // POST
  },
};