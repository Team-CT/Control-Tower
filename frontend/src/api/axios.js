import axios from 'axios';
import { API_CONFIG } from './config';
import useAuthStore from '../store/authStore';



export const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: API_CONFIG.HEADERS,
});

// 개발 환경에서 baseURL 확인
if (import.meta.env.DEV) {
  console.log('[AXIOS] Base URL:', API_CONFIG.BASE_URL || '(프록시 사용)');
  console.log('[AXIOS] Timeout:', API_CONFIG.TIMEOUT);
}

// ✅ 업로드 전용: Content-Type을 기본으로 박지 않음
export const uploadApi = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
});

const AUTH_EXCLUDE = [
  { method: 'post', path: '/api/auth/login' },
  { method: 'post', path: '/api/members' }, // 회원가입(사용 시)
  // { method: 'post', path: '/api/auth/refresh' }, // refresh 도입 시
];

function shouldSkipAuth(config) {
  const method = (config.method || 'get').toLowerCase();
  const url = config.url || '';

  // axios config.url은 보통 "/api/auth/login" 같은 상대경로가 많지만
  // 혹시 전체 URL이 들어오는 케이스도 있어서 includes로 안전하게 처리
  return AUTH_EXCLUDE.some((rule) => {
    return method === rule.method && url.includes(rule.path);
  });
}

const applyInterceptors = (instance) => {
  // ✅ Request 인터셉터 - 토큰 자동 첨부(단, 공개 엔드포인트는 스킵)
  instance.interceptors.request.use(
    (config) => {
      try {
        // 1) 공개 엔드포인트면 토큰 첨부 금지
        if (shouldSkipAuth(config)) {
          console.log('🔓 공개 요청(토큰 미첨부):', config.method?.toUpperCase(), config.url);

          // 혹시 이전에 헤더가 남아있을 가능성 제거(방어적)
          if (config.headers?.Authorization) delete config.headers.Authorization;
          return config;
        }

        // 2) 그 외에는 토큰 첨부
        const token = useAuthStore.getState().token;

        if (token) {
          // headers가 undefined일 수 있으니 방어적으로 보장
          config.headers = config.headers || {};
          config.headers.Authorization = `Bearer ${token}`;

          console.log(
            '🔐 토큰 첨부:',
            config.method?.toUpperCase(),
            config.url,
            token.substring(0, 20) + '...'
          );
        } else {
          console.log('⚠️ 토큰 없음:', config.method?.toUpperCase(), config.url);
        }
      } catch (error) {
        console.error('❌ Auth store error:', error);
      }

      return config;
    },
    (error) => Promise.reject(error)
  );
  
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
        console.error('백엔드 서버가 실행 중인지 확인하세요. (포트: 8001)');
        console.error('요청 URL:', error.config?.url);
        console.error('Base URL:', error.config?.baseURL);
      } else {
        console.error('요청 설정 에러:', error.message);
      }

      return Promise.reject(error);
    }
  );
};
applyInterceptors(api);
applyInterceptors(uploadApi);

export default api;
