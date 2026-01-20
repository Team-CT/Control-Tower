import { useState, useEffect } from 'react';
import { 
  Plane, Home, Users, Network, Clock, Calendar, 
  ClipboardCheck, Activity, BarChart2, Leaf, 
  Megaphone, FileText, Settings, RefreshCcw,
  List, Smile // 아이콘 추가
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
      { label: "근태 현황", icon: Clock, id: "/attendance" }, // Route: /attendance
      { label: "휴가 신청", icon: Calendar, id: "/vacation" } // Route: /vacation
    ]
  },
  {
    category: "운항 관리",
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
        id: "/health-dashboard", // Route: /health-dashboard
        subItems: [
          { label: "건강 상세정보", id: "/employeehealthdetail" }, // Route: /employeehealthdetail (App.jsx 라인 80 확인)
          { label: "건강 정보 제출", id: "/healthinfosubmission" }, // Route: /healthinfosubmission
          { label: "건강 정보 제출 이력", id: "/healthsubmissionhistory" }, // Route: /healthsubmissionhistory
        ],
      },
      { label: "스트레스 설문", icon: Smile, id: "/stress" }, // Route: /stress
      { label: "건강 프로그램", icon: Leaf, id: "/healthprogramapply" } // Route: /healthprogramapply
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
        id: "/employee-list", // Route: /employee-list
        subItems: [
            { label: "직원 목록", id: "/employee-list" },
            { label: "직원 스케줄", id: "/employee-schedule" } // 직원 스케줄 추가
        ]
      },
      { label: "부서 관리", icon: Network, id: "/dept-manage" } // Route: /dept-manage
    ]
  },
  {
    category: "근태 관리",
    items: [
      { label: "근태 현황", icon: Clock, id: "/attendance" }, // 근태 현황 추가
      { label: "휴가 승인 관리", icon: ClipboardCheck, id: "/approval" } // Route: /approval
    ]
  },
  {
    category: "운항 관리",
    items: [
      { label: "비행편 크루 관리", icon: Plane, id: "/flightschedule" }
    ]
  },
  {
    category: "건강 관리",
    items: [
      { label: "직원 건강 관리", icon: Activity, id: "/employeehealthmanagement" }, // Route: /employeehealthmanagement
      { label: "건강 프로그램 관리", icon: Leaf, id: "/healthprogrammanagement" } // Route: /healthprogrammanagement
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

const Sidebar = ({ isAdmin }) => {
  const navigate = useNavigate();
  const location = useLocation(); 
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const { theme, toggleAirline, currentAirline } = useAirlineTheme();

  // 권한에 따라 보여줄 메뉴 리스트 결정
  const currentMenuItems = isAdmin ? ADMIN_MENU : USER_MENU;

  // 현재 경로가 변경될 때, 해당 경로가 속한 서브메뉴를 자동으로 열기
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
  }, [location.pathname, isAdmin]); // isAdmin이 바뀌면 메뉴구조도 바뀌므로 의존성 추가

  const toggleSubMenu = (id) => {
    setOpenSubMenu(openSubMenu === id ? null : id);
  };

  const handleToggleAirline = () => {
    toggleAirline(currentAirline === 'KE' ? 'LJ' : 'KE');
  };

  return (
    <S.Container>
      {/* 1. 헤더 */}
      <S.Header>
        <S.LogoWrapper>
          <S.LogoIcon>
            <Plane size={22} style={{ transform: 'rotate(-45deg)', marginLeft: '2px' }} />
          </S.LogoIcon>
          <S.Title>SkyHR</S.Title>
        </S.LogoWrapper>
        <S.SubTitle>Airline HR System ({isAdmin ? '관리자' : '직원'})</S.SubTitle>
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
                        // 서브메뉴가 있으면 부모 클릭 시 첫번째 서브메뉴로 이동시킬지, 
                        // 아니면 그냥 열기만 할지 결정 (여기선 열기만 함)
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
    </S.Container>
  );
};

export default Sidebar;