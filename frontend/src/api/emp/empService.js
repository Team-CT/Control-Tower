// src/api/services/empService.js

import api from "../axios";
import { API_ENDPOINTS } from "./config";

export const empService = {
  // ======================================================
  // ✅ EMP
  // ======================================================

  // 직원 상세 정보 조회
  getEmpDetail: (empId) => {
    console.log(`[empService] Fetching employee detail for empId: ${empId}`);
    return api.get(API_ENDPOINTS.EMP.DETAIL(empId));
  },

  // 직원 목록 조회 (필터링/페이지네이션 params 전달)
  getEmployees: (params = {}) => {
    return api.get(API_ENDPOINTS.EMP.LIST, { params });
  },

  // 직원 직급/직책 수정
  updateEmpRoleAndJob: (empId, role, job) => {
    return api.patch(API_ENDPOINTS.EMP.PATCH_ROLE_JOB(empId), { role, job });
  },

  // (선택) 기존 네 config에 있던 것들도 서비스로 쓰고 싶으면 아래처럼 노출 가능
  checkId: (empId) =>
    api.get(API_ENDPOINTS.EMP.CHECK_ID, { params: { empId } }),

  previewEmpNo: () => api.get(API_ENDPOINTS.EMP.PREVIEW_EMP_NO),

  register: (payload) => api.post(API_ENDPOINTS.EMP.REGISTER, payload),

  getManagerCandidates: () => api.get(API_ENDPOINTS.EMP.MANAGERS),

  getMyProfile: () => api.get(API_ENDPOINTS.EMP.ME),

  updateMyProfile: (payload) => api.put(API_ENDPOINTS.EMP.ME, payload),

  changeMyPassword: (payload) => api.put(API_ENDPOINTS.EMP.ME_PASSWORD, payload),

  findEmpId: (payload) => api.post(API_ENDPOINTS.EMP.FIND_ID, payload),

  getEmployeesForManagement: (params = {}) =>
    api.get(API_ENDPOINTS.EMP.MANAGEMENT, { params }),

  // ======================================================
  // ✅ DEPARTMENT
  // ======================================================

  // 부서 목록 조회 (q/page/size 등 params 전달)
  getDepartments: (params = {}) => {
    return api.get(API_ENDPOINTS.DEPARTMENT.LIST, { params });
  },

  // 부서 상세 조회
  getDepartmentDetail: (deptId) => {
    return api.get(API_ENDPOINTS.DEPARTMENT.DETAIL(deptId));
  },

  // 부서 생성
  createDepartment: (payload) => {
    return api.post(API_ENDPOINTS.DEPARTMENT.CREATE, payload);
  },

  // 하위 조직(팀) 생성
  createChildDepartment: (deptId, payload) => {
    return api.post(API_ENDPOINTS.DEPARTMENT.CREATE_CHILD(deptId), payload);
  },

  // 부서 수정
  updateDepartment: (deptId, payload) => {
    return api.put(API_ENDPOINTS.DEPARTMENT.UPDATE(deptId), payload);
  },

  // 부서 비활성화
  deactivateDepartment: (deptId) => {
    return api.delete(API_ENDPOINTS.DEPARTMENT.DEACTIVATE(deptId));
  },

  // ✅ 구성원 목록 (백엔드 스펙: includeChildren 없음)
  getDepartmentMembers: (deptId) => {
    return api.get(API_ENDPOINTS.DEPARTMENT.MEMBERS(deptId));
  },

  // ✅ 구성원 추가(배정) body: { empId: "hr01" }
  addDepartmentMember: (deptId, empId) => {
    return api.post(API_ENDPOINTS.DEPARTMENT.ADD_MEMBER(deptId), { empId });
  },

  // ✅ 구성원 제거(해제)
  removeDepartmentMember: (deptId, empId) => {
    return api.delete(API_ENDPOINTS.DEPARTMENT.REMOVE_MEMBER(deptId, empId));
  },
};

export default { empService };