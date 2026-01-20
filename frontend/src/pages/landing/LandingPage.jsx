import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, LogIn, Clock, Plane, Users, Shield, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';
import { useAirlineTheme } from '../../context/AirlineThemeContext';
import AirlineRegisterModal from './AirlineRegisterModal';
import * as S from './LandingPage.styled';

const Header = ({ theme, onOpenRegister }) => {
  return (
    <S.HeaderContainer>
      <S.HeaderLogoSection>
        <S.HeaderLogoWrapper theme={theme}>
          <Plane size={24} color="white" strokeWidth={2.5} style={{ transform: 'rotate(-45deg)' }} />
        </S.HeaderLogoWrapper>
        <S.HeaderTitle>
          {theme.name} <span>HR System</span>
        </S.HeaderTitle>
      </S.HeaderLogoSection>
      <S.HeaderRegisterButton theme={theme} onClick={onOpenRegister}>
        <Settings size={18} />
        항공사 등록
      </S.HeaderRegisterButton>
    </S.HeaderContainer>
  );
};

const HeroSection = ({ theme }) => (
  <S.HeroContainer>
    <div>
      <S.HeroBadge theme={theme}>
        Next Gen HR Solution
      </S.HeroBadge>
      <S.HeroTitle theme={theme}>
        {theme.name}의
        <br />
        <span>스마트한 인사관리</span>
      </S.HeroTitle>
      <S.HeroDescription>
        실시간 근태관리부터 스케줄 최적화까지,
        <br />
        항공사 전문 HR 솔루션으로 운영 효율을 극대화하세요.
      </S.HeroDescription>
    </div>

    <S.HeroStatsGrid>
      {[
        { icon: Users, label: '승무원 관리', value: '99.9%', desc: '출근율' },
        { icon: Shield, label: '보안 시스템', value: 'ISO', desc: '인증' },
        { icon: TrendingUp, label: '업무 효율', value: '+45%', desc: '향상' },
      ].map((item, idx) => (
        <S.HeroStatCard key={idx}>
          <item.icon size={32} color={theme.secondary} style={{ margin: '0 auto 12px', display: 'block' }} />
          <S.StatValue theme={theme}>
            {item.value}
          </S.StatValue>
          <S.StatDesc>{item.desc}</S.StatDesc>
        </S.HeroStatCard>
      ))}
    </S.HeroStatsGrid>
  </S.HeroContainer>
);

const ActionCard = ({ theme, onOpenRegister }) => {
  const navigate = useNavigate();

  return (
    <S.ActionCardContainer>
      <S.ActionCardBackgroundCircle theme={theme} />
      <S.ActionCardContent>
        <S.ActionCardTitle>시작하기</S.ActionCardTitle>
        <S.ActionCardDescription>
          관리자 또는 직원 계정으로 로그인하세요
        </S.ActionCardDescription>

        <S.ActionButtonsWrapper>
          <ActionButton
            icon={Clock}
            label="출근 로그인"
            color={theme.primary}
            onClick={() => navigate('/work-login')}
            subText="사번으로 간편 출근"
          />
          <ActionButton
            icon={LogIn}
            label="일반 로그인"
            description="관리자 및 직원 포털 접속"
            color={theme.secondary}
            onClick={() => navigate('/login')}
            variant="outline"
            subText="아이디/비밀번호 로그인"
          />
        </S.ActionButtonsWrapper>

        <S.ActionRegisterWrapper>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
             <CheckCircle size={20} color={theme.primary} />
          </div>
          <S.ActionRegisterTitle>아직 계정이 없으신가요?</S.ActionRegisterTitle>
           인사팀에 문의하여 계정을 생성하세요.
           <br/>
           <S.ActionRegisterButton theme={theme} onClick={onOpenRegister}>
             새 항공사 등록하기 <ArrowRight size={14} />
           </S.ActionRegisterButton>
        </S.ActionRegisterWrapper>
      </S.ActionCardContent>
    </S.ActionCardContainer>
  );
};

const ActionButton = ({ icon: Icon, label, subText, color, onClick, variant = 'solid' }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <S.ActionButtonStyled
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      $variant={variant}
      $color={color}
      $isHovered={isHovered}
    >
      <S.ActionIconWrapper $variant={variant} $color={color} $isHovered={isHovered}>
        <Icon size={28} color={variant === 'solid' ? (isHovered ? color : 'white') : color} strokeWidth={2.5} />
      </S.ActionIconWrapper>
      <S.ActionTextWrapper>
        <S.ActionLabel $variant={variant} $color={color} $isHovered={isHovered}>
          {label}
        </S.ActionLabel>
        <S.ActionSubText $variant={variant} $isHovered={isHovered}>
          {subText}
        </S.ActionSubText>
      </S.ActionTextWrapper>
      <S.ActionArrowWrapper $variant={variant} $color={color} $isHovered={isHovered}>
        <ArrowRight size={20} />
      </S.ActionArrowWrapper>
    </S.ActionButtonStyled>
  );
};

// ===== Main Component =====
const LandingPageContent = () => {
  const { theme } = useAirlineTheme();
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const openRegisterModal = () => setIsRegisterModalOpen(true);
  const closeRegisterModal = () => setIsRegisterModalOpen(false);

  return (
    <>
      <S.PageWrapper theme={theme}>
        <Header theme={theme} onOpenRegister={openRegisterModal} />
        
        <S.MainContainer>
          <HeroSection theme={theme} />
          <ActionCard theme={theme} onOpenRegister={openRegisterModal} />
        </S.MainContainer>
      </S.PageWrapper>

      <AirlineRegisterModal 
        isOpen={isRegisterModalOpen} 
        onClose={closeRegisterModal} 
      />
    </>
  );
};

export default function AirlineLandingPage() {
  return (
    <LandingPageContent />
  );
}
