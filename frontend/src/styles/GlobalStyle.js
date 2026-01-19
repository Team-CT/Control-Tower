import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --primary-color: #0055aa;
    --primary-hover: #004488;
    --primary-light: #e0f2fe;
    --secondary-color: #357abd;
    --text-main: #111827;
    --text-sub: #6b7280;
    --bg-main: #f5f7fa;
    --border-color: #e5e7eb;
  }

  /* CSS Reset */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* 기본 폰트 설정 */
  body {
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: var(--text-main);
    line-height: 1.5;
    background-color: var(--bg-main);
  }

  /* 링크 스타일 초기화 */
  a {
    color: inherit;
    text-decoration: none;
    transition: color 0.2s ease;
  }

  /* 버튼 스타일 초기화 */
  button {
    border: none;
    background: none;
    cursor: pointer;
    font: inherit;
    transition: all 0.2s ease;
  }

  /* 리스트 스타일 초기화 */
  ul, ol {
    list-style: none;
  }

  /* 이미지 최적화 */
  img {
    max-width: 100%;
    height: auto;
    vertical-align: middle;
  }

  /* 입력 필드 스타일 초기화 */
  input, textarea {
    font: inherit;
    border: none;
    outline: none;
  }

  /* 테이블 스타일 초기화 */
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  /* 스크롤바 스타일링 */
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #9ca3af;
  }

  /* 선택 영역 스타일링 */
  ::selection {
    background: var(--primary-light);
    color: var(--primary-color);
  }

  /* 기본 포커스 스타일 */
  :focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }
`;

export default GlobalStyle; 

