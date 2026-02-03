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

export const CreateButton = styled.button`
  background: #4A90E2;
  color: white;
  border: none;
  padding: 12px 28px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 12px rgba(74, 144, 226, 0.3);

  &:hover {
    background: #357ABD;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(74, 144, 226, 0.4);
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
    border-color: #4A90E2;
  }

  &::placeholder {
    color: #999;
  }
`;

export const SearchButton = styled.button`
  background: #4A90E2;
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
    background: #357ABD;
  }
`;

export const FilterButton = styled.button`
  padding: 12px 24px;
  border: 2px solid ${props => props.active ? '#4A90E2' : '#E5E8EB'};
  background: ${props => props.active ? '#4A90E2' : 'white'};
  color: ${props => props.active ? 'white' : '#666'};
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #4A90E2;
    color: ${props => props.active ? 'white' : '#4A90E2'};
  }
`;

export const QnaList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 48px;
`;

export const QnaItem = styled.div`
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

export const CategoryBadge = styled.div`
  display: flex;           /* 수평 정렬 */
  align-items: center;     /* 세로 중앙 정렬 */
  justify-content: center;
  background: ${props => props.$bgColor || '#E5F3FF'};
  color: ${props => props.$textColor || '#1976D2'};
  padding: 6px 12px;       /* 아이콘이 들어갔으므로 여백 살짝 조정 */
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
  min-width: 90px;         /* 아이콘 때문에 가로가 넓어지므로 살짝 조정 */
  text-align: center;
  gap: 4px;                /* 아이콘과 글자 사이 간격 */
`;

export const QnaContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const QnaTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #222;
  margin: 0;
  line-height: 1.5;
`;

export const QnaMetaRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const QnaMeta = styled.div`
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

export const QnaStats = styled.div`
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
    border-color: #4A90E2;
    color: #4A90E2;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export const PageNumber = styled.button`
  width: 40px;
  height: 40px;
  border: 1px solid ${props => props.$active ? '#4A90E2' : '#E5E8EB'};
  background: ${props => props.$active ? '#4A90E2' : 'white'};
  color: ${props => props.$active ? 'white' : '#666'};
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: ${props => props.active ? '600' : '500'};
  transition: all 0.2s;

  &:hover {
    border-color: #4A90E2;
    color: ${props => props.$active ? 'white' : '#4A90E2'};
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex; align-items: center; justify-content: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  background: white; width: 500px; padding: 24px;
  border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.2);
`;

export const ModalHeader = styled.div`
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 20px;
  h3 { margin: 0; font-size: 20px; }
  button { background: none; border: none; font-size: 24px; cursor: pointer; }
`;

export const ModalBody = styled.form`
  display: flex; flex-direction: column; gap: 16px;
`;

export const FormGroup = styled.div`
  display: flex; flex-direction: column; gap: 8px;
  label { font-weight: 600; font-size: 14px; }
  input, textarea {
    padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 14px;
    &:focus { outline: none; border-color: #3a774c; }
  }
`;

export const ModalFooter = styled.div`
  display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px;
`;

export const CancelButton = styled.button`
  padding: 10px 20px; background: #eee; border: none; border-radius: 6px; cursor: pointer;
`;

export const SubmitButton = styled.button`
  padding: 10px 20px; background: #3a774c; color: white; border: none; border-radius: 6px; cursor: pointer;
  &:hover { background: #2d5a3a; }
`;