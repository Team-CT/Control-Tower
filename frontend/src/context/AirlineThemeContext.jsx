import React, { createContext, useContext, useState, useEffect } from 'react';
import { createTheme } from '../styles/theme';

const AirlineThemeContext = createContext();

export const useAirlineTheme = () => {
  const context = useContext(AirlineThemeContext);
  if (!context) {
    throw new Error('useAirlineTheme must be used within AirlineThemeProvider');
  }
  return context;
};

export const AirlineThemeProvider = ({ children }) => {
  // [State 1] 현재 선택된 항공사 (기본: CONTROL_TOWER)
  const [currentAirline, setCurrentAirline] = useState(() => {
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

  // 테마 객체 생성 (항공사 코드 + 다크모드 여부 조합)
  const theme = createTheme(currentAirline, isDarkMode);

  // --- Effects (LocalStorage 동기화) ---
  useEffect(() => {
    localStorage.setItem('airlineCode', currentAirline);
  }, [currentAirline]);

  useEffect(() => {
    localStorage.setItem('approvalStatus', approvalStatus);
  }, [approvalStatus]);

  useEffect(() => {
    localStorage.setItem('darkMode', isDarkMode);
  }, [isDarkMode]);

  // --- Actions ---

  // 1. 항공사 변경 (승인 시뮬레이션 포함)
  const changeAirline = (airlineCode) => {
    setCurrentAirline(airlineCode);
    setApprovalStatus('approved'); // 항공사를 선택하면 승인된 것으로 간주 (시나리오상)
  };

  // 2. 승인 상태 변경
  const updateApprovalStatus = (status) => {
    setApprovalStatus(status);
    
    // 승인이 취소되거나 대기 상태가 되면 Control Tower로 복귀
    if (status !== 'approved') {
      setCurrentAirline('CONTROL_TOWER');
    }
  };

  // 3. 다크 모드 토글
  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  // 4. 레거시 호환용 (단순 토글) - 필요에 따라 유지
  const toggleAirline = (code) => {
    const nextCode = code || (currentAirline === 'KE' ? 'LJ' : 'KE');
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