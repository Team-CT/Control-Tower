import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #f9fafb;
  padding: 24px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #111827;
  margin: 0;
`;

export const UserInfo = styled.div`
  font-size: 14px;
  color: #6b7280;
`;

export const TabContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  border-bottom: 2px solid #e5e7eb;
`;

export const Tab = styled.button`
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.$active ? '#4f46e5' : '#6b7280'};
  background: transparent;
  border: none;
  border-bottom: 2px solid ${props => props.$active ? '#4f46e5' : 'transparent'};
  margin-bottom: -2px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: #4f46e5;
  }
`;

export const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

// 상단 통계 카드
export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const StatCard = styled.div`
  background: ${props => props.$color || '#ffffff'};
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

export const StatIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.$color || '#4f46e5'};
`;

export const StatInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const StatLabel = styled.div`
  font-size: 14px;
  color: #6b7280;
  font-weight: 500;
`;

export const StatValue = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: ${props => props.$color || '#111827'};
`;

// 메인 컨텐츠 그리드 (좌측: 휴가 목록, 우측: 부서별 현황)
export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const LeftPanel = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const RightPanel = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 2px solid #e5e7eb;
`;

export const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: #111827;
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
`;

export const SectionIcon = styled.span`
  font-size: 20px;
`;

export const FilterButtons = styled.div`
  display: flex;
  gap: 8px;
`;

export const FilterButton = styled.button`
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 500;
  color: ${props => props.$active ? '#4f46e5' : '#6b7280'};
  background: ${props => props.$active ? '#e0e7ff' : '#f3f4f6'};
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #e0e7ff;
    color: #4f46e5;
  }
`;

// 휴가 승인 대기 목록
export const LeaveRequestList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-height: 600px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f3f4f6;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 3px;

    &:hover {
      background: #9ca3af;
    }
  }
`;

export const LeaveRequestCard = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  gap: 16px;
  align-items: flex-start;
  transition: all 0.2s;

  &:hover {
    border-color: #4f46e5;
    box-shadow: 0 2px 4px rgba(79, 70, 229, 0.1);
  }
`;

export const RequestBadge = styled.div`
  background: #fef3c7;
  color: #d97706;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
`;

export const RequestInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const RequestName = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #111827;
`;

export const RequestDepartment = styled.div`
  font-size: 13px;
  color: #6b7280;
`;

export const RequestPeriod = styled.div`
  font-size: 14px;
  color: #374151;
  font-weight: 500;
`;

export const RequestReason = styled.div`
  font-size: 13px;
  color: #6b7280;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;

export const ApproveButton = styled.button`
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 600;
  color: white;
  background: #059669;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #047857;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const RejectButton = styled.button`
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 600;
  color: white;
  background: #dc2626;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #b91c1c;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

// 부서별 현황
export const DepartmentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const DepartmentCard = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
  transition: all 0.2s;

  &:hover {
    border-color: #4f46e5;
    box-shadow: 0 2px 4px rgba(79, 70, 229, 0.1);
  }
`;

export const DepartmentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

export const DepartmentName = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #111827;
`;

export const DepartmentTotal = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #4f46e5;
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 12px;
`;

export const ProgressFill = styled.div`
  height: 100%;
  width: ${props => props.$percentage || 0}%;
  background: linear-gradient(90deg, #059669 0%, #10b981 100%);
  transition: width 0.3s ease;
`;

export const DepartmentStats = styled.div`
  display: flex;
  gap: 12px;
  font-size: 13px;
`;

export const DepartmentStat = styled.div`
  color: ${props => props.$color || '#6b7280'};
  font-weight: 500;
`;