import styled from 'styled-components';

// 전체 페이지 레이아웃
export const PageLayout = styled.div`
  display: flex;
  min-height: 100%;
  width: 100%;
  background: var(--bg-main);
`;

// 메인 콘텐츠 영역
export const MainContentArea = styled.div`
  flex: 1;
  padding: 32px 48px;
  max-width: 1600px;
  margin: 0 auto;

  @media (max-width: 1440px) {
    padding: 24px 32px;
  }

  @media (max-width: 1024px) {
    margin-left: 0;
    padding: 20px 24px;
  }
`;

// ==================== 헤더 ====================

export const PageHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32px;
  gap: 24px;

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 16px;
  }
`;

export const Breadcrumb = styled.nav`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
`;

export const BreadcrumbItem = styled.span`
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 14px;
  font-weight: ${props => props.$active ? '600' : '400'};
  color: ${props => props.$active ? '#1d2838' : '#6b7280'};
  cursor: ${props => props.$active ? 'default' : 'pointer'};
  transition: color 0.2s ease;

  &:hover {
    color: ${props => props.$active ? '#1d2838' : '#0284c7'};
  }
`;

export const BreadcrumbSeparator = styled.span`
  font-size: 14px;
  color: #9ca3af;
  user-select: none;
`;

export const PageTitle = styled.h1`
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 28px;
  font-weight: 700;
  color: #1d2838;
  margin: 0 0 8px 0;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

export const PageDescription = styled.p`
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 15px;
  font-weight: 400;
  color: #6b7280;
  margin: 0;
`;

export const ActionHeader = styled.div`
  display: flex;
  gap: 12px;
`;

export const CreateButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: #ffffff;
  background: #10b981;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.25);

  &:hover {
    background: #059669;
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(16, 185, 129, 0.35);
  }

  &:active {
    transform: translateY(0);
  }
`;

// ==================== 통계 카드 ====================

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 32px;

  @media (max-width: 1280px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const StatCard = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 24px;
  background: ${props => props.$bgColor || '#ffffff'};
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
  }
`;

export const StatIcon = styled.div`
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  background: ${props => props.$color || '#6b7280'};
  color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

export const StatInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
`;

export const StatLabel = styled.div`
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: #6b7280;
`;

export const StatValue = styled.div`
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 32px;
  font-weight: 700;
  color: #1d2838;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

export const StatSubtext = styled.div`
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 12px;
  font-weight: 500;
  color: #9ca3af;
`;

// ==================== 필터 섹션 ====================

export const FilterSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const FilterTabs = styled.div`
  display: flex;
  gap: 12px;
  background: #ffffff;
  padding: 6px;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
`;

export const FilterTab = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 14px;
  font-weight: ${props => props.$active ? '600' : '500'};
  color: ${props => props.$active ? '#ffffff' : '#6b7280'};
  background: ${props => props.$active ? '#0284c7' : 'transparent'};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background: ${props => props.$active ? '#0369a1' : '#f3f4f6'};
    color: ${props => props.$active ? '#ffffff' : '#1f2937'};
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const TabIcon = styled.span`
  font-size: 16px;
`;

export const TabLabel = styled.span``;

export const SortDropdown = styled.select`
  padding: 10px 16px;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  outline: none;
  transition: all 0.2s ease;

  &:hover {
    border-color: #0284c7;
  }

  &:focus {
    border-color: #0284c7;
    box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.1);
  }
`;

// ==================== 승인 목록 ====================

export const ApprovalListSection = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 28px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const ListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid #f3f4f6;
`;

export const ListTitle = styled.h2`
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: #1d2838;
  margin: 0;
`;

export const SortButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #6b7280;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f3f4f6;
    border-color: #d1d5db;
  }
`;

export const ApprovalList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ApprovalItem = styled.div`
  display: grid;
  grid-template-columns: auto 1fr 2fr auto;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  transition: all 0.2s ease;

  &:hover {
    background: #f3f4f6;
    border-color: #0284c7;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }

  @media (max-width: 1024px) {
    grid-template-columns: auto 1fr;
    gap: 16px;
  }
`;

export const ApprovalAvatar = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: #ffffff;
  background: ${props => props.$color || '#6b7280'};
  border-radius: 50%;
`;

export const ApprovalInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ApprovalName = styled.div`
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: #1d2838;
`;

export const ApprovalDepartment = styled.div`
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: #6b7280;
`;

export const ApprovalDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  @media (max-width: 1024px) {
    grid-column: 1 / -1;
  }
`;

export const ApprovalType = styled.span`
  display: inline-block;
  width: fit-content;
  padding: 4px 12px;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 12px;
  font-weight: 700;
  color: #ffffff;
  background: ${props => {
    if (props.$type === 'annual') return '#10b981';
    if (props.$type === 'half') return '#f59e0b';
    if (props.$type === 'sick') return '#8b5cf6';
    return '#6b7280';
  }};
  border-radius: 6px;
`;

export const ApprovalDate = styled.div`
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
`;

export const ApprovalPeriod = styled.div`
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 13px;
  font-weight: 400;
  color: #6b7280;
`;

export const ApprovalActions = styled.div`
  display: flex;
  gap: 8px;

  @media (max-width: 1024px) {
    grid-column: 1 / -1;
    justify-content: flex-end;
  }

  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

export const ViewButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 8px 16px;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: #6b7280;
  background: #ffffff;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background: #f9fafb;
    border-color: #9ca3af;
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const ApproveButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 8px 16px;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: #ffffff;
  background: #10b981;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background: #059669;
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const RejectButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 8px 16px;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: #ffffff;
  background: #ef4444;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background: #dc2626;
    box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
  }

  &:active {
    transform: scale(0.98);
  }
`;