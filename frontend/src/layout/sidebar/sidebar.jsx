import React, { useState, useEffect } from 'react';
import { 
  Plane, Home, Users, Network, Clock, Calendar, 
  ClipboardCheck, Activity, BarChart2, Leaf, 
  Megaphone, FileText, Settings, RefreshCcw,
  Database // [추가] 공통 코드 관리용 아이콘
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAirlineTheme } from '../../context/AirlineThemeContext';
import * as S from './Sidebar.styled'; 

const MENU_ITEMS = [
  {
    category: "메인",
    items: [
      { label: "대시보드", icon: Home, id: "/dashboard" }
    ]
  },
  {
    category: "직원 관리",
    adminOnly: true, // 관리자 전용
    items: [
      { label: "직원 목록", icon: Users, id: "/employee-list" },
      { label: "부서 관리", icon: Network, id: "/dept-manage" }
    ]
  },
  {
    category: "근태 관리",
    items: [
      { label: "근태 현황", icon: Clock, id: "/attendance" },
      { label: "휴가 신청", icon: Calendar, id: "/vacation" },
      { label: "승인 관리", icon: ClipboardCheck, id: "/approval", adminOnly: true }
    ]
  },
  {
    category: "건강 관리",
    items: [
      // 1. 관리자만 보는 전체 현황판
      { 
        label: "직원 건강 현황", 
        icon: Activity, 
        id: "/employeehealthmanagement", 
        adminOnly: true 
      },

      // 2. 일반 직원용 메뉴
      {
        label: "나의 건강 관리",
        icon: Activity, 
        id: "/health-dashboard",
        subItems: [
          { label: "건강 상세정보", id: "/employeehealthdetail" },
          { label: "건강 정보 제출", id: "/healthinfosubmission" },
          { label: "건강 정보 제출 이력", id: "/healthsubmissionhistory" },
        ],
      },
      
      { label: "스트레스 설문", icon: BarChart2, id: "/stress" },
      { label: "건강 프로그램", icon: Leaf, id: "/healthprogrammanagement" } 
    ]
  },
  // [추가] 시스템 관리 카테고리 (관리자 전용)
  {
    category: "시스템 관리",
    adminOnly: true,
    items: [
      { label: "공통 코드 관리", icon: Database, id: "/common-code" }
    ]
  },
  {
    category: "기타",
    items: [
      { label: "게시판", icon: Megaphone, id: "/board" },
      { label: "Q&A", icon: FileText, id: "/qna" },
      { label: "설정", icon: Settings, id: "/settings" }
    ]
  }
];

const Sidebar = ({ isAdmin }) => {
  const navigate = useNavigate();
  const location = useLocation(); 
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const { theme, toggleAirline, currentAirline } = useAirlineTheme();

  // 현재 경로가 변경될 때, 해당 경로가 속한 서브메뉴를 자동으로 열기
  useEffect(() => {
    MENU_ITEMS.forEach(section => {
      section.items.forEach(item => {
        if (item.subItems) {
          const isSubActive = item.subItems.some(sub => sub.id === location.pathname);
          if (isSubActive) {
            setOpenSubMenu(item.id);
          }
        }
      });
    });
  }, [location.pathname]);

  const toggleSubMenu = (id) => {
    setOpenSubMenu(openSubMenu === id ? null : id);
  };

  const handleToggleAirline = () => {
    // KE <-> LJ 토글
    toggleAirline(currentAirline === 'KE' ? 'LJ' : 'KE');
  };

  return (
    <S.Container>
      {/* 1. 헤더 (로고 배경색이 테마 메인컬러로 자동 적용됨) */}
      <S.Header>
        <S.LogoWrapper>
          <S.LogoIcon>
            <Plane size={24} style={{ transform: 'rotate(-45deg)' }} />
          </S.LogoIcon>
          <S.Title>{theme.name}</S.Title>
        </S.LogoWrapper>
        <S.SubTitle>Airline HR System</S.SubTitle>
      </S.Header>

      {/* 2. 네비게이션 메뉴 */}
      <S.Nav>
        {MENU_ITEMS.map((section, index) => {
          // 카테고리 권한 체크
          if (section.adminOnly && !isAdmin) return null;

          // 아이템 권한 체크
          const visibleItems = section.items.filter(item => {
            if (item.adminOnly && !isAdmin) return false;
            return true;
          });

          if (visibleItems.length === 0) return null;

          return (
            <S.CategorySection key={index}>
              <S.CategoryTitle>{section.category}</S.CategoryTitle>
              
              {visibleItems.map((item) => {
                const IconComponent = item.icon;
                
                // 활성화 로직: 현재 경로가 메뉴 ID와 같거나, 서브메뉴 중 하나와 같을 때
                const isSelfActive = location.pathname === item.id;
                const isSubActive = item.subItems && item.subItems.some(sub => sub.id === location.pathname);
                const isActive = isSelfActive || isSubActive;

                return (
                  <div key={item.id}>
                    <S.MenuButton
                      onClick={() => {
                        if (item.subItems) {
                          toggleSubMenu(item.id);
                          navigate(item.id); 
                        } else {
                          navigate(item.id);
                        }
                      }}
                      $isActive={isActive} // 스타일 컴포넌트에 상태 전달
                    >
                      {IconComponent && <IconComponent size={20} />}
                      <span>{item.label}</span>
                    </S.MenuButton>

                    {/* 하위 메뉴 */}
                    {item.subItems && openSubMenu === item.id && (
                      <div style={{ marginLeft: 12, marginTop: 4, paddingLeft: 12, borderLeft: '2px solid #f0f0f0' }}>
                        {item.subItems.map((sub) => (
                          <S.MenuButton
                            key={sub.id}
                            onClick={() => navigate(sub.id)}
                            $isActive={location.pathname === sub.id}
                            style={{ fontSize: 14, padding: "10px 12px" }}
                          >
                            <span>{sub.label}</span>
                          </S.MenuButton>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </S.CategorySection>
          );
        })}
      </S.Nav>
      
      {/* 3. 테스트용 항공사 전환 버튼 (하단 고정) */}
      <div style={{ marginTop: 'auto', padding: '12px 0' }}>
        <button 
          onClick={handleToggleAirline}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#f5f5f5',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            color: '#666',
            fontSize: '13px',
            fontWeight: '600',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#eeeeee'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#f5f5f5'}
        >
          <RefreshCcw size={14} />
          {theme.name === '대한항공' ? '진에어로 전환' : '대한항공으로 전환'}
        </button>
      </div>
    </S.Container>
  );
};

export default Sidebar;