import {api,uploadApi} from '../axios';
import { API_ENDPOINTS } from '../config';

export const empPhysicalTestService = {
    preview : (file) => {
        return uploadApi.post(API_ENDPOINTS.HEALTH.PREVIEW,file);
    },

    save: (empId, file, data) => {
        const fd = new FormData();
        fd.append("file", file);

        // data는 JSON Blob으로 넣어야 @RequestPart("data")로 매핑됩니다
        fd.append(
            "data",
            new Blob([JSON.stringify(data)], { type: "application/json" })
        );

        // empId는 query로 보내기 (컨트롤러가 @RequestParam이라서)
        return uploadApi.post(`${API_ENDPOINTS.HEALTH.SAVE}?empId=${empId}`, fd);
    },

    detail: (empId, physicalTestId) => {
        return api.get(API_ENDPOINTS.HEALTH.DETAIL, {
            params: { empId, physicalTestId },
        });
    },
    getPhysicalTest: (empId, page = 0, size = 10) => {
        return api.get("/api/health/getPhysicalTest", {
            params: { empId, page, size, sort: "testDate,desc" },
        });
    },

    getAllPhysicalTest: ({ empName = "", page = 0, size = 5 }) =>
        api.get("/api/health/getAllPhysicalTest", {
        params: { empName, page, size },
        }),

}



