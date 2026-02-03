import { useState, useEffect } from 'react';
import {
  Plane, Home, Users, Network, Clock, Calendar,
  ClipboardCheck, Activity, Leaf,
  Megaphone, FileText, Settings, List, Smile,
  Sun, Moon, Building2, UserCheck
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAirlineTheme } from '../../context/AirlineThemeContext';
import * as S from './Sidebar.styled';

// =================================================================
// [1] 직원용 메뉴 구조 정의
// =================================================================
const USER_MENU = [
  {
    category: "메인",
    items: [
      { label: "대시보드", icon: Home, id: "/dashboard" }
    ]
  },
  {
    category: "근태 관리",
    items: [
      { label: "내 근태 현황", icon: Calendar, id: "/my-attendance" },
      { label: "휴가 신청", icon: Plane, id: "/vacation" }
    ]
  },
  {
    category: "일정 관리",
    items: [
      { label: "비행편 크루 관리", icon: Plane, id: "/flightschedule" }
    ]
  },
  {
    category: "건강 관리",
    items: [
      {
        label: "건강 현황",
        icon: Activity,
        id: "/health-dashboard",
        subItems: [
          { label: "건강 상세정보", id: "/employeehealthdetail" },
          { label: "건강 정보 제출", id: "/healthinfosubmission" },
          { label: "건강 정보 제출 이력", id: "/healthsubmissionhistory" },
        ],
      },
      { label: "스트레스 설문", icon: Smile, id: "/stress" },
      { label: "건강 프로그램", icon: Leaf, id: "/healthprogramapply" }
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

// =================================================================
// [2] 관리자용 메뉴 구조 정의
// =================================================================
const ADMIN_MENU = [
  {
    category: "메인",
    items: [
      { label: "대시보드", icon: Home, id: "/admin-dashboard" }
    ]
  },
  {
    category: "관리 목록",
    items: [
      {
        label: "직원 관리",
        icon: Users,
        id: "/employee-list",
        subItems: [
          { label: "직원 목록", id: "/employee-list" },
          { label: "직원 스케줄", id: "/employee-schedule" }
        ]
      },
      { label: "부서 관리", icon: Network, id: "/dept-manage" }
    ]
  },
  {
    category: "근태 관리",
    items: [
      { label: "직원 근태 현황", icon: Clock, id: "/admin-attendance" },
      { label: "휴가 승인 관리", icon: ClipboardCheck, id: "/approval" }
    ]
  },
  {
    category: "일정 관리",
    items: [
      { label: "비행편 크루 관리", icon: Plane, id: "/flightschedule" },
      { label: "직원 일정 배정", icon: Calendar, id: "/staff-schedule-assignment" }
    ]
  },
  {
    category: "건강 관리",
    items: [
      { label: "직원 건강 관리", icon: Activity, id: "/employeehealthmanagement" },
      { label: "건강 프로그램 관리", icon: Leaf, id: "/healthprogrammanagement" }
    ]
  },
  {
    category: "기타",
    items: [
      { label: "게시판", icon: Megaphone, id: "/board" },
      { label: "Q&A", icon: FileText, id: "/qna" },
      { label: "설정", icon: Settings, id: "/settings" }
    ]
  },
  {
    category: "시스템 관리",
    items: [
      { label: "공통 코드 관리", icon: List, id: "/common-code" }
    ]
  }
];

// =================================================================
// [3] 슈퍼 관리자용 메뉴 구조 정의
// =================================================================
const SUPER_ADMIN_MENU = [
  {
    category: "메인",
    items: [
      { label: "슈퍼 관리자 대시보드", icon: Home, id: "/super-admin-dashboard" }
    ]
  },
  {
    category: "테넌트 관리",
    items: [
      { label: "테넌트 목록", icon: Building2, id: "/super-admin/tenants" }
    ]
  },
  {
    category: "승인 관리",
    items: [
      { label: "가입 신청 관리", icon: UserCheck, id: "/super-admin/registrations" },
      { label: "항공사 승인 관리", icon: ClipboardCheck, id: "/super-admin/airline-approval" }
    ]
  },
  {
    category: "시스템 관리",
    items: [
      { label: "공통 코드 관리", icon: List, id: "/common-code" }
    ]
  },
  {
    category: "기타",
    items: [
      { label: "설정", icon: Settings, id: "/settings" }
    ]
  }
];

const Sidebar = ({ userRole }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const { theme, isDarkMode, toggleDarkMode, approvalStatus } = useAirlineTheme();

  // 권한에 따라 보여줄 메뉴 리스트 결정
  let currentMenuItems;
  let roleLabel;

  if (userRole === 'SUPER_ADMIN') {
    currentMenuItems = SUPER_ADMIN_MENU;
    roleLabel = '슈퍼 관리자';
  } else if (userRole === 'ADMIN') {
    currentMenuItems = ADMIN_MENU;
    roleLabel = '관리자';
  } else {
    currentMenuItems = USER_MENU;
    roleLabel = '직원';
  }

  // 현재 경로가 속한 서브메뉴 자동 열기
  useEffect(() => {
    currentMenuItems.forEach(section => {
      section.items.forEach(item => {
        if (item.subItems) {
          const isSubActive = item.subItems.some(sub => sub.id === location.pathname);
          if (isSubActive) {
            setOpenSubMenu(item.id);
          }
        }
      });
    });
  }, [location.pathname, currentMenuItems]);

  const toggleSubMenu = (id) => {
    setOpenSubMenu(openSubMenu === id ? null : id);
  };

  return (
    <S.Container>
      {/* 1. 헤더 */}
      <S.Header>
        <S.LogoWrapper>
          <S.LogoIcon>
            {/* styled-components 내부에서 transform 적용됨 */}
            <Plane size={22} strokeWidth={2.5} />
          </S.LogoIcon>
          <S.Title>{theme.airline.name}</S.Title>
        </S.LogoWrapper>
        <S.SubTitle>Airline HR System ({roleLabel})</S.SubTitle>

        {/* 브랜딩 정보 표시 (승인 상태) */}
        <S.BrandingInfo>
          <S.AirlineName>{theme.airline.name}</S.AirlineName>
          <S.ApprovalStatus $status={approvalStatus}>
            {approvalStatus === 'approved' ? '● 승인 완료' : '○ 승인 대기'}
          </S.ApprovalStatus>
        </S.BrandingInfo>
      </S.Header>

      {/* 2. 네비게이션 메뉴 */}
      <S.Nav>
        {currentMenuItems.map((section, index) => (
          <S.CategorySection key={index}>
            <S.CategoryTitle>{section.category}</S.CategoryTitle>

            {section.items.map((item) => {
              const IconComponent = item.icon;

              // 활성화 로직
              const isSelfActive = location.pathname === item.id;
              const isSubActive = item.subItems && item.subItems.some(sub => sub.id === location.pathname);
              const isActive = isSelfActive || isSubActive;

              return (
                <div key={item.id}>
                  <S.MenuButton
                    onClick={() => {
                      if (item.subItems) {
                        toggleSubMenu(item.id);
                      } else {
                        navigate(item.id);
                      }
                    }}
                    $isActive={isActive}
                  >
                    {IconComponent && <IconComponent size={20} />}
                    <span>{item.label}</span>
                  </S.MenuButton>

                  {/* 하위 메뉴 렌더링 */}
                  {item.subItems && openSubMenu === item.id && (
                    <S.SubMenuContainer>
                      {item.subItems.map((sub) => (
                        <S.SubMenuButton
                          key={sub.id}
                          onClick={() => navigate(sub.id)}
                          $isActive={location.pathname === sub.id}
                        >
                          <span>{sub.label}</span>
                        </S.SubMenuButton>
                      ))}
                    </S.SubMenuContainer>
                  )}
                </div>
              );
            })}
          </S.CategorySection>
        ))}
      </S.Nav>

      {/* 3. 푸터 (다크모드 토글) */}
      <S.Footer>
        <S.ThemeToggleButton onClick={toggleDarkMode}>
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          {isDarkMode ? '라이트 모드' : '다크 모드'}
        </S.ThemeToggleButton>
      </S.Footer>
    </S.Container>
  );
};

export default Sidebar;