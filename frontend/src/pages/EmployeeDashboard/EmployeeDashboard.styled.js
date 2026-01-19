import styled from 'styled-components';

// 전체 컨테이너
export const DashboardContainer = styled.div`
  display: flex;
  min-height: 100%;
  background: var(--bg-main);
  width: 100%;
`;

// 메인 컨텐츠 영역
export const MainContent = styled.main`
  flex: 1;
  width: 100%;
  padding: 32px 40px;
  
  @media (max-width: 1024px) {
    padding: 24px;
  }
`;

// ============ 출퇴근 배너 ============
export const AttendanceBanner = styled.div`
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  border-radius: 16px;
  padding: 32px 40px;
  margin-bottom: 32px;
  box-shadow: 0 4px 20px rgba(0, 85, 170, 0.15);
`;

export const BannerContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const BannerInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const BannerLabel = styled.span`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
`;

export const BannerTitle = styled.h2`
  font-size: 24px;
  color: white;
  font-weight: 700;
  margin: 0;
`;

export const BannerTime = styled.div`
  font-size: 48px;
  font-weight: 700;
  color: white;
  letter-spacing: -1px;
`;

// ============ 통계 카드 ============
export const StatisticsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-bottom: 32px;

  @media (max-width: 1400px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const StatCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  border-left: 4px solid ${props => props.color || 'var(--primary-color)'};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;

  &:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
    transform: translateY(-4px);
  }
`;

export const StatHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`;

export const StatIcon = styled.span`
  font-size: 32px;
`;

export const StatLabel = styled.span`
  font-size: 14px;
  color: #7f8c8d;
  font-weight: 500;
`;

export const StatValue = styled.div`
  font-size: 36px;
  font-weight: 700;
  color: #1e2742;
  margin-bottom: 8px;
  line-height: 1;
`;

export const StatUnit = styled.span`
  font-size: 16px;
  color: #95a5a6;
  font-weight: 500;
  margin-left: 4px;
`;

export const StatSubInfo = styled.div`
  font-size: 13px;
  color: ${props => props.$positive ? '#27ae60' : '#7f8c8d'};
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 4px;

  &::before {
    content: '${props => props.$positive ? '↑' : '•'}';
    font-size: 14px;
  }
`;

// ============ 메인 그리드 (일정 + 알림) ============
export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 24px;
  margin-bottom: 32px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

// ============ 일정 섹션 ============
export const ScheduleSection = styled.section`
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

export const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #1e2742;
  margin: 0;
`;

export const SectionAction = styled.button`
  background: none;
  border: none;
  color: var(--primary-color);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 8px;

  &:hover {
    background: var(--primary-light);
  }
`;

export const ScheduleList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ScheduleItem = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
  border-radius: 12px;
  background: #f8f9fa;
  border: 1px solid #e1e8ed;
  transition: all 0.2s;

  &:hover {
    border-color: var(--primary-color);
    background: var(--primary-light);
  }
`;

export const ScheduleTime = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #1e2742;
  min-width: 60px;
`;

export const ScheduleContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const ScheduleTitle = styled.h4`
  font-size: 16px;
  font-weight: 600;
  color: #1e2742;
  margin: 0;
`;

export const ScheduleSubtitle = styled.p`
  font-size: 14px;
  color: #7f8c8d;
  margin: 0;
`;

export const ScheduleStatus = styled.span`
  padding: 6px 16px;
  border-radius: 20px;
  background: ${props => props.color || '#95a5a6'};
  color: white;
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
`;

// ============ 우측 패널 (건강 + 알림) ============
export const RightPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const HealthSection = styled.section`
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
`;

export const HealthScore = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  margin: 24px 0;
`;

export const ScoreValue = styled.div`
  font-size: 56px;
  font-weight: 700;
  color: #1e2742;
  line-height: 1;
`;

export const ScoreGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  flex: 1;
`;

export const ScoreItem = styled.div`
  text-align: center;
`;

export const ScoreGrade = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 12px;
  background: ${props => {
    if (props.grade === 'A') return '#27ae60';
    if (props.grade === 'B+') return '#f39c12';
    return '#95a5a6';
  }};
  color: white;
  font-size: 20px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 8px;
`;

export const ScoreLabel = styled.span`
  font-size: 13px;
  color: #7f8c8d;
  font-weight: 500;
`;

export const HealthActionButton = styled.button`
  width: 100%;
  padding: 14px;
  background: #f8f9fa;
  border: 1px solid #e1e8ed;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  color: #1e2742;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #4a90e2;
    color: white;
    border-color: #4a90e2;
  }
`;

// ============ 알림 섹션 ============
export const NotificationSection = styled.section`
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
`;

export const NotificationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const NotificationItem = styled.div`
  display: flex;
  gap: 16px;
  padding: 16px;
  border-radius: 12px;
  background: #f8f9fa;
  border: 1px solid #e1e8ed;
  transition: all 0.2s;

  &:hover {
    background: #f0f7ff;
    border-color: #4a90e2;
  }
`;

export const NotificationIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: ${props => props.color || '#4a90e2'};
  color: white;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const NotificationContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const NotificationTitle = styled.h4`
  font-size: 15px;
  font-weight: 600;
  color: #1e2742;
  margin: 0;
`;

export const NotificationMessage = styled.p`
  font-size: 14px;
  color: #7f8c8d;
  margin: 0;
`;

export const NotificationTime = styled.span`
  font-size: 12px;
  color: #95a5a6;
`;

// ============ 성과 섹션 ============
export const PerformanceSection = styled.section`
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
`;

export const PerformanceButton = styled.button`
  padding: 10px 20px;
  background: #4a90e2;
  border: none;
  border-radius: 10px;
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #357abd;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(74, 144, 226, 0.3);
  }
`;

export const PerformanceChart = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-top: 24px;
`;

export const ChartBar = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr 120px;
  align-items: center;
  gap: 24px;
`;

export const ChartLabel = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: #1e2742;
`;

export const ChartProgress = styled.div`
  height: 12px;
  background: #e1e8ed;
  border-radius: 6px;
  overflow: hidden;
  position: relative;
`;

export const ChartFill = styled.div`
  height: 100%;
  width: ${props => props.width}%;
  background: ${props => props.color || '#4a90e2'};
  border-radius: 6px;
  transition: width 0.6s ease;
`;

export const ChartValue = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #1e2742;
  text-align: right;
`;

export const ChartTotal = styled.span`
  font-size: 14px;
  color: #95a5a6;
  font-weight: 500;
`;