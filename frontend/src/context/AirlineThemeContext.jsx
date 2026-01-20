import React, { createContext, useState, useContext } from 'react';
import { ThemeProvider } from 'styled-components';

const AirlineThemeContext = createContext();

// 항공사별 테마 색상 정의
const AIRLINE_THEMES = {
  KE: { // 대한항공
    primary: '#0066CC',     // 메인 파랑
    secondary: '#87CEEB',   // 보조 하늘색
    hover: '#E6F0FA',       // 연한 배경 (사이드바 hover 등)
    name: '대한항공'
  },
  LJ: { // 진에어
    primary: '#9ACD32',     // 메인 연두
    secondary: '#6B8E23',   // 보조 올리브
    hover: '#F4F9E6',       // 연한 배경
    name: '진에어'
  }
};

export const AirlineThemeProvider = ({ children }) => {
  // 기본값은 대한항공(KE)
  const [currentAirline, setCurrentAirline] = useState('KE');

  const toggleAirline = (code) => {
    setCurrentAirline(code);
  };

  const theme = AIRLINE_THEMES[currentAirline];

  return (
    <AirlineThemeContext.Provider value={{ currentAirline, toggleAirline, theme }}>
      {/* styled-components의 ThemeProvider에 전달하여 모든 스타일 파일에서 props.theme로 접근 가능 */}
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </AirlineThemeContext.Provider>
  );
};

export const useAirlineTheme = () => useContext(AirlineThemeContext);