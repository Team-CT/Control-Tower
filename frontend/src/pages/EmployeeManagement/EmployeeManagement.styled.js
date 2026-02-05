import styled from 'styled-components';

export const PageContainer = styled.div`
  width: 100%;
  min-height: 100%;
  background-color: var(--bg-main);
`;

export const ContentWrapper = styled.div`
  padding: 40px;
  max-width: 1600px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    padding: 24px;
  }
`;

export const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: baseline;
  gap: 12px;
`;

export const PageTitle = styled.h1`
  font-size: 26px;
  font-weight: 700;
  color: #1e2742;
  margin: 0;
`;

export const EmployeeCount = styled.span`
  color: #666;
  font-size: 15px;
  font-weight: 500;
`;

export const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background-color: #4A90E2;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #357ABD;
    transform: translateY(-2px);
  }
`;

export const FilterSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  gap: 20px;

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const SearchForm = styled.form`
  display: flex;
  align-items: center;
  background: white;
  border: 1px solid #e1e8ed;
  border-radius: 8px;
  padding: 10px 16px;
  width: 300px;
  gap: 10px;

  &:focus-within {
    border-color: #4A90E2;
  }
`;

export const SearchInput = styled.input`
  border: none;
  outline: none;
  font-size: 14px;
  width: 100%;
  &::placeholder {
    color: #999;
  }
`;

export const FilterGroup = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

export const FilterButton = styled.button`
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid ${props => props.$active ? '#4A90E2' : '#e1e8ed'};
  background: ${props => props.$active ? '#4A90E2' : 'white'};
  color: ${props => props.$active ? 'white' : '#666'};
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #4A90E2;
    color: ${props => props.$active ? 'white' : '#4A90E2'};
  }
`;

export const TableContainer = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  overflow: hidden;
  margin-bottom: 32px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const Th = styled.th`
  text-align: left;
  padding: 16px 24px;
  background: #f8f9fa;
  color: #666;
  font-size: 13px;
  font-weight: 600;
  border-bottom: 1px solid #e1e8ed;
  white-space: nowrap;
`;

export const Tr = styled.tr`
  border-bottom: 1px solid #f0f0f0;
  transition: background 0.2s;

  &:hover {
    background: #f8faff;
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

export const Td = styled.td`
  padding: 16px 24px;
  font-size: 14px;
  color: #333;
  vertical-align: middle;
`;

export const ProfileImage = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${props => props.color || '#ddd'};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
`;

export const NameInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Name = styled.span`
  font-weight: 600;
  color: #1e2742;
`;

export const Email = styled.span`
  font-size: 12px;
  color: #888;
`;

export const DepartmentBadge = styled.span`
  background: #f0f7ff;
  color: #4A90E2;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
`;

export const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: #666;
  font-size: 13px;
`;

export const StatusBadge = styled.span`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  
  ${props => {
    switch (props.$status) {
      case '재직':
        return 'background: #e6fcf5; color: #20c997;';
      case '휴직':
        return 'background: #fff9db; color: #fcc419;';
      case '퇴직':
        return 'background: #fff5f5; color: #ff6b6b;';
      default:
        return 'background: #f1f3f5; color: #868e96;';
    }
  }}
`;

export const MoreButton = styled.button`
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;

  &:hover {
    background: #f1f3f5;
    color: #333;
  }
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

export const PaginationButton = styled.button`
  width: 36px;
  height: 36px;
  border: 1px solid #e1e8ed;
  background: white;
  border-radius: 6px;
  cursor: pointer;
  color: #666;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  &:hover:not(:disabled) {
    border-color: #4A90E2;
    color: #4A90E2;
  }
`;

export const PageNumber = styled.button`
  width: 36px;
  height: 36px;
  border: 1px solid ${props => props.$active ? '#4A90E2' : '#e1e8ed'};
  background: ${props => props.$active ? '#4A90E2' : 'white'};
  color: ${props => props.$active ? 'white' : '#666'};
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    border-color: #4A90E2;
    color: ${props => props.$active ? 'white' : '#4A90E2'};
  }
`;