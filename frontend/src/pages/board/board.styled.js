import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: var(--bg-main);
  width: 100%;
`;

export const MainContent = styled.main`
  width: 100%;
  flex: 1;
  min-height: 100vh;
`;

export const ContentWrapper = styled.div`
  padding: 48px;
  max-width: 1600px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: 1440px) {
    padding: 32px;
  }
`;

export const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

export const PageTitle = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #222;
  display: flex;
  align-items: center;
  gap: 12px;
`;

// [테마 적용] 메인 버튼: 배경 primary, 호버 시 secondary 사용
export const CreateButton = styled.button`
  background: ${props => props.theme.primary};
  color: white;
  border: none;
  padding: 12px 28px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  /* 그림자 색상은 테마 색상과 충돌하지 않도록 중립적인 색으로 변경 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

  &:hover {
    background: ${props => props.theme.secondary};
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }
`;

export const TabSection = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 32px;
  border-bottom: 2px solid #E5E8EB;
  padding-bottom: 0;
`;

// [테마 적용] 탭: 활성 상태는 primary, 비활성 탭 호버 시 secondary 사용
export const Tab = styled.button`
  background: none;
  border: none;
  padding: 14px 28px;
  font-size: 15px;
  font-weight: 600;
  color: ${props => props.active ? props.theme.primary : '#666'};
  cursor: pointer;
  position: relative;
  transition: all 0.2s;
  border-bottom: 3px solid ${props => props.active ? props.theme.primary : 'transparent'};
  margin-bottom: -2px;

  &:hover {
    color: ${props => props.active ? props.theme.primary : props.theme.secondary};
  }
`;

export const SearchSection = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 32px;
  align-items: center;
`;

export const SearchForm = styled.form`
  flex: 1;
  display: flex;
  max-width: 600px;
`;

// [테마 적용] 검색창: 포커스 시 테두리 primary
export const SearchInput = styled.input`
  flex: 1;
  padding: 14px 20px;
  border: 2px solid #E5E8EB;
  border-right: none;
  border-radius: 8px 0 0 8px;
  font-size: 15px;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: ${props => props.theme.primary};
  }

  &::placeholder {
    color: #999;
  }
`;

// [테마 적용] 검색 버튼: 배경 primary, 호버 시 secondary
export const SearchButton = styled.button`
  background: ${props => props.theme.primary};
  color: white;
  border: none;
  padding: 14px 24px;
  border-radius: 0 8px 8px 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;

  &:hover {
    background: ${props => props.theme.secondary};
  }
`;

// [테마 적용] 필터 버튼: 활성 상태 primary, 호버 시 secondary (테두리/글자)
export const FilterButton = styled.button`
  padding: 12px 24px;
  border: 2px solid ${props => props.active ? props.theme.primary : '#E5E8EB'};
  background: ${props => props.active ? props.theme.primary : 'white'};
  color: ${props => props.active ? 'white' : '#666'};
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: ${props => props.active ? props.theme.primary : props.theme.secondary};
    color: ${props => props.active ? 'white' : props.theme.secondary};
  }
`;

export const BoardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 48px;
`;

export const BoardItem = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px 28px;
  display: flex;
  gap: 20px;
  align-items: flex-start;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`;

// [테마 적용] 카테고리 뱃지: 기본 배경을 테마의 hover 색상으로, 글자를 primary로 설정
export const CategoryBadge = styled.div`
  background: ${props => props.bgColor || props.theme.hover};
  color: ${props => {
    if (props.bgColor === '#FFE5E5') return '#D32F2F'; // 긴급/에러 등은 고정색 유지
    if (props.bgColor === '#FFF9E5') return '#F57C00';
    return props.theme.primary; // 기본값은 테마 메인 컬러
  }};
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
  min-width: 70px;
  text-align: center;
`;

export const BoardContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const BoardTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #222;
  margin: 0;
  line-height: 1.5;
`;

export const BoardMetaRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const BoardMeta = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

export const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #666;
`;

export const MetaIcon = styled.span`
  font-size: 14px;
`;

export const BoardStats = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

export const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #666;
  font-weight: 500;
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 48px;
`;

// [테마 적용] 페이지네이션 버튼: 호버 시 primary 사용
export const PaginationButton = styled.button`
  width: 40px;
  height: 40px;
  border: 1px solid #E5E8EB;
  background: white;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  color: #666;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    border-color: ${props => props.theme.primary};
    color: ${props => props.theme.primary};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

// [테마 적용] 페이지 번호: 활성 상태 primary 사용
export const PageNumber = styled.button`
  width: 40px;
  height: 40px;
  border: 1px solid ${props => props.active ? props.theme.primary : '#E5E8EB'};
  background: ${props => props.active ? props.theme.primary : 'white'};
  color: ${props => props.active ? 'white' : '#666'};
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: ${props => props.active ? '600' : '500'};
  transition: all 0.2s;

  &:hover {
    border-color: ${props => props.theme.primary};
    color: ${props => props.active ? 'white' : props.theme.primary};
  }
`;