import React from 'react';
import { useLocation } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useAirlineTheme } from '../../context/AirlineThemeContext';
import * as S from './Header.styled';

const Header = () => {
  const location = useLocation();
  const { theme } = useAirlineTheme();

  // 현재 경로(pathname)에 따라 보여줄 페이지 제목 설정 (개선된 버전)
  const getPageTitle = (pathname) => {
    // 디버깅용 로그
    console.log('🔍 Current pathname:', pathname);

    // 경로 정규화 (끝의 슬래시 제거)
    const normalizedPath = pathname.endsWith('/') && pathname !== '/'
      ? pathname.slice(0, -1)
      : pathname;

    console.log('✅ Normalized path:', normalizedPath);

    // startsWith 방식으로 경로 매칭 (서브 경로 포함)
    if (normalizedPath === '/' || normalizedPath === '/dashboard') {
      return '대시보드';
    }

    // 관리자 페이지 매핑
    if (normalizedPath.startsWith('/admin-attendance')) {
      return '관리자 근태 현황';
    }
    if (normalizedPath.startsWith('/dashboard/admin')) {
      return '관리자 대시보드';
    }

    // 일반 페이지 매핑
    if (normalizedPath.startsWith('/board')) {
      return '게시판';
    }
    if (normalizedPath.startsWith('/qna')) {
      return 'Q&A';
    }
    if (normalizedPath.startsWith('/employee-list')) {
      return '직원 목록';
    }
    if (normalizedPath.startsWith('/dept-manage')) {
      return '부서 관리';
    }
    if (normalizedPath.startsWith('/employee-attendance')) {
      return '직원 근태 현황';
    }
    if (normalizedPath.startsWith('/attendance')) {
      return '근태 현황';
    }
    if (normalizedPath.startsWith('/vacation')) {
      return '휴가 신청';
    }
    if (normalizedPath.startsWith('/approval')) {
      return '승인 관리';
    }
    if (normalizedPath.startsWith('/health-status')) {
      return '건강 현황';
    }
    if (normalizedPath.startsWith('/stress')) {
      return '스트레스 설문';
    }
    if (normalizedPath.startsWith('/health-program')) {
      return '건강 프로그램';
    }
    if (normalizedPath.startsWith('/settings')) {
      return '설정';
    }

    // 매칭되지 않은 경로 로그
    console.warn('⚠️ No matching title found for path:', normalizedPath);
    return '페이지';
  };

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