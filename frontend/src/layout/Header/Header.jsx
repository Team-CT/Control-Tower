import React from 'react';
import { useLocation } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useAirlineTheme } from '../../context/AirlineThemeContext';
import { getPageTitle } from '../../constants/pageTitles';
import * as S from './Header.styled';

const Header = () => {
  const location = useLocation();
  const { theme } = useAirlineTheme();

  // 중앙화된 설정 파일에서 현재 페이지 타이틀 가져오기
  const currentTitle = getPageTitle(location.pathname);

  return (
    <S.HeaderContainer>
      {/* 왼쪽: 브레드크럼 (홈 > 현재페이지) */}
      <S.Breadcrumb>
        <S.BreadcrumbItem>홈</S.BreadcrumbItem>
        <S.BreadcrumbSeparator>›</S.BreadcrumbSeparator>
        <S.BreadcrumbItem $active={true}>{currentTitle}</S.BreadcrumbItem>
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
          <S.UserAvatar>김</S.UserAvatar>
          <S.UserInfo>
            <S.UserName>김민수</S.UserName>
            <S.UserRole>{theme.name} 관리자</S.UserRole>
          </S.UserInfo>
        </S.UserProfile>
      </S.HeaderRight>
    </S.HeaderContainer>
  );
};

export default Header;
