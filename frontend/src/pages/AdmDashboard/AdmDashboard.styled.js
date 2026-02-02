import styled from 'styled-components';

export const MainContainer = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 32px 40px;
  background: #F8F9FA;
  min-height: 100vh;

  @media (max-width: 1024px) {
    padding: 24px 20px;
  }
`;

/* ===== 헤더 ===== */
export const DashboardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 28px 40px;
  background: linear-gradient(135deg, #4A90E2 0%, #357ABD 100%);
  border-radius: 16px;
  margin-bottom: 32px;
  box-shadow: 0 4px 20px rgba(74, 144, 226, 0.15);

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    padding: 24px;
  }
`;

export const GreetingSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const GreetingIcon = styled.div`
  font-size: 40px;
  animation: wave 1.5s ease-in-out infinite;

  @keyframes wave {
    0%, 100% { transform: rotate(0deg); }
    25% { transform: rotate(20deg); }
    75% { transform: rotate(-20deg); }
  }
`;

export const GreetingText = styled.div`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  margin-bottom: 4px;
`;

export const DateDisplay = styled.div`
  font-size: 24px;
  color: #FFFFFF;
  font-weight: 700;
  letter-spacing: -0.5px;
`;

export const CurrentTime = styled.div`
  font-size: 40px;
  font-weight: 800;
  color: #FFFFFF;
  font-family: 'Segoe UI', system-ui, sans-serif;
  letter-spacing: -2px;

  @media (max-width: 768px) {
    font-size: 40px;
  }
`;

/* ===== 통계 카드 ===== */
export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-bottom: 32px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const StatCard = styled.div`
  background: #FFFFFF;
  border-radius: 16px;
  padding: 28px 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  border-left: 4px solid ${props => props.color || '#4A90E2'};

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }
`;

export const StatIcon = styled.div`
  width: 48px;
  height: 48px;
  background: ${props => props.color || '#4A90E2'}15;
  color: ${props => props.color || '#4A90E2'};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin-bottom: 16px;
`;

export const StatLabel = styled.div`
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 12px;
  font-weight: 500;
`;

export const StatValue = styled.div`
  font-size: 36px;
  font-weight: 800;
  color: #111827;
  margin-bottom: 8px;
  display: flex;
  align-items: baseline;
  gap: 6px;
`;

export const StatUnit = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: #6B7280;
`;

export const StatTrend = styled.div`
  font-size: 13px;
  color: #18ad7c;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 4px;

  &::before {
    content: '';
    color: #18ad7c;
  }
`;

/* ===== 콘텐츠 그리드 ===== */
export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  margin-bottom: 32px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

/* ===== 일정 섹션 ===== */
export const ScheduleSection = styled.div`
  background: #FFFFFF;
  border-radius: 16px;
  padding: 28px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

export const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: #111827;
  display: flex;
  align-items: center;
  gap: 10px;

  svg {
    color: #4A90E2;
  }
`;

export const FilterButton = styled.button`
  padding: 8px 16px;
  background: transparent;
  border: 1.5px solid #E5E7EB;
  border-radius: 8px;
  font-size: 14px;
  color: #6B7280;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 500;

  &:hover {
    background: #F9FAFB;
    border-color: #4A90E2;
    color: #4A90E2;
  }
`;

export const ScheduleList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ScheduleItem = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr auto;
  gap: 20px;
  padding: 20px;
  background: #F9FAFB;
  border-radius: 12px;
  border: 1px solid #E5E7EB;
  transition: all 0.3s;

  &:hover {
    background: #FFFFFF;
    border-color: #4A90E2;
    box-shadow: 0 4px 12px rgba(74, 144, 226, 0.1);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

export const ScheduleTime = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 700;
  color: #111827;

  svg {
    color: #4A90E2;
  }
`;

export const ScheduleContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const ScheduleType = styled.span`
  font-size: 12px;
  color: #6B7280;
  font-weight: 600;
  text-transform: uppercase;
`;

export const ScheduleTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #111827;
`;

export const ScheduleSubtitle = styled.div`
  font-size: 14px;
  color: #6B7280;
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const ScheduleBadge = styled.div`
  padding: 6px 16px;
  background: ${props => props.color || '#E5E7EB'};
  color: ${props => props.color === '#E0E0E0' ? '#6B7280' : '#FFFFFF'};
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  height: fit-content;
  align-self: center;
`;

/* ===== 사이드 패널 ===== */
export const SidePanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

/* ===== 건강 점수 카드 ===== */
export const HealthScoreCard = styled.div`
  background: #FFFFFF;
  border-radius: 16px;
  padding: 28px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
`;

export const HealthScoreDisplay = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 24px 0;
`;

export const TotalScore = styled.div`
  font-size: 56px;
  font-weight: 800;
  color: #111827;
`;

export const HealthMetrics = styled.div`
  display: flex;
  gap: 16px;
`;

export const HealthMetric = styled.div`
  text-align: center;
`;

export const HealthGrade = styled.div`
  font-size: 28px;
  font-weight: 800;
  color: ${props => props.color || '#4A90E2'};
  margin-bottom: 4px;
`;

export const MetricLabel = styled.div`
  font-size: 13px;
  color: #6B7280;
  font-weight: 500;
`;

export const ViewReportButton = styled.button`
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #4A90E2 0%, #357ABD 100%);
  color: #FFFFFF;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(74, 144, 226, 0.3);
  }
`;

/* ===== 빠른 메뉴 ===== */
export const QuickMenuCard = styled.div`
  background: #FFFFFF;
  border-radius: 16px;
  padding: 28px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
`;

export const ViewAllLink = styled.a`
  font-size: 14px;
  color: #4A90E2;
  cursor: pointer;
  font-weight: 600;
  transition: color 0.2s;

  &:hover {
    color: #357ABD;
    text-decoration: underline;
  }
`;

export const QuickMenuList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const QuickMenuItem = styled.div`
  display: flex;
  gap: 12px;
  padding: 16px;
  background: ${props => props.$completed ? '#F0F9FF' : '#FEF3C7'};
  border-radius: 12px;
  border: 1px solid ${props => props.$completed ? '#BFDBFE' : '#FDE68A'};
`;

export const CheckIcon = styled.div`
  width: 24px;
  height: 24px;
  background: #10B981;
  color: #FFFFFF;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  flex-shrink: 0;
`;

export const QuickMenuContent = styled.div`
  flex: 1;
`;

export const QuickMenuTitle = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 4px;
`;

export const QuickMenuStatus = styled.div`
  font-size: 13px;
  color: #6B7280;
  margin-bottom: 6px;
`;

export const QuickMenuTime = styled.div`
  font-size: 12px;
  color: #9CA3AF;
`;

/* ===== 진행률 섹션 ===== */
export const ProgressSection = styled.div`
  background: #FFFFFF;
  border-radius: 16px;
  padding: 28px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
`;

export const MonthButton = styled.button`
  padding: 8px 18px;
  background: #4A90E2;
  color: #FFFFFF;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: #357ABD;
    transform: translateY(-2px);
  }
`;

export const ProgressGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const ProgressBar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ProgressLabel = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #374151;
`;

export const ProgressTrack = styled.div`
  width: 100%;
  height: 12px;
  background: #E5E7EB;
  border-radius: 999px;
  overflow: hidden;
`;

export const ProgressFill = styled.div`
  width: ${props => props.width}%;
  height: 100%;
  background: ${props => props.color || '#4A90E2'};
  border-radius: 999px;
  transition: width 0.6s ease;
`;

export const ProgressValue = styled.div`
  font-size: 14px;
  color: #6B7280;
  font-weight: 600;
`;