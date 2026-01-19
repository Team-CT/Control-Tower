import styled from 'styled-components';

export const MainContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #F8F9FA;
  padding: 32px 48px;

  @media (max-width: 1024px) {
    padding: 24px;
  }
`;

export const ContentWrapper = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  width: 100%;
`;

export const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32px;

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 16px;
  }
`;

export const PageTitle = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #1A1A1A;
  margin: 0 0 8px 0;
`;

export const PageSubtitle = styled.p`
  font-size: 15px;
  color: #6B7280;
  margin: 0;
`;

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background-color: #1E88E5;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1565C0;
  }

  span {
    font-size: 18px;
  }
`;

export const SearchSection = styled.div`
  background: white;
  padding: 24px;
  border-radius: 12px;
  margin-bottom: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
`;

export const SearchInputWrapper = styled.div`
  position: relative;
  margin-bottom: 20px;
  width: 100%;
`;

export const SearchIcon = styled.span`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 18px;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 14px 16px 14px 48px;
  border: 1.5px solid #E5E7EB;
  border-radius: 8px;
  font-size: 15px;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #1E88E5;
  }

  &::placeholder {
    color: #9CA3AF;
  }
`;

export const FilterGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
`;

export const FilterButton = styled.button`
  padding: 10px 20px;
  background-color: ${props => props.active ? '#1E88E5' : '#F3F4F6'};
  color: ${props => props.active ? 'white' : '#4B5563'};
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.active ? '#1565C0' : '#E5E7EB'};
  }
`;

export const FilterDivider = styled.div`
  width: 1px;
  height: 20px;
  background-color: #D1D5DB;
`;

export const EmployeeCount = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  font-size: 15px;
  color: #4B5563;

  strong {
    color: #1E88E5;
    font-weight: 700;
  }
`;

export const FilterToggle = styled.button`
  background: none;
  border: none;
  color: #1E88E5;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;

  &:hover {
    text-decoration: underline;
  }
`;

export const TableContainer = styled.table`
  width: 100%;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  border-collapse: collapse;
`;

export const TableHeader = styled.thead`
  background-color: #F9FAFB;
  border-bottom: 2px solid #E5E7EB;
`;

export const TableHeaderCell = styled.th`
  padding: 16px 20px;
  text-align: left;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  width: ${props => props.width || 'auto'};
`;

export const TableBody = styled.tbody`
  tr:not(:last-child) {
    border-bottom: 1px solid #F3F4F6;
  }
`;

export const TableRow = styled.tr`
  transition: background-color 0.2s;

  &:hover {
    background-color: #F9FAFB;
  }

  td {
    padding: 20px;
    font-size: 14px;
  }
`;

export const EmployeeInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const EmployeeAvatar = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: ${props => props.color};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 700;
  flex-shrink: 0;
`;

export const EmployeeDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const EmployeeName = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #1A1A1A;
`;

export const EmployeeId = styled.div`
  font-size: 13px;
  color: #6B7280;
`;

export const DepartmentInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const DepartmentName = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #1A1A1A;
`;

export const DepartmentRole = styled.div`
  font-size: 13px;
  color: #6B7280;
`;

export const DateText = styled.div`
  font-size: 14px;
  color: #4B5563;
`;

export const StatusBadge = styled.span`
  display: inline-block;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  background-color: ${props => {
    switch (props.type) {
      case 'normal':
        return '#D1FAE5';
      case 'warning':
        return '#FEF3C7';
      case 'alert':
        return '#FEE2E2';
      default:
        return '#F3F4F6';
    }
  }};
  color: ${props => {
    switch (props.type) {
      case 'normal':
        return '#065F46';
      case 'warning':
        return '#92400E';
      case 'alert':
        return '#991B1B';
      default:
        return '#4B5563';
    }
  }};
`;

export const IconButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid #E5E7EB;
  background: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  transition: all 0.2s;

  &:hover {
    background-color: #F3F4F6;
    border-color: #D1D5DB;
  }
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
  padding: 0 8px;
`;

export const PageInfo = styled.div`
  font-size: 14px;
  color: #6B7280;
`;

export const PageButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid ${props => props.active ? '#1E88E5' : '#E5E7EB'};
  background-color: ${props => props.active ? '#1E88E5' : 'white'};
  color: ${props => props.active ? 'white' : '#4B5563'};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.5 : 1};
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background-color: ${props => props.active ? '#1565C0' : '#F3F4F6'};
  }
`;