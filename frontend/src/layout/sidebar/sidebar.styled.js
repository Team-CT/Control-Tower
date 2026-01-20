import styled from 'styled-components';

export const Container = styled.aside`
  width: 280px;
  background-color: white;
  border-right: 1px solid #eee;
  display: flex;
  flex-direction: column;
  padding: 24px;
  flex-shrink: 0;
  transition: all 0.3s ease;
`;

export const Header = styled.div`
  margin-bottom: 40px;
  padding: 0 12px;
`;

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
`;

// [테마 적용] 로고 배경색을 선택된 항공사의 메인 컬러로 설정
export const LogoIcon = styled.div`
  width: 36px;
  height: 36px;
  background-color: ${props => props.theme.primary}; 
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white; /* 아이콘은 항상 흰색 */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: background-color 0.5s ease;
`;

export const Title = styled.h1`
  font-size: 22px;
  font-weight: 800;
  color: #1a1a1a;
  letter-spacing: -0.5px;
`;

export const SubTitle = styled.div`
  font-size: 13px;
  color: #888;
  font-weight: 500;
  margin-left: 4px;
`;

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 24px;
  overflow-y: auto;
  padding: 0 4px; /* 스크롤바 여백 */
  
  /* 스크롤바 커스텀 */
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ddd;
    border-radius: 4px;
  }
`;

export const CategorySection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const CategoryTitle = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: #a0a0a0;
  margin-bottom: 8px;
  padding-left: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

// [테마 적용] 메뉴 버튼: 활성화되거나 마우스 올렸을 때 테마 색상 적용
export const MenuButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 15px;
  font-weight: 500;
  text-align: left;
  
  /* 활성화 상태($isActive)일 때 테마 색상 적용 */
  background-color: ${props => props.$isActive ? props.theme.hover : 'transparent'};
  color: ${props => props.$isActive ? props.theme.primary : '#555'};

  /* 마우스 호버 시 테마 색상 적용 */
  &:hover {
    background-color: ${props => props.theme.hover};
    color: ${props => props.theme.primary};
    transform: translateX(4px);
  }

  /* 아이콘 색상 제어 */
  svg {
    color: ${props => props.$isActive ? props.theme.primary : '#999'};
    transition: color 0.2s;
  }

  &:hover svg {
    color: ${props => props.theme.primary};
  }

  span {
    flex: 1;
  }
`;