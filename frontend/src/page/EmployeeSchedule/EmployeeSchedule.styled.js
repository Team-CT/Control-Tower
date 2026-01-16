import styled from 'styled-components';

// 전체 페이지 레이아웃 (사이드바 260px 제외한 영역)
export const PageLayout = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(
    0deg,
    rgba(240, 247, 255, 1) 0%,
    rgba(240, 247, 255, 1) 100%
  );
`;

// 메인 콘텐츠 영역 (사이드바 우측)
export const MainContentArea = styled.main`
  flex: 1;
  margin-left: 260px;
  padding: 32px 48px;
  max-width: calc(1920px - 260px);

  @media (max-width: 1440px) {
    padding: 24px 32px;
  }

  @media (max-width: 1024px) {
    margin-left: 0;
    padding: 20px 24px;
  }
`;

// ==================== 헤더 영역 ====================

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
  margin: 0;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const SearchButton = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 18px;

  &:hover {
    background: #f9fafb;
    border-color: #0284c7;
  }
`;

export const NotificationButton = styled.button`
  position: relative;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 18px;

  &:hover {
    background: #f9fafb;
    border-color: #0284c7;
  }
`;

export const NotificationBadge = styled.span`
  position: absolute;
  top: -4px;
  right: -4px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ef4444;
  color: #ffffff;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 11px;
  font-weight: 600;
  border-radius: 50%;
  border: 2px solid #f0f7ff;
`;

export const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 16px 8px 8px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f9fafb;
    border-color: #0284c7;
  }
`;

export const UserAvatar = styled.div`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0284c7;
  color: #ffffff;
  border-radius: 50%;
  font-size: 18px;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const UserName = styled.span`
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #1d2838;
  line-height: 1.2;
`;

export const UserDepartment = styled.span`
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 12px;
  font-weight: 400;
  color: #6b7280;
  line-height: 1.2;
`;

// ==================== 통계 카드 ====================

export const StatsCardGrid = styled.div`
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
  flex-direction: column;
  gap: 12px;
  padding: 24px;
  background: #ffffff;
  border-left: 4px solid ${props => props.$color || '#e5e7eb'};
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
  }
`;

export const StatLabel = styled.div`
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #6b7280;
`;

export const StatValue = styled.span`
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 36px;
  font-weight: 700;
  color: #1d2838;
  margin-right: 8px;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

export const StatUnit = styled.span`
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 18px;
  font-weight: 500;
  color: #6b7280;
`;

// ==================== 컨트롤 패널 ====================

export const ControlPanel = styled.div`
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

export const MonthNavigator = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 8px 16px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
`;

export const NavButton = styled.button`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f3f4f6;
  border: none;
  border-radius: 6px;
  font-size: 18px;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #0284c7;
    color: #ffffff;
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const CurrentMonth = styled.span`
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: #1d2838;
  min-width: 120px;
  text-align: center;
`;

export const RefreshButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #0284c7;
  background: #ffffff;
  border: 1px solid #0284c7;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #0284c7;
    color: #ffffff;
  }
`;

// ==================== 필터 탭 ====================

export const FilterTabs = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  border-bottom: 2px solid #e5e7eb;
  padding-bottom: 2px;

  @media (max-width: 768px) {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
`;

export const FilterTab = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 15px;
  font-weight: ${props => props.$active ? '600' : '500'};
  color: ${props => props.$active ? '#0284c7' : '#6b7280'};
  background: ${props => props.$active ? '#eff6ff' : 'transparent'};
  border: none;
  border-bottom: 2px solid ${props => props.$active ? '#0284c7' : 'transparent'};
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  position: relative;
  bottom: -2px;

  &:hover {
    color: #0284c7;
    background: #f0f9ff;
  }
`;

export const TabIcon = styled.span`
  font-size: 16px;
`;

export const TabLabel = styled.span``;

export const TabBadge = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: ${props => props.$active ? '#0369a1' : '#9ca3af'};
`;

// ==================== 스케줄 테이블 ====================

export const ScheduleTableWrapper = styled.div`
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

export const ScheduleTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHeader = styled.thead`
  background: #f9fafb;
  border-bottom: 2px solid #e5e7eb;
`;

export const TableHeaderCell = styled.th`
  padding: 16px 20px;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  text-align: left;
  white-space: nowrap;

  &:first-child {
    padding-left: 28px;
  }

  &:last-child {
    text-align: center;
  }
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr`
  border-bottom: 1px solid #f3f4f6;
  transition: background 0.2s ease;

  &:hover {
    background: #f9fafb;
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const TableCell = styled.td`
  padding: 16px 20px;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 14px;
  color: #1f2937;
  vertical-align: middle;

  &:first-child {
    padding-left: 28px;
  }

  &:last-child {
    text-align: center;
  }
`;

export const FlightNumber = styled.span`
  font-weight: 600;
  color: #1d2838;
`;

export const RouteCode = styled.span`
  font-weight: 600;
  color: #374151;
`;

export const RouteArrow = styled.span`
  margin: 0 8px;
  color: #9ca3af;
`;

export const FlightTime = styled.span`
  font-weight: 500;
`;

export const Duration = styled.span`
  margin-right: 8px;
  font-weight: 500;
`;

export const StatusBadge = styled.span`
  display: inline-block;
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 500;
  color: ${props => props.$type === '완결' ? '#047857' : '#0369a1'};
  background: ${props => props.$type === '완결' ? '#d1fae5' : '#dbeafe'};
  border-radius: 6px;
`;

export const PassengerCount = styled.span`
  font-weight: 500;
  color: #374151;
`;

export const CrewSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const CrewMember = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

export const CrewRole = styled.span`
  display: inline-block;
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 600;
  color: #ffffff;
  background: #0284c7;
  border-radius: 6px;
`;

export const CrewName = styled.span`
  font-weight: 600;
  color: #1d2838;
`;

export const CrewBadge = styled.span`
  padding: 4px 8px;
  font-size: 12px;
  font-weight: 500;
  color: #6b7280;
  background: #f3f4f6;
  border-radius: 4px;
`;

export const ActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: #0284c7;
  background: #ffffff;
  border: 1px solid #0284c7;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #0284c7;
    color: #ffffff;
  }

  &:active {
    transform: scale(0.98);
  }
`;