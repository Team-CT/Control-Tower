const {
  VITE_API_URL,
  VITE_API_TIMEOUT = 5000,
  VITE_API_VERSION = 'v1',
} = import.meta.env;

// 프로덕션 기본 API URL (빌드 시 VITE_API_URL 미설정 시 사용)
const PRODUCTION_API_BASE = 'https://api.wkdwlsdn.shop';


export const API_CONFIG = {
  /**
   * 개발 환경:
   * - BASE_URL = '' → Vite 프록시 사용
   *
   * 프로덕션 환경:
   * - VITE_API_URL 있으면 사용
   * - 없으면 기본 도메인 사용
   */
  BASE_URL: import.meta.env.DEV
    ? ''
    : (VITE_API_URL || PRODUCTION_API_BASE),

  TIMEOUT: VITE_API_TIMEOUT,

  HEADERS: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};

/**
 * API 절대 URL (fetch/SSE/href용)
 * BASE_URL 없으면 상대경로 반환
 */
export const getApiBaseUrl = () =>
  API_CONFIG.BASE_URL
    ? API_CONFIG.BASE_URL.replace(/\/$/, '')
    : '';

export const API_ENDPOINTS = {
  // Health API
  HEALTH: {
    BASE: `/api/health`,
    PREVIEW: `/api/health/preview`,
    SAVE: `/api/health/save`,
    DETAIL: `/api/health/detail`,
  },
};