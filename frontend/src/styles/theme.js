// 테마 색상 팔레트 정의
export const airlines = {
  // Control Tower (기본 중립 상태)
  CONTROL_TOWER: {
    id: 'CONTROL_TOWER',
    name: 'Control Tower',
    code: 'CT',
    colors: {
      primary: '#4A5568',      // 중립적인 회색 (Slate-600)
      secondary: '#2D3748',    // 어두운 회색 (Slate-800)
      accent: '#718096',       // 보조 회색 (Slate-500)
      hover: '#E2E8F0',        // 호버 배경색 (Slate-200) - 라이트모드 기준
      danger: '#E53E3E'        // 위험/오류 (Red-600)
    }
  },
  // 대한항공
  KE: {
    id: 'KE',
    name: 'Korean Air',
    code: 'KE',
    colors: {
      primary: '#0066CC',      // 대한항공 청자색 계열 블루
      secondary: '#004C99',    // 진한 블루
      accent: '#3399FF',       // 밝은 블루
      hover: '#E6F0FF',        // 호버 배경색
      danger: '#E53E3E'
    }
  },
  // 진에어
  LJ: {
    id: 'LJ',
    name: 'Jin Air',
    code: 'LJ',
    colors: {
      primary: '#9ACD32',      // 진에어 연두색
      secondary: '#6B8E23',    // 올리브 그린
      accent: '#C5E1A5',       // 밝은 연두
      hover: '#F1F8E9',        // 호버 배경색
      danger: '#E53E3E'
    }
  }
};

// 라이트 모드 공통 색상
export const lightTheme = {
  mode: 'light',
  background: {
    main: '#FFFFFF',
    secondary: '#F1F5F9',      // Slate-100 (For Content Background)
    tertiary: '#EDF2F7',       // Slate-100
    hover: '#E2E8F0',          // Slate-200
    modal: '#FFFFFF',
    input: '#F7FAFC'
  },
  text: {
    primary: '#1A202C',        // Gray-900
    secondary: '#4A5568',      // Gray-600
    tertiary: '#718096',       // Gray-500
    disabled: '#A0AEC0',       // Gray-400
    inverse: '#FFFFFF'         // 반전 텍스트 (아이콘 등)
  },
  border: '#E2E8F0',           // Slate-200
  shadow: 'rgba(0, 0, 0, 0.1)',
  overlay: 'rgba(0, 0, 0, 0.5)'
};

// 다크 모드 공통 색상
export const darkTheme = {
  mode: 'dark',
  background: {
    main: '#1A202C',           // Gray-900 (Sidebar/Header)
    secondary: '#11151C',      // Almost Black (Content Background)
    tertiary: '#2D3748',       // Gray-800
    hover: '#2D3748',          // Gray-800 (호버 시 밝게)
    modal: '#2D3748',
    input: '#1A202C'
  },
  text: {
    primary: '#F7FAFC',        // Gray-50
    secondary: '#E2E8F0',      // Gray-200
    tertiary: '#CBD5E0',       // Gray-300
    disabled: '#718096',       // Gray-500
    inverse: '#1A202C'         // 반전 텍스트
  },
  border: '#4A5568',           // Gray-700
  shadow: 'rgba(0, 0, 0, 0.4)',
  overlay: 'rgba(0, 0, 0, 0.7)'
};

// 테마 생성 함수
export const createTheme = (airlineCode, isDark = false) => {
  // 항공사가 없으면 Control Tower 기본값
  const airline = airlines[airlineCode] || airlines.CONTROL_TOWER;
  
  // 다크모드 여부에 따른 베이스 테마 선택
  const baseTheme = isDark ? darkTheme : lightTheme;

  // 최종 테마 객체 반환
  return {
    ...baseTheme,
    airline: {
      id: airline.id,
      name: airline.name,
      code: airline.code
    },
    // 색상 우선순위: 항공사 브랜드 컬러를 메인으로 하되, 다크모드 시 조정 가능
    colors: {
      primary: airline.colors.primary,
      secondary: airline.colors.secondary,
      accent: airline.colors.accent,
      hover: isDark ? baseTheme.background.hover : airline.colors.hover, // 다크모드에선 배경색 기준 호버
      danger: airline.colors.danger
    }
  };
};

export default { airlines, lightTheme, darkTheme, createTheme };
