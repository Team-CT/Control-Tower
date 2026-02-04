import api from '../axios';

export const empService = {
  // 직원 상세 정보 조회
  getEmpDetail: (empId) => {
    console.log(`[empService] Fetching employee detail for empId: ${empId}`);
    return api.get(`/api/emps/${empId}`);
  },
};

export default { empService };
