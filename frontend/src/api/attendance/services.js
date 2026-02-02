import api from '../axios';
import { ATTENDANCE_ENDPOINTS } from './config';

/**
 * 근태 관련 API 서비스
 */
export const attendanceService = {
    /**
     * 월별 근태 통계 조회
     * @param {string} empId - 직원 ID
     * @param {number} year - 년도
     * @param {number} month - 월
     * @returns {Promise} 월별 통계 데이터
     */
    getMonthlyStats: async (empId, year, month) => {
        const response = await api.get(ATTENDANCE_ENDPOINTS.MONTHLY_STATS, {
            params: { empId, year, month }
        });
        return response.data;
    },

    /**
     * 월별 캘린더 데이터 조회
     * @param {string} empId - 직원 ID
     * @param {number} year - 년도
     * @param {number} month - 월
     * @returns {Promise} 캘린더 데이터
     */
    getCalendarData: async (empId, year, month) => {
        const response = await api.get(ATTENDANCE_ENDPOINTS.CALENDAR, {
            params: { empId, year, month }
        });
        return response.data;
    },
};

export default attendanceService;
