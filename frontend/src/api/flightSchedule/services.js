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
  
  // 승무원 추가
  addCrewMember: (flyScheduleId, empId) => {
    return api.post(`/api/flight-schedules/${flyScheduleId}/crew`, { empId });
  },
  
  // 승무원 삭제
  removeCrewMember: (flyScheduleId, empId) => {
    return api.delete(`/api/flight-schedules/${flyScheduleId}/crew/${empId}`);
  },
};

export default { flightScheduleService };
