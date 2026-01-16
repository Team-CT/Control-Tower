import styled from 'styled-components';

// 전체 사이드바 컨테이너 (화이트 테마)
export const Container = styled.aside`
  width: 260px;
  height: 100vh;
  background-color: #ffffff;
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
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
  background-color: var(--primary-color);
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
  color: var(--text-main);
  margin: 0;
  letter-spacing: -0.5px;
`;

export const SubTitle = styled.p`
  font-size: 13px;
  color: var(--text-sub);
  margin: 0;
  padding-left: 48px;
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

  background-color: ${props => props.$isActive ? 'var(--primary-light)' : 'transparent'};
  color: ${props => props.$isActive ? 'var(--primary-color)' : 'var(--text-main)'};

  &:hover {
    background-color: ${props => props.$isActive ? 'var(--primary-light)' : '#f3f4f6'};
    color: ${props => props.$isActive ? 'var(--primary-color)' : 'var(--primary-color)'};
  }

  svg {
    color: ${props => props.$isActive ? 'var(--primary-color)' : '#9ca3af'};
    stroke-width: 2.5px;
    transition: color 0.2s ease;
  }

  &:hover svg {
    color: var(--primary-color);
  }
`;