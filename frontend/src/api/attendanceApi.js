import api from './axios';

/**
 * 근태 관련 API 서비스
 */
const attendanceApi = {
    /**
     * 월별 근태 통계 조회
     * @param {string} empId - 직원 ID
     * @param {number} year - 년도
     * @param {number} month - 월
     * @returns {Promise} 월별 통계 데이터
     */
    getMonthlyStats: async (empId, year, month) => {
        const response = await api.get('/api/attendance/monthly-stats', {
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
        const response = await api.get('/api/attendance/calendar', {
            params: { empId, year, month }
        });
        return response.data;
    }
};

export default attendanceApi;
