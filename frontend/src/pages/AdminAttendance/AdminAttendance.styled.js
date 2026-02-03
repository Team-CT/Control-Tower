import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #f9fafb;
  padding: 24px;
`;

// 로딩 상태
export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 16px;
`;

export const LoadingSpinner = styled.div`
  width: 48px;
  height: 48px;
  border: 4px solid #e5e7eb;
  border-top-color: #4f46e5;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

export const LoadingText = styled.div`
  font-size: 16px;
  color: #6b7280;
  font-weight: 500;
`;

// 에러 상태
export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 16px;
`;

export const ErrorText = styled.div`
  font-size: 16px;
  color: #dc2626;
  font-weight: 500;
`;

export const RetryButton = styled.button`
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 600;
  color: white;
  background: #4f46e5;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #4338ca;
  }
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

// ===== 휴가 승인 대기 목록 테이블 스타일 =====
export const LeaveTable = styled.div`
  width: 100%;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const LeaveTypeBadge = styled.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  background: ${props => {
    switch (props.$type) {
      case 'ANNUAL': return '#dbeafe';
      case 'SICK': return '#fee2e2';
      case 'HALF_DAY': return '#fef3c7';
      case 'SPECIAL': return '#e0e7ff';
      default: return '#f3f4f6';
    }
  }};
  color: ${props => {
    switch (props.$type) {
      case 'ANNUAL': return '#1e40af';
      case 'SICK': return '#991b1b';
      case 'HALF_DAY': return '#92400e';
      case 'SPECIAL': return '#4338ca';
      default: return '#374151';
    }
  }};
`;

export const ActionButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

export const ActionButton = styled.button`
  padding: 6px 16px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.2s;

  ${props => props.$type === 'approve' && `
    background: #10b981;
    color: white;

    &:hover {
      background: #059669;
      transform: translateY(-1px);
      box-shadow: 0 4px 6px rgba(16, 185, 129, 0.3);
    }
  `}

  ${props => props.$type === 'reject' && `
    background: #ef4444;
    color: white;

    &:hover {
      background: #dc2626;
      transform: translateY(-1px);
      box-shadow: 0 4px 6px rgba(239, 68, 68, 0.3);
    }
  `}

  &:active {
    transform: translateY(0);
  }
`;

// ===== 부서별 현황 카드 스타일 =====
export const DepartmentCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
`;

export const DepartmentCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`;

export const DepartmentCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 2px solid #f3f4f6;
`;

export const DepartmentName = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #1f2937;
`;

export const DepartmentTotal = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #6b7280;
`;

export const DepartmentCardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const DepartmentStatRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const DepartmentStatLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #4b5563;
  font-weight: 500;
`;

export const DepartmentStatValue = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #1f2937;
`;

export const StatDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.$color || '#6b7280'};
`;

// ===== 통계 카드 스타일 =====
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

// 어제 근태 리스트
export const AttendanceList = styled.div`
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

export const AttendanceCard = styled.div`
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

export const AttendanceBadge = styled.div`
  background: ${props => {
    switch (props.$status) {
      case 'PRESENT': return '#d1fae5';
      case 'LATE': return '#fef3c7';
      case 'ABSENT': return '#fee2e2';
      default: return '#e5e7eb';
    }
  }};
  color: ${props => {
    switch (props.$status) {
      case 'PRESENT': return '#059669';
      case 'LATE': return '#d97706';
      case 'ABSENT': return '#dc2626';
      default: return '#6b7280';
    }
  }};
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
`;

export const AttendanceInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const AttendanceName = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #111827;
`;

export const AttendanceDepartment = styled.div`
  font-size: 13px;
  color: #6b7280;
`;

export const AttendanceTime = styled.div`
  font-size: 14px;
  color: #374151;
  font-weight: 500;
`;

export const EmptyMessage = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #9ca3af;
  font-size: 14px;
`;
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

// 뷰 전환 버튼 (Tab A / Tab B)
export const ViewToggleContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
`;

export const ViewToggleButton = styled.button`
  flex: 1;
  padding: 16px 24px;
  font-size: 16px;
  font-weight: 600;
  color: ${props => props.$active ? '#ffffff' : '#6b7280'};
  background: ${props => props.$active ? 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)' : '#f9fafb'};
  border: 2px solid ${props => props.$active ? '#4f46e5' : '#e5e7eb'};
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${props => props.$active ? '0 4px 12px rgba(79, 70, 229, 0.3)' : 'none'};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(79, 70, 229, 0.2);
    border-color: #4f46e5;
    color: ${props => props.$active ? '#ffffff' : '#4f46e5'};
  }

  &:active {
    transform: translateY(0);
  }
`;

// 직원 카드 그리드 (Tab A)
export const EmployeeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
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

