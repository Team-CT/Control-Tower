import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as S from './TenantDetail.styled';

const TenantDetail = () => {
  const { tenantId } = useParams();
  const navigate = useNavigate();

  // TODO: Zustand state mapping
  const tenantData = {
    id: 'KAL-001',
    name: '대한항공',
    plan: 'Enterprise',
    planPrice: '$999/월',
    employeeCount: 1250,
    activeUsers: 1180,
    managedFeatures: 8,
    totalRevenue: '$11,988',
    status: 'active',
    icon: '✈️',
    country: '대한민국',
    address: '서울특별시 강서구 하늘길 260',
    email: 'admin@koreanair.com',
    phone: '+82-2-1234-5678',
    joinDate: '2025-03-15',
    billingPeriod: '연간',
    nextBilling: '2026-03-15',
    usageStats: {
      storageUsage: 45.2,
      lastLogin: '2026-01-20 14:30',
      activeEmployees: 1180
    },
    activityLog: [
      {
        id: 1,
        action: '관리자 로그인',
        timestamp: '2026-01-20 14:30',
        user: 'admin@koreanair.com'
      },
      {
        id: 2,
        action: '신규 직원 5명 추가',
        timestamp: '2026-01-20 10:15',
        user: 'hr@koreanair.com'
      },
      {
        id: 3,
        action: '플랜 업그레이드 요청',
        timestamp: '2026-01-19 16:20',
        user: 'admin@koreanair.com'
      },
      {
        id: 4,
        action: '결제 완료',
        timestamp: '2026-01-19 09:00',
        user: 'system'
      },
      {
        id: 5,
        action: '보고서 생성',
        timestamp: '2026-01-18 14:45',
        user: 'manager@koreanair.com'
      }
    ]
  };

  const handleGoBack = () => {
    navigate('/tenant');
  };

  const quickActions = [
    { id: 1, label: '구독 플랜 변경', icon: '💳', action: () => console.log('플랜 변경') },
    { id: 2, label: '긴급 로그아웃', icon: '🔐', action: () => console.log('긴급 로그아웃') },
    { id: 3, label: '계정 정지', icon: '🚫', action: () => console.log('계정 정지') },
    { id: 4, label: '로그 보기', icon: '📄', action: () => console.log('로그 보기') }
  ];

  return (
    <S.MainContainer>
      <S.ContentWrapper>
        <S.BackButton onClick={handleGoBack}>
          ← 테넌트 목록으로 돌아가기
        </S.BackButton>

        <S.TenantHeader>
          <S.TenantHeaderLeft>
            <S.TenantIconLarge>{tenantData.icon}</S.TenantIconLarge>
            <S.TenantHeaderInfo>
              <S.TenantNameLarge>{tenantData.name}</S.TenantNameLarge>
              <S.TenantId>테넌트 ID: {tenantData.id}</S.TenantId>
            </S.TenantHeaderInfo>
          </S.TenantHeaderLeft>
          <S.TenantHeaderRight>
            <S.StatusBadgeLarge status={tenantData.status}>
              ✓ 정상 서비스 중
            </S.StatusBadgeLarge>
            <S.PlanBadgeLarge plan={tenantData.plan}>
              {tenantData.plan} 플랜
            </S.PlanBadgeLarge>
          </S.TenantHeaderRight>
        </S.TenantHeader>

        <S.QuickActionsBar>
          {quickActions.map((action) => (
            <S.QuickActionButton key={action.id} onClick={action.action}>
              <S.ActionIcon>{action.icon}</S.ActionIcon>
              {action.label}
            </S.QuickActionButton>
          ))}
        </S.QuickActionsBar>

        <S.StatsGrid>
          <S.StatCard>
            <S.StatIcon>👥</S.StatIcon>
            <S.StatValue>{tenantData.employeeCount.toLocaleString()}</S.StatValue>
            <S.StatLabel>활성 직원 수</S.StatLabel>
            <S.StatSubtext>전체: 1,500명</S.StatSubtext>
            <S.TrendIndicator positive>↗</S.TrendIndicator>
          </S.StatCard>

          <S.StatCard>
            <S.StatIcon>📊</S.StatIcon>
            <S.StatValue>{tenantData.activeUsers.toLocaleString()}</S.StatValue>
            <S.StatLabel>월간 활성 사용자</S.StatLabel>
            <S.StatSubtext>지난 30일 기준</S.StatSubtext>
            <S.TrendIndicator positive>↗</S.TrendIndicator>
          </S.StatCard>

          <S.StatCard>
            <S.StatIcon>⚙️</S.StatIcon>
            <S.StatValue>{tenantData.managedFeatures}</S.StatValue>
            <S.StatLabel>관리자 계정</S.StatLabel>
            <S.StatSubtext>유형 관리자 포함</S.StatSubtext>
            <S.TrendIndicator positive>↗</S.TrendIndicator>
          </S.StatCard>

          <S.StatCard>
            <S.StatIcon>💰</S.StatIcon>
            <S.StatValue>{tenantData.totalRevenue}</S.StatValue>
            <S.StatLabel>총 매출</S.StatLabel>
            <S.StatSubtext>누적 결제</S.StatSubtext>
            <S.TrendIndicator positive>↗</S.TrendIndicator>
          </S.StatCard>
        </S.StatsGrid>

        <S.ContentGrid>
          <S.LeftColumn>
            <S.InfoSection>
              <S.SectionTitle>
                <S.SectionIcon>🏢</S.SectionIcon>
                회사 정보
              </S.SectionTitle>
              <S.InfoList>
                <S.InfoRow>
                  <S.InfoLabel>🌐 국가</S.InfoLabel>
                  <S.InfoValue>{tenantData.country}</S.InfoValue>
                </S.InfoRow>
                <S.InfoRow>
                  <S.InfoLabel>📍 주소</S.InfoLabel>
                  <S.InfoValue>{tenantData.address}</S.InfoValue>
                </S.InfoRow>
                <S.InfoRow>
                  <S.InfoLabel>✉️ 담당자 이메일</S.InfoLabel>
                  <S.InfoValue>{tenantData.email}</S.InfoValue>
                </S.InfoRow>
                <S.InfoRow>
                  <S.InfoLabel>📞 전화번호</S.InfoLabel>
                  <S.InfoValue>{tenantData.phone}</S.InfoValue>
                </S.InfoRow>
              </S.InfoList>
            </S.InfoSection>

            <S.InfoSection>
              <S.SectionTitle>
                <S.SectionIcon>💳</S.SectionIcon>
                구독 정보
              </S.SectionTitle>
              <S.InfoList>
                <S.InfoRow>
                  <S.InfoLabel>💰 현재 플랜</S.InfoLabel>
                  <S.InfoValue>{tenantData.plan} - {tenantData.planPrice}</S.InfoValue>
                </S.InfoRow>
                <S.InfoRow>
                  <S.InfoLabel>📅 가입일</S.InfoLabel>
                  <S.InfoValue>{tenantData.joinDate}</S.InfoValue>
                </S.InfoRow>
                <S.InfoRow>
                  <S.InfoLabel>🔄 결제 주기</S.InfoLabel>
                  <S.InfoValue>{tenantData.billingPeriod}</S.InfoValue>
                </S.InfoRow>
                <S.InfoRow>
                  <S.InfoLabel>⏰ 다음 결제일</S.InfoLabel>
                  <S.InfoValue>{tenantData.nextBilling}</S.InfoValue>
                </S.InfoRow>
              </S.InfoList>
            </S.InfoSection>
          </S.LeftColumn>

          <S.RightColumn>
            <S.InfoSection>
              <S.SectionTitle>
                <S.SectionIcon>📊</S.SectionIcon>
                사용 현황
              </S.SectionTitle>
              <S.UsageItem>
                <S.UsageLabel>스토리지 사용량</S.UsageLabel>
                <S.ProgressBarContainer>
                  <S.ProgressBar progress={tenantData.usageStats.storageUsage} />
                </S.ProgressBarContainer>
                <S.UsageValue>{tenantData.usageStats.storageUsage} / 100</S.UsageValue>
              </S.UsageItem>
              <S.InfoList>
                <S.InfoRow>
                  <S.InfoLabel>⏰ 마지막 로그인</S.InfoLabel>
                  <S.InfoValue>{tenantData.usageStats.lastLogin}</S.InfoValue>
                </S.InfoRow>
                <S.InfoRow>
                  <S.InfoLabel>👥 월간 활성 사용자</S.InfoLabel>
                  <S.InfoValue>{tenantData.usageStats.activeEmployees.toLocaleString()}명</S.InfoValue>
                </S.InfoRow>
              </S.InfoList>
            </S.InfoSection>

            <S.InfoSection>
              <S.SectionHeader>
                <S.SectionTitle>
                  <S.SectionIcon>📄</S.SectionIcon>
                  최근 활동 로그
                </S.SectionTitle>
                <S.ViewAllLink href="#">전체 로그 보기</S.ViewAllLink>
              </S.SectionHeader>
              <S.ActivityList>
                {tenantData.activityLog.map((log) => (
                  <S.ActivityItem key={log.id}>
                    <S.ActivityDot />
                    <S.ActivityContent>
                      <S.ActivityAction>{log.action}</S.ActivityAction>
                      <S.ActivityMeta>
                        {log.timestamp} · {log.user}
                      </S.ActivityMeta>
                    </S.ActivityContent>
                  </S.ActivityItem>
                ))}
              </S.ActivityList>
            </S.InfoSection>
          </S.RightColumn>
        </S.ContentGrid>
      </S.ContentWrapper>
    </S.MainContainer>
  );
};

export default TenantDetail;