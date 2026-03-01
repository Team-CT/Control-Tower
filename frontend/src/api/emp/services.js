import api from '../axios';

export const empService = {
  // 직원 상세 정보 조회
  getEmpDetail: (empId) => {
    console.log(`[empService] Fetching employee detail for empId: ${empId}`);
    return api.get(`/api/emps/${empId}`);
  },
  
  // 직원 목록 조회 (역할별 필터링 가능)
  getEmployees: (params = {}) => {
    return api.get('/api/emps', { params });
  },

  // 직원 직급/직책 수정
  updateEmpRoleAndJob: (empId, role, job) => {
    return api.patch(`/api/emps/${empId}/role-job`, { role, job });
  },
  getDepartments: (params = {}) => {
    return api.get(API_ENDPOINTS.DEPARTMENT.LIST, { params });
  },

  // 부서 상세 + 하위팀 목록 조회
  getDepartmentDetail: (deptId) => {
    return api.get(API_ENDPOINTS.DEPARTMENT.DETAIL(deptId));
  },
  
};

export default { empService };
