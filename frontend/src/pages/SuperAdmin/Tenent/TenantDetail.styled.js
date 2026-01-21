import styled from 'styled-components';

export const MainContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #f5f7fa;
  padding: 32px;

  @media (max-width: 1024px) {
    padding: 20px;
  }
`;

export const ContentWrapper = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  width: 100%;
`;

export const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 500;
  color: #6f767e;
  background-color: transparent;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-bottom: 24px;
  transition: all 0.2s;

  &:hover {
    background-color: #f1f3f5;
    color: #1a1d1f;
  }
`;

export const TenantHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  margin-bottom: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

export const TenantHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const TenantIconLarge = styled.div`
  width: 72px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e8edff;
  border-radius: 16px;
  font-size: 36px;
`;

export const TenantHeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const TenantNameLarge = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #1a1d1f;
  margin: 0;
`;

export const TenantId = styled.div`
  font-size: 14px;
  color: #6f767e;
`;

export const TenantHeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-start;
  }
`;

export const StatusBadgeLarge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  background-color: ${props => props.status === 'active' ? '#d4f4dd' : '#ffe4e6'};
  color: ${props => props.status === 'active' ? '#0f7a35' : '#dc2626'};
`;

export const PlanBadgeLarge = styled.div`
  display: inline-block;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  background-color: ${props => props.plan === 'Enterprise' ? '#f3e8ff' : '#dbeafe'};
  color: ${props => props.plan === 'Enterprise' ? '#7c3aed' : '#2563eb'};
`;

export const QuickActionsBar = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 32px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const QuickActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px;
  font-size: 15px;
  font-weight: 600;
  color: #4c6fff;
  background-color: #ffffff;
  border: 2px solid #4c6fff;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #4c6fff;
    color: #ffffff;
  }
`;

export const ActionIcon = styled.span`
  font-size: 20px;
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 32px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const StatCard = styled.div`
  position: relative;
  background-color: #ffffff;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

export const StatIcon = styled.div`
  font-size: 28px;
  margin-bottom: 12px;
`;

export const StatValue = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: #1a1d1f;
  margin-bottom: 8px;
`;

export const StatLabel = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #6f767e;
  margin-bottom: 4px;
`;

export const StatSubtext = styled.div`
  font-size: 13px;
  color: #9a9fa5;
`;

export const TrendIndicator = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 24px;
  color: ${props => props.positive ? '#0f7a35' : '#dc2626'};
`;

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const InfoSection = styled.div`
  background-color: #ffffff;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const SectionTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-weight: 700;
  color: #1a1d1f;
  margin: 0 0 20px 0;
`;

export const SectionIcon = styled.span`
  font-size: 22px;
`;

export const ViewAllLink = styled.a`
  font-size: 14px;
  font-weight: 500;
  color: #4c6fff;
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: #3651e0;
    text-decoration: underline;
  }
`;

export const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f1f3f5;

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

export const InfoLabel = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #6f767e;
  min-width: 140px;
  flex-shrink: 0;
`;

export const InfoValue = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #1a1d1f;
  text-align: right;
  flex: 1;
  word-break: break-word;
`;

export const UsageItem = styled.div`
  margin-bottom: 20px;
`;

export const UsageLabel = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #1a1d1f;
  margin-bottom: 12px;
`;

export const ProgressBarContainer = styled.div`
  width: 100%;
  height: 8px;
  background-color: #e4e7eb;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 8px;
`;

export const ProgressBar = styled.div`
  width: ${props => props.progress}%;
  height: 100%;
  background: linear-gradient(90deg, #4c6fff 0%, #6b8aff 100%);
  border-radius: 4px;
  transition: width 0.3s ease;
`;

export const UsageValue = styled.div`
  font-size: 13px;
  color: #6f767e;
  text-align: right;
`;

export const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ActivityItem = styled.div`
  display: flex;
  gap: 12px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f1f3f5;

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

export const ActivityDot = styled.div`
  width: 8px;
  height: 8px;
  background-color: #4c6fff;
  border-radius: 50%;
  margin-top: 6px;
  flex-shrink: 0;
`;

export const ActivityContent = styled.div`
  flex: 1;
`;

export const ActivityAction = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #1a1d1f;
  margin-bottom: 4px;
`;

export const ActivityMeta = styled.div`
  font-size: 13px;
  color: #6f767e;
`;