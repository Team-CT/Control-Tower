import axios from 'axios';
import { API_CONFIG } from './config';
import useAuthStore from '../store/authStore';

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: API_CONFIG.HEADERS,
});

// ✅ Request 인터셉터: 토큰 자동 첨부
// Request 인터셉터 - 토큰 자동 첨부
api.interceptors.request.use(
  (config) => {
    try {
      // Zustand store에서 직접 state 가져오기
      const token = useAuthStore.getState().token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log('토큰 첨부:', token.substring(0, 20) + '...');
      } else {
        console.log('토큰 없음');
      }
    } catch (error) {
      console.error('❌ Auth store error:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ✅ Response 인터셉터: 에러 공통 처리
api.interceptors.response.use(
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

export default api;
