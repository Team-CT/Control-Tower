import axios, { uploadApi } from '../axios';
import { API_ENDPOINTS } from '../config';

/**
 * 건강 프로그램 관련 API 서비스
 */
const healthService = {
    /**
     * PDF 미리보기 (기존 기능)
     */
    preview: (formData) => {
        return axios.post('/api/health/preview', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },

    /**
     * 건강 정보 저장 (기존 기능)
     */
    save: (empId, file, data) => {
        const fd = new FormData();
        fd.append("file", file);

        // data는 JSON Blob으로 넣어야 @RequestPart("data")로 매핑됩니다
        fd.append(
            "data",
            new Blob([JSON.stringify(data)], { type: "application/json" })
        );
        return uploadApi.post(`${API_ENDPOINTS.HEALTH.SAVE}?empId=${empId}`, fd);
    },

     getPhysicalTest: (empId, page = 0, size = 10) => {
        return axios.get("/api/health/getPhysicalTest", {
            params: { empId, page, size, sort: "testDate,desc" },

        });

    },

    

    /**
     * 나의 프로그램 신청 내역 조회
     * @param {string} empId 
     */
    getMyResult: (empId) => {
        return axios.get(`/api/health/program/my-history`, {
            params: { empId },
        });
    },

    /**
     * 건강 프로그램 신청
     * @param {string} empId 
     * @param {object} data { programCode, startDate, endDate, reason }
     */
    applyProgram: (empId, data) => {
        return axios.post(`/api/health/program/apply`, data, {
            params: { empId },
        });
    },

    /**
     * 직원 건강 목록 조회 (관리자용)
     * @param {object} params { empName, page, size }
     */
    getAllPhysicalTest: (params) => {
        return axios.get('/api/health/getAllPhysicalTest', {
            params: params,
        });
    },

    /**
     * 개인 건강 정보 제출 이력
     * @param {string} empId
     * @param {number} page
     * @param {number} size
     */
    getPhysicalTest: (empId, page, size) => {
        return axios.get('/api/health/getPhysicalTest', {
            params: { empId, page, size },
        });
    },

    /**
     * 프로그램 신청 내역 조회 (HealthProgramHistory.jsx에서 사용)
     * @param {string} empId
     */
    getProgramHistory: (empId) => {
        return healthService.getMyResult(empId);
    },

    /**
     * 프로그램 신청 취소
     * @param {string} programApplyId
     */
    cancelProgram: (programApplyId) => {
        return axios.delete(`/api/health/program/cancel`, {
            params: { programApplyId }
        });
    },

    /**
     * [Admin] 프로그램 신청 목록 조회
     */
    getAdminApplyList: (params) => {
        return axios.get('/api/health/admin/apply/list', { params });
    },

    /**
     * [Admin] 신청 상세 조회
     */
    getApplyDetail: (applyId) => {
        return axios.get(`/api/health/admin/apply/${applyId}`);
    },

    /**
     * [Admin] 승인 처리
     */
    approveApply: (data) => {
        return axios.patch('/api/health/admin/apply/approve', data);
    },

    /**
     * [Admin] 반려 처리
     */
    rejectApply: (data) => {
        return axios.patch('/api/health/admin/apply/reject', data);
    },
};

// 하위 호환성을 위해 alias export 추가 (혹은 다른 파일에서 named import를 사용하는 경우 대비)
export const empPhysicalTestService = healthService;
export default healthService;
