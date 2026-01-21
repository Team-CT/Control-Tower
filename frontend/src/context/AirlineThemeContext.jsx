import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { createTheme } from '../styles/theme';

const AirlineThemeContext = createContext();

export const useAirlineTheme = () => {
  const context = useContext(AirlineThemeContext);
  if (!context) {
    throw new Error('useAirlineTheme must be used within AirlineThemeProvider');
  }
  return context;
};

// Control Tower 테마를 사용해야 하는 경로 판별 함수
const shouldUseControlTowerTheme = (pathname) => {
  // Condition A: Control Tower 테마 적용 경로
  const controlTowerPaths = [
    '/super-admin',           // 슈퍼 관리자 모든 페이지
    '/service-registration',  // 서비스 가입 신청
    '/register',              // 회원가입
    '/login',                 // 로그인
    '/find-employee-id',      // 사번 찾기
    '/find-password',         // 비밀번호 찾기
    '/work-login',            // 출근 로그인
    '/',                      // 랜딩 페이지 (정확히 루트만)
    '/account-activation'     // 계정 활성화
  ];
  
  // 정확히 루트 경로인 경우
  if (pathname === '/') {
    return true;
  }
  
  // URL이 Control Tower 경로로 시작하는지 확인
  return controlTowerPaths.some(path => path !== '/' && pathname.startsWith(path));
};

export const AirlineThemeProvider = ({ children }) => {
  const location = useLocation();
  
  // [State 1] 현재 선택된 항공사 (기본: CONTROL_TOWER)
  const [savedAirlineCode, setSavedAirlineCode] = useState(() => {
    return localStorage.getItem('airlineCode') || 'CONTROL_TOWER';
  });

  // [State 2] 승인 상태 (pending | approved | rejected)
  const [approvalStatus, setApprovalStatus] = useState(() => {
    return localStorage.getItem('approvalStatus') || 'pending';
  });

  // [State 3] 다크 모드
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved === 'true';
  });

  // 경로 기반으로 실제 사용할 항공사 코드 결정
  const getEffectiveAirlineCode = () => {
    if (shouldUseControlTowerTheme(location.pathname)) {
      return 'CONTROL_TOWER';
    }
    
    // Airline 테마 적용: LocalStorage에서 가져오기
    return savedAirlineCode;
  };

  // 현재 경로에 따라 결정된 항공사 코드
  const currentAirline = getEffectiveAirlineCode();

  // 테마 객체 생성 (항공사 코드 + 다크모드 여부 조합)
  const theme = createTheme(currentAirline, isDarkMode);

  // --- Effects (LocalStorage 동기화) ---
  useEffect(() => {
    localStorage.setItem('airlineCode', savedAirlineCode);
  }, [savedAirlineCode]);

  useEffect(() => {
    localStorage.setItem('approvalStatus', approvalStatus);
  }, [approvalStatus]);

  useEffect(() => {
    localStorage.setItem('darkMode', isDarkMode);
    
    // CSS Variables 업데이트
    updateCSSVariables(theme);
  }, [isDarkMode, theme]);

  // 경로 변경 시 CSS Variables 업데이트
  useEffect(() => {
    updateCSSVariables(theme);
  }, [location.pathname, theme]);

  // CSS Variables 업데이트 함수
  const updateCSSVariables = (currentTheme) => {
    const root = document.documentElement;
    
    // 브랜드 컬러
    root.style.setProperty('--color-primary', currentTheme.colors.primary);
    root.style.setProperty('--color-secondary', currentTheme.colors.secondary);
    root.style.setProperty('--color-accent', currentTheme.colors.accent);
    root.style.setProperty('--color-hover', currentTheme.colors.hover);
    root.style.setProperty('--color-danger', currentTheme.colors.danger);
    
    // 배경 색상
    root.style.setProperty('--bg-main', currentTheme.background.main);
    root.style.setProperty('--bg-secondary', currentTheme.background.secondary);
    root.style.setProperty('--bg-tertiary', currentTheme.background.tertiary);
    root.style.setProperty('--bg-hover', currentTheme.background.hover);
    root.style.setProperty('--bg-modal', currentTheme.background.modal);
    root.style.setProperty('--bg-input', currentTheme.background.input);
    
    // 텍스트 색상
    root.style.setProperty('--text-primary', currentTheme.text.primary);
    root.style.setProperty('--text-secondary', currentTheme.text.secondary);
    root.style.setProperty('--text-tertiary', currentTheme.text.tertiary);
    root.style.setProperty('--text-disabled', currentTheme.text.disabled);
    root.style.setProperty('--text-inverse', currentTheme.text.inverse);
    
    // 기타
    root.style.setProperty('--border-color', currentTheme.border);
    root.style.setProperty('--shadow-color', currentTheme.shadow);
    root.style.setProperty('--overlay-color', currentTheme.overlay);
  };

  // --- Actions ---

  // 1. 항공사 변경 (승인 시뮬레이션 포함)
  const changeAirline = (airlineCode) => {
    setSavedAirlineCode(airlineCode);
    setApprovalStatus('approved'); // 항공사를 선택하면 승인된 것으로 간주 (시나리오상)
  };

  // 2. 승인 상태 변경
  const updateApprovalStatus = (status) => {
    setApprovalStatus(status);
    
    // 승인이 취소되거나 대기 상태가 되면 Control Tower로 복귀
    if (status !== 'approved') {
      setSavedAirlineCode('CONTROL_TOWER');
    }
  };

  // 3. 다크 모드 토글
  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  // 4. 레거시 호환용 (단순 토글) - 필요에 따라 유지
  const toggleAirline = (code) => {
    const nextCode = code || (savedAirlineCode === 'KE' ? 'LJ' : 'KE');
    changeAirline(nextCode);
  };

  const value = {
    theme,
    currentAirline,
    approvalStatus,
    isDarkMode,
    changeAirline,
    updateApprovalStatus,
    toggleDarkMode,
    toggleAirline,
    
    // Helper Properties
    airlineName: theme.airline.name,
    isApproved: approvalStatus === 'approved',
    isControlTower: currentAirline === 'CONTROL_TOWER'
  };

  return (
    <AirlineThemeContext.Provider value={value}>
      {children}
    </AirlineThemeContext.Provider>
  );
};

export default AirlineThemeContext;