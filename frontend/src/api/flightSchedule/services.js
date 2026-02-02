import api from '../axios';

export const flightScheduleService = {
  // 비행편 목록 조회
  getFlightSchedules: (params = {}) => {
    return api.get('/api/flight-schedules', { params });
  },

  // 비행편 상세 조회
  getFlightScheduleDetail: (flyScheduleId) => {
    return api.get(`/api/flight-schedules/${flyScheduleId}`);
  },
};

export default { flightScheduleService };
