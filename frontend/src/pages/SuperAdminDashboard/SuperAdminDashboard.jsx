import React from 'react';
import styled from 'styled-components';
import { 
  Home, Users, Building2, CheckCircle, XCircle, Clock,
  Mail, Phone, FileText, Calendar
} from 'lucide-react';

const MainContainer = styled.div`
  padding: 32px;
  max-width: 1400px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: 32px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 8px;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: var(--text-secondary);
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`;

const StatCard = styled.div`
  background: var(--bg-secondary);
  border-radius: 12px;
  padding: 24px;
  border: 1px solid var(--border-color);
`;

const StatHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`;

const StatIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: ${props => props.color || '#4A90E2'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: var(--text-secondary);
`;

const StatValue = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 8px;
`;

const StatTrend = styled.div`
  font-size: 13px;
  color: var(--text-tertiary);
`;

const ContentSection = styled.div`
  background: var(--bg-secondary);
  border-radius: 12px;
  padding: 24px;
  border: 1px solid var(--border-color);
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const PendingList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const PendingItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: var(--bg-main);
  border-radius: 8px;
  border: 1px solid var(--border-color);
`;

const ItemInfo = styled.div`
  flex: 1;
`;

const ItemTitle = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 4px;
`;

const ItemDetail = styled.div`
  font-size: 13px;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 8px;
`;

const ItemActions = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  
  ${props => props.$approve && `
    background: #50C878;
    color: white;
    &:hover {
      background: #45B369;
    }
  `}
  
  ${props => props.$reject && `
    background: #FF6B6B;
    color: white;
    &:hover {
      background: #E85C5C;
    }
  `}
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 48px 24px;
  color: var(--text-tertiary);
`;

const SuperAdminDashboard = () => {
  // TODO: Zustand state mapping
  const dashboardData = {
    stats: [
      {
        id: 1,
        icon: <Building2 size={20} />,
        label: '등록된 항공사',
        value: 12,
        trend: '전월 대비 +2',
        color: '#4A90E2'
      },
      {
        id: 2,
        icon: <Clock size={20} />,
        label: '승인 대기 중',
        value: 3,
        trend: '신규 신청',
        color: '#FFB347'
      },
      {
        id: 3,
        icon: <CheckCircle size={20} />,
        label: '이번 달 승인',
        value: 5,
        trend: '총 승인 건수',
        color: '#50C878'
      },
      {
        id: 4,
        icon: <Users size={20} />,
        label: '전체 관리자',
        value: 24,
        trend: '활성 계정',
        color: '#9B59B6'
      }
    ],
    pendingApprovals: [
      {
        id: 1,
        airlineName: '아시아나항공',
        country: '대한민국',
        managerName: '김철수',
        managerEmail: 'manager@flyasiana.com',
        submittedDate: '2026-01-18',
        status: 'pending'
      },
      {
        id: 2,
        airlineName: 'Jin Air',
        country: '대한민국',
        managerName: '이영희',
        managerEmail: 'hr@jinair.com',
        submittedDate: '2026-01-19',
        status: 'pending'
      },
      {
        id: 3,
        airlineName: 'T\'way Air',
        country: '대한민국',
        managerName: '박민수',
        managerEmail: 'admin@twayair.com',
        submittedDate: '2026-01-20',
        status: 'pending'
      }
    ]
  };

  const handleApprove = (id) => {
    // TODO: Zustand action - approveAirline(id)
    console.log('Approve airline:', id);
  };

  const handleReject = (id) => {
    // TODO: Zustand action - rejectAirline(id)
    console.log('Reject airline:', id);
  };

  return (
    <MainContainer>
      <Header>
        <Title>슈퍼 관리자 대시보드</Title>
        <Subtitle>항공사 승인 및 시스템 전체 관리</Subtitle>
      </Header>

      {/* 통계 카드 */}
      <StatsGrid>
        {dashboardData.stats.map(stat => (
          <StatCard key={stat.id}>
            <StatHeader>
              <StatIcon color={stat.color}>{stat.icon}</StatIcon>
              <StatLabel>{stat.label}</StatLabel>
            </StatHeader>
            <StatValue>{stat.value}</StatValue>
            <StatTrend>{stat.trend}</StatTrend>
          </StatCard>
        ))}
      </StatsGrid>

      {/* 승인 대기 목록 */}
      <ContentSection>
        <SectionTitle>
          <Clock size={20} />
          승인 대기 중인 항공사
        </SectionTitle>
        
        {dashboardData.pendingApprovals.length > 0 ? (
          <PendingList>
            {dashboardData.pendingApprovals.map(item => (
              <PendingItem key={item.id}>
                <ItemInfo>
                  <ItemTitle>{item.airlineName}</ItemTitle>
                  <ItemDetail>
                    <span><Mail size={14} /> {item.managerEmail}</span>
                    <span><Calendar size={14} /> {item.submittedDate}</span>
                  </ItemDetail>
                </ItemInfo>
                <ItemActions>
                  <ActionButton 
                    $approve 
                    onClick={() => handleApprove(item.id)}
                  >
                    승인
                  </ActionButton>
                  <ActionButton 
                    $reject 
                    onClick={() => handleReject(item.id)}
                  >
                    반려
                  </ActionButton>
                </ItemActions>
              </PendingItem>
            ))}
          </PendingList>
        ) : (
          <EmptyState>
            승인 대기 중인 항공사가 없습니다
          </EmptyState>
        )}
      </ContentSection>
    </MainContainer>
  );
};

export default SuperAdminDashboard;
