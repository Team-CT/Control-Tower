import React from 'react';
import * as S from './SetupComplete.styled';

const SetupComplete = () => {
  // TODO: Zustand state mapping
  const userInfo = {
    airline: '대한항공',
    email: 'admin@koreanair.com',
    status: '활성화됨',
  };

  const handleDashboardRedirect = () => {
    // TODO: 대시보드로 라우팅 처리
    console.log('Navigate to dashboard');
    window.location.href = '/dashboard';
  };

  return (
    <S.MainContainer>
      <S.ContentWrapper>
        <S.SuccessCard>
          <S.IconWrapper>
            <S.CheckIcon>✓</S.CheckIcon>
          </S.IconWrapper>

          <S.Title>설정이 완료되었습니다!</S.Title>
          <S.Subtitle>
            항공사 관리자 계정이 성공적으로 생성되었습니다.
            <br />
            이제 SkyHR 시스템을 사용할 수 있습니다.
          </S.Subtitle>

          <S.InfoCard>
            <S.InfoRow>
              <S.InfoLabel>항공사</S.InfoLabel>
              <S.InfoValue>{userInfo.airline}</S.InfoValue>
            </S.InfoRow>
            <S.Divider />
            <S.InfoRow>
              <S.InfoLabel>계정 이메일</S.InfoLabel>
              <S.InfoValue>{userInfo.email}</S.InfoValue>
            </S.InfoRow>
            <S.Divider />
            <S.InfoRow>
              <S.InfoLabel>상태</S.InfoLabel>
              <S.StatusBadge>
                <S.StatusIcon>✓</S.StatusIcon>
                {userInfo.status}
              </S.StatusBadge>
            </S.InfoRow>
          </S.InfoCard>

          <S.ActionButton onClick={handleDashboardRedirect}>
            대시보드 이동
          </S.ActionButton>
        </S.SuccessCard>
      </S.ContentWrapper>
    </S.MainContainer>
  );
};

export default SetupComplete;