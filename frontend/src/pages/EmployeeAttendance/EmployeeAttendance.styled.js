import styled from 'styled-components';

// 메인 레이아웃
export const PageContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: #f5f7fa;
`;

export const ContentArea = styled.div`
  flex: 1;
  padding: 32px;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
`;

export const Breadcrumb = styled.div`
  font-size: 13px;
  color: #6b7280;
  margin-bottom: 24px;
  
  span {
    margin: 0 8px;
  }
`;

export const PageHeader = styled.div`
  margin-bottom: 32px;
`;

export const PageTitle = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 8px;
`;

export const PageSubtitle = styled.p`
  font-size: 14px;
  color: #6b7280;
`;

// 통계 카드
export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 32px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const StatCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 12px;
`;

export const StatIconWrapper = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: ${props => props.$bgColor || '#e0f2fe'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.$iconColor || '#0284c7'};
  margin-bottom: 8px;
`;

export const StatValue = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: #1f2937;
`;

export const StatLabel = styled.div`
  font-size: 13px;
  color: #6b7280;
  font-weight: 500;
`;

// 캘린더 섹션
export const MainContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const CalendarSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

export const MonthTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: #1f2937;
`;

export const NavButtons = styled.div`
  display: flex;
  gap: 8px;
`;

export const NavButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
  background: white;
  color: #6b7280;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background: #f9fafb;
    border-color: #d1d5db;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
`;

export const DayHeader = styled.div`
  text-align: center;
  padding: 12px 0;
  font-size: 13px;
  font-weight: 600;
  color: ${props => props.$isWeekend ? '#ef4444' : '#6b7280'};
`;

export const DayCell = styled.div`
  aspect-ratio: 1;
  border: 1px solid ${props => props.$isToday ? '#2563eb' : '#e5e7eb'};
  border-radius: 8px;
  padding: 8px;
  cursor: pointer;
  background: ${props => {
    if (props.$isSelected) return '#1e40af';
    if (props.$isToday) return '#dbeafe';
    return 'white';
  }};
  color: ${props => {
    if (props.$isSelected) return 'white';
    if (props.$isOtherMonth) return '#d1d5db';
    return '#1f2937';
  }};
  position: relative;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  &:hover {
    background: ${props => props.$isSelected ? '#1e40af' : '#f9fafb'};
    border-color: ${props => props.$isSelected ? '#1e40af' : '#d1d5db'};
  }
`;

export const DayNumber = styled.div`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
`;

export const StatusDot = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${props => {
    if (props.$status === 'PRESENT' || props.$status === 'present') return '#10b981';      // 출근 - 녹색
    if (props.$status === 'LATE' || props.$status === 'late') return '#f59e0b';            // 지각 - 주황
    if (props.$status === 'EARLY_LEAVE' || props.$status === 'early_leave') return '#f59e0b';  // 조퇴 - 주황
    if (props.$status === 'ABSENT' || props.$status === 'absent') return '#ef4444';        // 결근 - 빨강
    if (props.$status === 'VACATION' || props.$status === 'vacation') return '#3b82f6';    // 휴가 - 파랑
    if (props.$status === 'HALF_DAY' || props.$status === 'half_day') return '#8b5cf6';    // 반차 - 보라
    if (props.$status === 'LEAVE_PENDING') return '#fbbf24';  // 휴가 대기 - 노랑
    if (props.$status === 'LEAVE') return '#3b82f6';          // 휴가 승인 - 파랑
    return 'transparent';
  }};
  margin-top: 2px;
`;

export const Legend = styled.div`
  display: flex;
  gap: 24px;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #e5e7eb;
  flex-wrap: wrap;
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #6b7280;
`;

export const LegendDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.$color};
`;

// 오른쪽 사이드바
export const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const SidebarCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const SidebarTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 16px;
`;

export const ScheduleItem = styled.div`
  padding: 12px;
  background: #f9fafb;
  border-radius: 8px;
  margin-bottom: 12px;
`;

export const ScheduleName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 4px;
`;

export const ScheduleDate = styled.div`
  font-size: 12px;
  color: #6b7280;
`;

export const ScheduleStatus = styled.div`
  display: inline-block;
  padding: 4px 12px;
  background: #fef3c7;
  color: #92400e;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  margin-top: 8px;
`;

export const ActionButton = styled.button`
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: none;
  background: ${props => props.$primary ? '#2563eb' : 'white'};
  color: ${props => props.$primary ? 'white' : '#2563eb'};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid ${props => props.$primary ? '#2563eb' : '#2563eb'};
  margin-bottom: 8px;

  &:hover {
    background: ${props => props.$primary ? '#1d4ed8' : '#eff6ff'};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background: ${props => props.$primary ? '#93c5fd' : '#f3f4f6'};
    border-color: ${props => props.$primary ? '#93c5fd' : '#d1d5db'};
    color: ${props => props.$primary ? '#e0e7ff' : '#9ca3af'};
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

// 로딩 & 에러
export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  font-size: 16px;
  color: #6b7280;
`;

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  gap: 16px;
`;

export const ErrorMessage = styled.div`
  font-size: 16px;
  color: #ef4444;
  text-align: center;
`;

export const RetryButton = styled.button`
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  background: #2563eb;
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #1d4ed8;
  }
`;
