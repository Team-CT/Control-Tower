// src/api/services/empService.js
import { api } from '../axios';
import { API_ENDPOINTS } from './config';

export const empService = {
  // GET /api/emps/check-id?empId=EMP001
  checkId: (empId) =>
    api.get(API_ENDPOINTS.EMP.CHECK_ID, {
      params: { empId },
    }),

  // GET /api/emps/emp-no/preview
  previewEmpNo: () => api.get(API_ENDPOINTS.EMP.PREVIEW_EMP_NO),

  // POST /api/emps
  register: (payload) => api.post(API_ENDPOINTS.EMP.REGISTER, payload),
};
