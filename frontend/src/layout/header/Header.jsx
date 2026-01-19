import React from 'react';
import { useLocation } from 'react-router-dom';
import { Search } from 'lucide-react';
import * as S from './Header.styled';

const Header = () => {
  const location = useLocation();

  // 현재 경로(pathname)에 따라 보여줄 페이지 제목 설정
  const getPageTitle = (pathname) => {
    switch(pathname) {
      case '/dashboard': return '대시보드';
      case '/board': return '게시판';
      case '/qna': return 'Q&A';
      case '/employee-list': return '직원 목록';
      case '/dept-manage': return '부서 관리';
      case '/attendance': return '근태 현황';
      case '/vacation': return '휴가 신청';
      case '/approval': return '승인 관리';
      case '/health-status': return '건강 현황';
      case '/stress': return '스트레스 설문';
      case '/health-program': return '건강 프로그램';
      case '/settings': return '설정';
      default: return '페이지';
    }
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
            <S.UserRole>직원 관리자</S.UserRole>
          </S.UserInfo>
        </S.UserProfile>
      </S.HeaderRight>
    </S.HeaderContainer>
  );
};

export default Header;