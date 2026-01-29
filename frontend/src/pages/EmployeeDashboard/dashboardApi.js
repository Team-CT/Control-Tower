import axios from "axios";

const BASE_URL = "http://localhost:8001/api/dashboard";

export const getEmpIdFromStorage = () => {
    const authStorage = localStorage.getItem('auth-storage');
    if (!authStorage) return null;

    try {
        const parsed = JSON.parse(authStorage);
        return parsed.state?.emp?.empId || null;
    } catch (e) {
        console.error("JSON 파싱 에러:", e);
        return null;
    }
};

export const fetchDashboardData = async () => {
    const authStorage = localStorage.getItem('auth-storage');
    if (!authStorage) throw new Error("인증 정보가 없습니다.");

    const parsedData = JSON.parse(authStorage);
    const token = parsedData.state?.token;
    
    // 💡 [중요] 이 줄이 추가되어야 합니다!
    const empId = parsedData.state?.emp?.empId; 

    if (!empId) throw new Error("사번 정보를 찾을 수 없습니다.");

    // 이제 정의된 empId를 주소에 사용합니다.
    const response = await axios.get(`${BASE_URL}/${empId}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    return response.data;
};