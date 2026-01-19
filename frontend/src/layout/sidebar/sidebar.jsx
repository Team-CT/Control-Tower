
import { 
  Plane, Home, Users, Network, Clock, Calendar, 
  ClipboardCheck, Activity, BarChart2, Leaf, 
  Megaphone, FileText, Settings 
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as S from './Sidebar.styled'; 
import React, { useState } from 'react';
const MENU_ITEMS = [
  {
    category: "메인",
    items: [
      { label: "대시보드", icon: Home, id: "/dashboard" }
    ]
  },
  {
    category: "직원 관리",
    adminOnly: true, // ✅ 관리자 전용 메뉴 표시
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
      { label: "승인 관리", icon: ClipboardCheck, id: "/approval" }
    ]
  },
  {
    category: "건강 관리",
    items: [  {
        label: "건강 현황",
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
  const location = useLocation(); // 현재 URL 경로 가져오기
const [openSubMenu, setOpenSubMenu] = useState(null);

  const toggleSubMenu = (id) => {
    setOpenSubMenu(openSubMenu === id ? null : id);
  };
  // ✅ 권한에 따라 메뉴 필터링
  const filteredMenuItems = MENU_ITEMS.filter(section => {
    // 관리자 전용(adminOnly) 메뉴인데, 현재 사용자가 관리자(isAdmin)가 아니면 숨김
    if (section.adminOnly && !isAdmin) {
      return false;
    }
    return true;
  });

  return (
    <S.Container>
      {/* 1. 헤더 (로고) */}
      <S.Header>
        <S.LogoWrapper>
          <S.LogoIcon>
            <Plane size={22} style={{ transform: 'rotate(-45deg)', marginLeft: '2px' }} />
          </S.LogoIcon>
          <S.Title>SkyHR</S.Title>
        </S.LogoWrapper>
        <S.SubTitle>Korean Air HR System</S.SubTitle>
      </S.Header>

      {/* 2. 네비게이션 메뉴 */}
      <S.Nav>
        {filteredMenuItems.map((section, index) => (
          <S.CategorySection key={index}>
            <S.CategoryTitle>{section.category}</S.CategoryTitle>
            
            {section.items.map((item) => {
              const IconComponent = item.icon;
              // 현재 경로가 메뉴 ID(경로)와 일치하면 활성화
              const isActive = location.pathname === item.id;

                    return (
                <div key={item.id}>
                  {/* 메인 메뉴 버튼 */}
                  <S.MenuButton
                    onClick={() => {
                      if (item.subItems) {
                        toggleSubMenu(item.id);
                        navigate(item.id);
                      } else {
                        navigate(item.id);
                      }
                    }}
                    $isActive={isActive}
                  >
                    {IconComponent && <IconComponent size={20} />}
                    <span>{item.label}</span>
                  </S.MenuButton>

                  {/* 하위 메뉴 */}
                  {item.subItems && openSubMenu === item.id && (
                    <div style={{ marginLeft: 28, marginTop: 5 }}>
                      {item.subItems.map((sub) => (
                        <S.MenuButton
                          key={sub.id}
                          onClick={() => navigate(sub.id)}
                          $isActive={location.pathname === sub.id}
                          style={{ fontSize: 14, padding: "4px 0" }}
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
        ))}
      </S.Nav>
    </S.Container>
  );
};

export default Sidebar;