export const EmployeeCard = styled.div`
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 16px;
  transition: all 0.2s;

  &:hover {
    border-color: #4f46e5;
    box-shadow: 0 4px 12px rgba(79, 70, 229, 0.15);
    transform: translateY(-2px);
  }
`;

export const EmployeeCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

export const EmployeeName = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #111827;
`;

export const EmployeeInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const EmployeeDepartment = styled.div`
  font-size: 13px;
  color: #6b7280;
`;

export const EmployeeTime = styled.div`
  font-size: 14px;
  color: #374151;
  font-weight: 500;
`;

// 상태 배지 (동적 색상)
export const StatusBadge = styled.div`
  background: ${props => {
    switch (props.$status) {
      case 'PRESENT': return '#d1fae5';
      case 'LATE': return '#fef3c7';
      case 'ABSENT': return '#fee2e2';
      case 'EARLY_LEAVE': return '#fce7f3';
      case 'VACATION': return '#dbeafe';
      case 'LEAVE': return '#dbeafe';
      default: return '#e5e7eb';
    }
  }};
  color: ${props => {
    switch (props.$status) {
      case 'PRESENT': return '#059669';
      case 'LATE': return '#d97706';
      case 'ABSENT': return '#dc2626';
      case 'EARLY_LEAVE': return '#db2777';
      case 'VACATION': return '#2563eb';
      case 'LEAVE': return '#2563eb';
      default: return '#6b7280';
    }
  }};
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
`;

// 날짜 범위 입력 (Tab B)
export const DateRangeInput = styled.input`
  padding: 8px 12px;
  font-size: 14px;
  color: #374151;
  background: white;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #4f46e5;
  }

  &:focus {
    outline: none;
    border-color: #4f46e5;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
  }
`;

// ========== 새로운 탭 구조 스타일 ==========

// 메인 탭 컨테이너 (상단 탭 버튼)
export const MainTabContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 32px;
  border-bottom: 3px solid #e5e7eb;
`;

// 메인 탭 버튼
export const MainTab = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 20px 32px;
  font-size: 18px;
  font-weight: 700;
  color: ${props => props.$active ? '#4f46e5' : '#6b7280'};
  background: ${props => props.$active ? 'linear-gradient(135deg, #f0f4ff 0%, #e0e7ff 100%)' : 'transparent'};
  border: none;
  border-bottom: 4px solid ${props => props.$active ? '#4f46e5' : 'transparent'};
  margin-bottom: -3px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: #4f46e5;
    background: linear-gradient(135deg, #f9fafb 0%, #f0f4ff 100%);
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const TabIcon = styled.span`
  font-size: 24px;
`;

export const TabText = styled.span`
  font-size: 18px;
`;

// 탭 컨텐츠 영역
export const TabContent = styled.div`
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  min-height: 600px;
`;

// 탭 헤더
export const TabHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid #e5e7eb;
`;

export const TabTitle = styled.h2`
  font-size: 22px;
  font-weight: 700;
  color: #111827;
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0;
`;

// 새로고침 버튼
export const RefreshButton = styled.button`
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 600;
  color: #4f46e5;
  background: #f0f4ff;
  border: 2px solid #4f46e5;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #4f46e5;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(79, 70, 229, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

// 필터 컨테이너 (날짜 범위)
export const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

// 정보 배너
export const InfoBanner = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  margin-bottom: 20px;
  background: #fef3c7;
  border-left: 4px solid #f59e0b;
  border-radius: 8px;
  color: #92400e;
  font-size: 14px;
  font-weight: 500;
`;

// 결과 카운트
export const ResultCount = styled.div`
  margin-bottom: 16px;
  font-size: 15px;
  color: #374151;

  strong {
    color: #4f46e5;
    font-weight: 700;
  }
`;

// ========== 테이블 스타일 (탭 3용) ==========

export const AbnormalTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const TableHeader = styled.thead`
  background: linear-gradient(135deg, #4f46e5 0%, #6366f1 100%);
  color: white;
`;

export const TableBody = styled.tbody`
tr: nth - child(even) {
  background: #f9fafb;
}

tr:hover {
  background: #f0f4ff;
}
`;

export const TableRow = styled.tr`
border - bottom: 1px solid #e5e7eb;

  &: last - child {
  border - bottom: none;
}
`;

export const TableHeaderCell = styled.th`
padding: 16px;
text - align: left;
font - size: 14px;
font - weight: 700;
text - transform: uppercase;
letter - spacing: 0.5px;
width: ${props => props.width || 'auto'};
`;

export const TableCell = styled.td`
padding: 16px;
font - size: 14px;
color: #374151;
text - align: left;
vertical - align: middle;

  strong {
  color: #111827;
  font - weight: 600;
}
`;
