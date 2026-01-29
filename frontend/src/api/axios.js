import axios from 'axios';
import { API_CONFIG } from './config';
import useAuthStore from '../store/authStore';

export const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: API_CONFIG.HEADERS,
});

// ✅ 업로드 전용: Content-Type을 기본으로 박지 않음
export const uploadApi = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
});

const applyInterceptors = (instance) => { 
  instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      console.log('[AXIOS][RES][ERROR]', status, error.config?.url, data);

      if (status === 401) {
        // 인증 만료/미인증
        // (원하면 여기서 자동 로그아웃 처리 가능)
        console.error('401: 인증이 필요합니다.');
      } else if (status === 403) {
        console.error('403: 접근 권한이 없습니다.');
      } else if (status === 404) {
        console.error('404: 요청한 리소스를 찾을 수 없습니다.');
      } else if (status === 500) {
        console.error('500: 서버 에러 발생');
      } else {
        console.error('API 에러:', data);
      }
    } else if (error.request) {
      console.error('네트워크 에러(요청은 갔는데 응답 없음):', error.request);
    } else {
      console.error('요청 설정 에러:', error.message);
    }

    return Promise.reject(error);
  }
);
}
applyInterceptors(api);
applyInterceptors(uploadApi);

export default api;
