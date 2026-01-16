import styled from 'styled-components';

// 전체 사이드바 컨테이너 (화이트 테마)
export const Container = styled.aside`
  width: 260px;
  height: 100vh;
  background-color: #ffffff; /* 흰색 배경 */
  border-right: 1px solid #e5e7eb; /* 연한 회색 테두리 */
  display: flex;
  flex-direction: column;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
`;

// 상단 로고 영역
export const Header = styled.div`
  padding: 24px;
`;

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 4px;
`;

export const LogoIcon = styled.div`
  width: 36px;
  height: 36px;
  background-color: #0055aa; /* 대한항공 느낌의 진한 파랑 */
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
`;

export const Title = styled.h1`
  font-size: 22px;
  font-weight: 800;
  color: #111827; /* 진한 검정 */
  margin: 0;
  letter-spacing: -0.5px;
`;

export const SubTitle = styled.p`
  font-size: 13px;
  color: #6b7280; /* 회색 설명 텍스트 */
  margin: 0;
  padding-left: 48px; /* 아이콘 크기 + gap 만큼 들여쓰기 */
  font-weight: 400;
`;

// 메뉴 리스트 영역
export const Nav = styled.nav`
  flex: 1;
  padding: 10px 16px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 24px;

  /* 스크롤바 숨김 처리 */
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const CategorySection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const CategoryTitle = styled.h3`
  font-size: 13px;
  font-weight: 700;
  color: #9ca3af; /* 연한 회색 카테고리 타이틀 */
  margin: 0 0 8px 12px;
`;

// 메뉴 아이템 버튼
export const MenuButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 16px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-size: 15px;
  transition: all 0.2s ease;
  text-align: left;
  font-weight: ${props => props.$isActive ? '600' : '500'};

  /* 활성화 상태($isActive)에 따른 색상 처리 */
  /* 활성화: 연한 하늘색 배경 (#e0f2fe) + 진한 파랑 글씨 (#0284c7) */
  /* 비활성화: 투명 배경 + 짙은 회색 글씨 (#374151) */
  background-color: ${props => props.$isActive ? '#e0f2fe' : 'transparent'};
  color: ${props => props.$isActive ? '#0284c7' : '#374151'};

  &:hover {
    background-color: ${props => props.$isActive ? '#e0f2fe' : '#f3f4f6'};
  }

  /* 아이콘 색상 */
  svg {
    color: ${props => props.$isActive ? '#0284c7' : '#4b5563'};
    stroke-width: 2.5px; /* 아이콘을 조금 더 두껍게 */
  }
`;