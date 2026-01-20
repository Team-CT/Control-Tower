import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Sidebar from './Sidebar/Sidebar';
import Header from './Header/Header';
import Footer from './Footer/Footer';

// 전체 레이아웃 (화면 꽉 채움, 스크롤 없음)
const LayoutContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: var(--bg-main);
  overflow: hidden;
`;

// 오른쪽 콘텐츠 영역 (헤더 + 내용 + 푸터)
const ContentArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
`;

// 실제 스크롤이 발생하는 영역
const ScrollableContent = styled.main`
  flex: 1;
  overflow-y: auto;
  width: 100%;
  
  /* 내용을 위로, 푸터를 아래로 밀어내기 위한 Flex 설정 */
  display: flex;
  flex-direction: column;
`;

// 페이지 본문이 들어갈 래퍼 (최소 높이 확보)
const PageContent = styled.div`
  flex: 1; /* 남은 공간을 모두 차지하여 푸터를 바닥으로 밈 */
  width: 100%;
`;

const MainLayout = () => {
  // [수정 포인트] 로컬 스토리지에서 저장된 직책(Role) 가져오기
  const userRole = localStorage.getItem('userRole');

  // 관리자 여부 동적 판단
  // userRole이 'ADMIN'이거나 'HR_MANAGER'인 경우에만 true
  const isAdmin = userRole === 'ADMIN' || userRole === 'HR_MANAGER';

  return (
    <LayoutContainer>
      {/* 1. 좌측 사이드바 (isAdmin 값 전달) */}
      <Sidebar isAdmin={isAdmin} />
      
      <ContentArea>
        {/* 2. 상단 헤더 (고정) */}
        <Header />
        
        {/* 3. 스크롤 가능한 메인 영역 */}
        <ScrollableContent>
          
          {/* 실제 페이지 내용 (Outlet) */}
          <PageContent>
            <Outlet />
          </PageContent>

          {/* 4. 하단 푸터 (공통) */}
          <Footer />
          
        </ScrollableContent>
      </ContentArea>
    </LayoutContainer>
  );
};

export default MainLayout;