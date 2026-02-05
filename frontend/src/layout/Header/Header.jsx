import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useAirlineTheme } from '../../context/AirlineThemeContext';
import { getPageTitle } from '../../constants/pageTitles';
import * as S from './Header.styled';
import useAuthStore from '../../store/authStore';
import { USER_MENU, ADMIN_MENU, SUPER_ADMIN_MENU } from '../../constants/menu';

const Header = () => {
  const location = useLocation();
  const { theme } = useAirlineTheme();

  // Auth Store에서 사용자 정보 가져오기
  const { emp } = useAuthStore();

  // 현재 역할에 맞는 메뉴 리스트 가져오기
  const currentMenu = useMemo(() => {
    if (emp?.role === 'SUPER_ADMIN') return SUPER_ADMIN_MENU;
    if (emp?.role === 'ADMIN') return ADMIN_MENU;
    return USER_MENU;
  }, [emp?.role]);

  // 현재 경로에 대한 브레드크럼 정보 찾기
  // 1. 메뉴에서 현재 경로 찾기
  // 2. 찾으면 [Category] > [Label] (> [SubLabel]) 형태
  // 3. 못 찾으면 getPageTitle 사용 (기존 로직 fallback)
  const breadcrumbInfo = useMemo(() => {
    const currentPath = location.pathname;

    // 메뉴 순회하여 경로 찾기
    for (const category of currentMenu) {
      for (const item of category.items) {
        // 1. 메인 아이템 매칭
        if (item.id === currentPath) {
          return { category: category.category, label: item.label, subLabel: null };
        }
        // 2. 서브 아이템 매칭
        if (item.subItems) {
          const subItem = item.subItems.find(sub => sub.id === currentPath);
          if (subItem) {
            return { category: category.category, label: item.label, subLabel: subItem.label };
          }
        }
      }
    }

    // 못 찾은 경우 기존 pageTitles 활용
    return { category: '홈', label: getPageTitle(currentPath), subLabel: null };
  }, [location.pathname, currentMenu]);

  return (
    <S.HeaderContainer>
      {/* 왼쪽: 브레드크럼 (홈 > 카테고리 > 현재페이지) */}
      <S.Breadcrumb>
        <S.BreadcrumbItem>홈</S.BreadcrumbItem>
        {breadcrumbInfo.category && breadcrumbInfo.category !== '메인' && (
          <>
            <S.BreadcrumbSeparator>›</S.BreadcrumbSeparator>
            <S.BreadcrumbItem>{breadcrumbInfo.category}</S.BreadcrumbItem>
          </>
        )}
        <S.BreadcrumbSeparator>›</S.BreadcrumbSeparator>
        <S.BreadcrumbItem $active={!breadcrumbInfo.subLabel}>
          {breadcrumbInfo.label}
        </S.BreadcrumbItem>
        {breadcrumbInfo.subLabel && (
          <>
            <S.BreadcrumbSeparator>›</S.BreadcrumbSeparator>
            <S.BreadcrumbItem $active={true}>
              {breadcrumbInfo.subLabel}
            </S.BreadcrumbItem>
          </>
        )}
      </S.Breadcrumb>

      {/* 오른쪽: 검색, 알림, 프로필 */}
      <S.HeaderRight>
        <S.SearchIconButton>
          <Search size={20} />
        </S.SearchIconButton>

        <S.NotificationBadge>
          <S.NotificationIcon>🔔</S.NotificationIcon>
          <S.Badge>1</S.Badge>
        </S.NotificationBadge>

        <S.UserProfile>
          <S.UserAvatar>{emp?.empName ? emp.empName.charAt(0) : 'G'}</S.UserAvatar>
          <S.UserInfo>
            <S.UserName>{emp?.empName || 'Guest'}</S.UserName>
            <S.UserRole>{theme.name} {emp?.role === 'SUPER_ADMIN' ? '슈퍼 관리자' : emp?.role === 'ADMIN' ? '관리자' : '직원'}</S.UserRole>
          </S.UserInfo>
        </S.UserProfile>
      </S.HeaderRight>
    </S.HeaderContainer>
  );
};

export default Header;
