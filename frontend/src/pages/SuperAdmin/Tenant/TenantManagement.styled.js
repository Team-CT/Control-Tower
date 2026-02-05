import styled from 'styled-components';

export const MainContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #f5f7fa;
  padding: 32px;
  box-sizing: border-box;
  overflow-x: hidden;

  @media (max-width: 1024px) {
    padding: 20px;
  }

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

export const ContentWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
`;

export const PageHeader = styled.div`
  margin-bottom: 32px;
`;

export const PageTitle = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #1a1d1f;
  margin: 0 0 8px 0;
`;

export const PageDescription = styled.p`
  font-size: 15px;
  color: #6f767e;
  margin: 0;
`;

export const ControlBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const SearchInputWrapper = styled.div`
  position: relative;
  flex: 1;
  max-width: 500px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export const SearchIcon = styled.span`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 18px;
  color: #9a9fa5;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 14px 16px 14px 48px;
  font-size: 15px;
  border: 1px solid #e4e7eb;
  border-radius: 8px;
  background-color: #ffffff;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #4c6fff;
    box-shadow: 0 0 0 3px rgba(76, 111, 255, 0.1);
  }

  &::placeholder {
    color: #9a9fa5;
  }
`;

export const ViewToggle = styled.div`
  display: flex;
  gap: 4px;
  background-color: #ffffff;
  border: 1px solid #e4e7eb;
  border-radius: 8px;
  padding: 4px;
`;

export const ViewButton = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  background-color: ${props => props.$active ? '#4c6fff' : 'transparent'};
  color: ${props => props.$active ? '#ffffff' : '#6f767e'};
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.$active ? '#3651e0' : '#f1f3f5'};
  }
`;

// Grid View
export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const TenantCard = styled.div`
  position: relative;
  background-color: #ffffff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: all 0.2s;
  box-sizing: border-box;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`;

export const TenantIcon = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e8edff;
  border-radius: 12px;
  font-size: 24px;
`;

export const TenantName = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #1a1d1f;
  margin: 0;
`;

export const CardBody = styled.div`
  margin-bottom: 16px;
`;

export const TenantId = styled.div`
  font-size: 13px;
  color: #6f767e;
  margin-bottom: 8px;
`;

export const PlanBadge = styled.span`
  display: inline-block;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 12px;
  background-color: ${props => {
    if (props.plan === 'Enterprise') return '#f3e8ff';
    if (props.plan === 'Professional') return '#dbeafe';
    if (props.plan === 'Basic') return '#f1f3f5';
    return '#f1f3f5';
  }};
  color: ${props => {
    if (props.plan === 'Enterprise') return '#7c3aed';
    if (props.plan === 'Professional') return '#2563eb';
    if (props.plan === 'Basic') return '#6f767e';
    return '#6f767e';
  }};
`;

export const EmployeeCount = styled.div`
  font-size: 14px;
  color: #33373d;
`;

export const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding-top: 16px;
  border-top: 1px solid #f1f3f5;
`;

export const StatusBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  background-color: ${props => {
    if (props.$status === 'active') return '#d4f4dd';
    if (props.$status === 'payment-pending') return '#fff3cd';
    if (props.$status === 'inactive') return '#ffe4e6';
    return '#f1f3f5';
  }};
  color: ${props => {
    if (props.$status === 'active') return '#0f7a35';
    if (props.$status === 'payment-pending') return '#856404';
    if (props.$status === 'inactive') return '#dc2626';
    return '#6f767e';
  }};
`;

export const StatusIcon = styled.span`
  font-size: 14px;
`;

export const ViewDetailButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
  background-color: #4c6fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #3651e0;
  }
`;

export const CardActions = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
`;

export const ActionButton = styled.button`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  border-radius: 6px;
  font-size: 20px;
  color: #6f767e;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #f1f3f5;
  }
`;

// Table View
export const TableContainer = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  overflow-x: auto;
  box-sizing: border-box;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHead = styled.thead`
  background-color: #f8f9fa;
  border-bottom: 1px solid #e4e7eb;
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr`
  &:not(:last-child) {
    border-bottom: 1px solid #f1f3f5;
  }

  &:hover {
    background-color: #f8f9fa;
  }
`;

export const TableHeader = styled.th`
  padding: 16px 20px;
  text-align: left;
  font-size: 14px;
  font-weight: 600;
  color: #1a1d1f;
  white-space: nowrap;
`;

export const TableCell = styled.td`
  padding: 18px 20px;
  font-size: 14px;
  color: #33373d;
  vertical-align: middle;
`;

export const TenantInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const TenantIconSmall = styled.div`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e8edff;
  border-radius: 8px;
  font-size: 18px;
`;

export const TenantNameText = styled.span`
  font-weight: 600;
  color: #1a1d1f;
`;

export const ViewDetailButtonSmall = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  color: #4c6fff;
  background-color: transparent;
  border: 1px solid #4c6fff;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #4c6fff;
    color: #ffffff;
  }
`;