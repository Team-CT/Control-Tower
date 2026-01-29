import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as S from './TenantDetail.styled';
import { tenantService } from '../../../api/tenant/services';

const TenantDetail = () => {
  const { tenantId } = useParams();
  const navigate = useNavigate();
  const [tenantData, setTenantData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTenantDetail();
  }, [tenantId]);

  const fetchTenantDetail = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await tenantService.getTenantDetail(tenantId);
      setTenantData(response.data);
    } catch (err) {
      console.error('테넌트 상세 정보 로드 실패:', err);
      setError('데이터를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    navigate('/super-admin/tenants');
  };

  const quickActions = [
    { id: 1, label: '긴급 로그아웃', icon: '🔐', action: () => console.log('긴급 로그아웃') },
    { id: 2, label: '계정 정지', icon: '🚫', action: () => console.log('계정 정지') },
    { id: 3, label: '로그 보기', icon: '📄', action: () => console.log('로그 보기') }
  ];

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR');
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString('ko-KR');
  };

  if (loading) {
    return (
      <S.MainContainer>
        <S.ContentWrapper>
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <p>데이터를 불러오는 중...</p>
          </div>
        </S.ContentWrapper>
      </S.MainContainer>
    );
  }

  if (error || !tenantData) {
    return (
      <S.MainContainer>
        <S.ContentWrapper>
          <S.BackButton onClick={handleGoBack}>
            ← 테넌트 목록으로 돌아가기
          </S.BackButton>
          <div style={{ textAlign: 'center', padding: '50px', color: '#dc2626' }}>
            <p>{error || '데이터를 찾을 수 없습니다.'}</p>
            <button onClick={fetchTenantDetail} style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}>
              다시 시도
            </button>
          </div>
        </S.ContentWrapper>
      </S.MainContainer>
    );
  }

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
            <S.StatValue>{(tenantData.employeeCount || 0).toLocaleString()}</S.StatValue>
            <S.StatLabel>전체 직원 수</S.StatLabel>
            <S.StatSubtext>등록된 직원</S.StatSubtext>
            <S.TrendIndicator positive>↗</S.TrendIndicator>
          </S.StatCard>

          <S.StatCard>
            <S.StatIcon>📊</S.StatIcon>
            <S.StatValue>{(tenantData.activeUsers || 0).toLocaleString()}</S.StatValue>
            <S.StatLabel>활성 사용자</S.StatLabel>
            <S.StatSubtext>현재 활성 상태</S.StatSubtext>
            <S.TrendIndicator positive>↗</S.TrendIndicator>
          </S.StatCard>

          <S.StatCard>
            <S.StatIcon>⚙️</S.StatIcon>
            <S.StatValue>{tenantData.managedFeatures || 0}</S.StatValue>
            <S.StatLabel>관리 기능</S.StatLabel>
            <S.StatSubtext>활성화된 기능</S.StatSubtext>
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
                {/* <S.InfoRow>
                  <S.InfoLabel>💰 현재 플랜</S.InfoLabel>
                  <S.InfoValue>{tenantData.plan} - {tenantData.planPrice}</S.InfoValue>
                </S.InfoRow> */}
                <S.InfoRow>
                  <S.InfoLabel>📅 가입일</S.InfoLabel>
                  <S.InfoValue>{formatDate(tenantData.joinDate)}</S.InfoValue>
                </S.InfoRow>
                {/* <S.InfoRow>
                  <S.InfoLabel>🔄 결제 주기</S.InfoLabel>
                  <S.InfoValue>{tenantData.billingPeriod}</S.InfoValue>
                </S.InfoRow>
                <S.InfoRow>
                  <S.InfoLabel>⏰ 다음 결제일</S.InfoLabel>
                  <S.InfoValue>{tenantData.nextBilling}</S.InfoValue>
                </S.InfoRow> */}
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
                  <S.ProgressBar progress={tenantData.usageStats?.storageUsage || 0} />
                </S.ProgressBarContainer>
                <S.UsageValue>{tenantData.usageStats?.storageUsage || 0} / 100 GB</S.UsageValue>
              </S.UsageItem>
              <S.InfoList>
                <S.InfoRow>
                  <S.InfoLabel>⏰ 마지막 로그인</S.InfoLabel>
                  <S.InfoValue>{formatDateTime(tenantData.usageStats?.lastLogin) || '정보 없음'}</S.InfoValue>
                </S.InfoRow>
                <S.InfoRow>
                  <S.InfoLabel>👥 월간 활성 사용자</S.InfoLabel>
                  <S.InfoValue>{(tenantData.usageStats?.activeEmployees || 0).toLocaleString()}명</S.InfoValue>
                </S.InfoRow>
              </S.InfoList>
            </S.InfoSection>

            <S.InfoSection>
              <S.SectionTitle>
                <S.SectionIcon>📄</S.SectionIcon>
                최근 활동 로그
              </S.SectionTitle>
              <div style={{ padding: '20px', textAlign: 'center', color: '#6f767e' }}>
                활동 로그 기능은 준비 중입니다.
              </div>
            </S.InfoSection>
          </S.RightColumn>
        </S.ContentGrid>
      </S.ContentWrapper>
    </S.MainContainer>
  );
};

export default TenantDetail;