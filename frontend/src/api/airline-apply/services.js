import api from '../axios';

export const airlineApplyService = {
  // 목록 조회
  getApplications: (keyword) => {
    const params = keyword ? { keyword } : {};
    return api.get('/api/super-admin/airline-applications', { params });
  },

  // 상세 조회
  getApplicationDetail: (id) => {
    return api.get(`/api/super-admin/airline-applications/${id}`);
  },

  // 승인
  approveApplication: (id) => {
    return api.post(`/api/super-admin/airline-applications/${id}/approve`);
  },

  // 반려
  rejectApplication: (id, reason) => {
    return api.post(`/api/super-admin/airline-applications/${id}/reject`, { reason });
  }
};

export default { airlineApplyService };

