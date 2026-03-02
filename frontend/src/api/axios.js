// src/api/axios.js
import axios from 'axios';
import { API_CONFIG } from './config';
import useAuthStore from '../store/authStore';

/**
 * ============================================================
 * Axios Instances (JS)
 * - api: 일반 API 요청
 * - uploadApi: 업로드 전용(Content-Type 강제 X)
 *
 * 토큰 전략
 * - refreshToken: HttpOnly Cookie (withCredentials 필수)
 * - accessToken : Zustand store(token) → Authorization 헤더
 * - 401 시: refresh(쿠키) → 새 accessToken 저장 → 원요청 재시도
 * ============================================================
 */

export const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: API_CONFIG.HEADERS,
  withCredentials: true,
});

export const uploadApi = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  withCredentials: true,
});

// refresh 전용 인스턴스(안정성↑)
const refreshApi = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  withCredentials: true,
});

if (import.meta.env.DEV) {
  console.log('[AXIOS] Base URL:', API_CONFIG.BASE_URL);
  console.log('[AXIOS] Timeout:', API_CONFIG.TIMEOUT);
}

/**
 * ============================================================
 * 공개 엔드포인트(Authorization 스킵)
 * ✅ 변경 포인트:
 * - 백엔드(SecurityConfig) 기준으로 /api/auth/* 로 통일
 * - 원래 match 전략(exact/prefix) 유지
 * ============================================================
 */
const AUTH_EXCLUDE = [
  // ✅ Auth
  { method: 'post', path: '/api/auth/login', match: 'exact' },
  { method: 'post', path: '/api/auth/refresh', match: 'exact' },
  { method: 'post', path: '/api/auth/logout', match: 'exact' },

  // 공개 회원가입/사전검증
  { method: 'post', path: '/api/emps', match: 'exact' },
  { method: 'get', path: '/api/emps/checkId', match: 'exact' },
  { method: 'get', path: '/api/emps/empNo/preview', match: 'exact' },

  // 비밀번호 코드(라우트 맞게 조정 필요)
  // ❗ 기존 코드의 오타: '/api//api/passwordCode' → '/api/passwordCode'
  { method: 'post', path: '/api/passwordCode', match: 'exact' },

  // 파일(회원가입 전 공개라면)
  { method: 'post', path: '/api/file/upload', match: 'exact' },
  { method: 'delete', path: '/api/file/', match: 'prefix' },

  // 기타 공개 엔드포인트
  { method: 'post', path: '/api/airline-applications', match: 'exact' },
  { method: 'get', path: '/api/account-activation', match: 'exact' },
  { method: 'post', path: '/api/account-activation', match: 'exact' },
];

function normalizePath(url) {
  try {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return new URL(url).pathname;
    }
    // querystring 제거(방어)
    const qIdx = url.indexOf('?');
    return qIdx >= 0 ? url.slice(0, qIdx) : url;
  } catch {
    return url || '';
  }
}

function shouldSkipAuth(config) {
  const method = (config.method || 'get').toLowerCase();
  const url = normalizePath(config.url || '');

  return AUTH_EXCLUDE.some((rule) => {
    if (method !== rule.method) return false;
    const matchType = rule.match || 'exact';
    if (matchType === 'prefix') return url.startsWith(rule.path);
    return url === rule.path;
  });
}

/**
 * ============================================================
 * Refresh 동시성 제어
 * ============================================================
 */
let isRefreshing = false;
let refreshPromise = null;

function setStoreToken(token) {
  const state = useAuthStore.getState();

  if (typeof state.setToken === 'function') return state.setToken(token);
  if (typeof state.setAuthToken === 'function') return state.setAuthToken(token);

  console.error('[AUTH][STORE] setToken/setAuthToken이 없습니다. authStore에 토큰 setter를 추가하세요.');
}

function clearStoreAuth() {
  const state = useAuthStore.getState();

  if (typeof state.setToken === 'function') state.setToken(null);
  else if (typeof state.setAuthToken === 'function') state.setAuthToken(null);

  if (typeof state.clear === 'function') state.clear();
  if (typeof state.logout === 'function') state.logout();
}

/**
 * ✅ Refresh 호출 경로 통일: /api/auth/refresh
 * - refreshToken은 HttpOnly 쿠키이므로 withCredentials가 핵심
 * - Authorization은 굳이 붙일 필요 없으니 방어적으로 제거
 */
async function requestRefresh() {
  const res = await refreshApi.post('/api/auth/refresh', null, {
    headers: { Authorization: undefined },
  });

  const newAccessToken = res.data?.accessToken;
  if (!newAccessToken) throw new Error('Refresh 응답에 accessToken이 없습니다.');

  return newAccessToken;
}

const applyInterceptors = (instance) => {
  // Request
  instance.interceptors.request.use(
    (config) => {
      try {
        if (shouldSkipAuth(config)) {
          if (import.meta.env.DEV) {
            console.log('🔓 공개 요청:', config.method?.toUpperCase(), config.url);
          }
          if (config.headers?.Authorization) delete config.headers.Authorization;
          return config;
        }

        const token = useAuthStore.getState().token;
        if (token) {
          config.headers = config.headers || {};
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (e) {
        console.error('❌ Auth store error:', e);
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      // 응답 없는 네트워크 에러
      if (!error.response) {
        if (import.meta.env.DEV) {
          console.error('❌ 네트워크 에러(응답 없음):', error.message);
          console.error('요청 URL:', error.config?.url);
          console.error('Base URL:', error.config?.baseURL);
        } else {
          console.error('❌ 네트워크 에러(응답 없음)');
        }
        return Promise.reject(error);
      }

      const status = error.response.status;
      const originalConfig = error.config;

      const url = normalizePath(originalConfig?.url || '');

      /**
       * ✅ Auth endpoint 판정도 /api/auth/* 로 통일
       * - 원래 코드의 구조 유지(단, 경로만 수정)
       */
      const isAuthEndpoint =
        url === '/api/auth/login' || url === '/api/auth/refresh' || url === '/api/auth/logout';

      // 401(Access 만료) 처리
      if (status === 401 && !isAuthEndpoint && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          if (!isRefreshing) {
            isRefreshing = true;
            refreshPromise = requestRefresh()
              .then((newToken) => {
                setStoreToken(newToken);
                return newToken;
              })
              .finally(() => {
                isRefreshing = false;
                refreshPromise = null;
              });
          }

          const newToken = await refreshPromise;

          originalConfig.headers = originalConfig.headers || {};
          originalConfig.headers.Authorization = `Bearer ${newToken}`;

          return instance(originalConfig);
        } catch (refreshErr) {
          console.error('❌ Refresh 실패로 세션 종료:', refreshErr);
          clearStoreAuth();
          // window.location.href = '/login';
          return Promise.reject(refreshErr);
        }
      }

      return Promise.reject(error);
    }
  );
};

applyInterceptors(api);
applyInterceptors(uploadApi);

export default api;