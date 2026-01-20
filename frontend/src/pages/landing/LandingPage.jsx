import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, LogIn, Clock, Plane, Users, Shield, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';
import { useAirlineTheme } from '../../context/AirlineThemeContext';
import AirlineRegisterModal from './AirlineRegisterModal';

// ===== Styled Components =====
const PageWrapper = ({ children, theme }) => (
  <div style={{
    minHeight: '100vh',
    background: `linear-gradient(135deg, ${theme.primary}15 0%, #ffffff 100%)`,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  }}>
    {children}
  </div>
);

const Header = ({ theme, onOpenRegister }) => {
  const navigate = useNavigate();
  
  return (
    <header style={{
      padding: '24px 80px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 2px 20px rgba(0,0,0,0.05)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          backgroundColor: theme.primary,
          padding: '8px',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Plane size={24} color="white" strokeWidth={2.5} style={{ transform: 'rotate(-45deg)' }} />
        </div>
        <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#1a1a1a', margin: 0 }}>
          {theme.name} <span style={{ fontWeight: '400', color: '#888', fontSize: '18px' }}>HR System</span>
        </h1>
      </div>
      <button
        onClick={onOpenRegister}
        style={{
          padding: '12px 24px',
          backgroundColor: 'transparent',
          border: `2px solid ${theme.primary}`,
          borderRadius: '8px',
          color: theme.primary,
          fontSize: '15px',
          fontWeight: '600',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = theme.primary;
          e.target.style.color = 'white';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = 'transparent';
          e.target.style.color = theme.primary;
        }}
      >
        <Settings size={18} />
        항공사 등록
      </button>
    </header>
  );
};

const MainContainer = ({ children }) => (
  <main style={{
    maxWidth: '1440px',
    margin: '0 auto',
    padding: '80px 80px',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '80px',
    alignItems: 'center',
  }}>
    {children}
  </main>
);

const HeroSection = ({ theme }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
    <div>
      <div style={{ 
        display: 'inline-block', 
        padding: '8px 16px', 
        backgroundColor: `${theme.primary}15`, 
        color: theme.primary, 
        borderRadius: '30px',
        fontWeight: '600',
        fontSize: '14px',
        marginBottom: '24px'
      }}>
        Next Gen HR Solution
      </div>
      <h2 style={{
        fontSize: '56px',
        fontWeight: '800',
        color: '#1a1a1a',
        lineHeight: '1.2',
        marginBottom: '24px',
      }}>
        {theme.name}의
        <br />
        <span style={{ color: theme.primary }}>스마트한 인사관리</span>
      </h2>
      <p style={{
        fontSize: '20px',
        color: '#666',
        lineHeight: '1.8',
        marginBottom: '40px',
      }}>
        실시간 근태관리부터 스케줄 최적화까지,
        <br />
        항공사 전문 HR 솔루션으로 운영 효율을 극대화하세요.
      </p>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
      {[
        { icon: Users, label: '승무원 관리', value: '99.9%', desc: '출근율' },
        { icon: Shield, label: '보안 시스템', value: 'ISO', desc: '인증' },
        { icon: TrendingUp, label: '업무 효율', value: '+45%', desc: '향상' },
      ].map((item, idx) => (
        <div key={idx} style={{
          padding: '24px',
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          textAlign: 'center',
          transition: 'transform 0.3s ease',
          cursor: 'default'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <item.icon size={32} color={theme.secondary} style={{ margin: '0 auto 12px' }} />
          <div style={{ fontSize: '24px', fontWeight: '700', color: theme.primary, marginBottom: '4px' }}>
            {item.value}
          </div>
          <div style={{ fontSize: '14px', color: '#666' }}>{item.desc}</div>
        </div>
      ))}
    </div>
  </div>
);

const ActionCard = ({ theme, onOpenRegister }) => {
  const navigate = useNavigate();

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '32px',
      padding: '48px',
      boxShadow: '0 20px 80px rgba(0,0,0,0.08)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* 장식용 배경 원 */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        right: '-10%',
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        background: `radial-gradient(circle, ${theme.primary}10 0%, transparent 70%)`,
        zIndex: 0
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <h3 style={{
          fontSize: '32px',
          fontWeight: '700',
          color: '#1a1a1a',
          marginBottom: '12px',
          textAlign: 'center',
        }}>
          시작하기
        </h3>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '40px' }}>
          관리자 또는 직원 계정으로 로그인하세요
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
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
        </div>

        <div style={{
          marginTop: '32px',
          padding: '24px',
          backgroundColor: '#f8f9fa',
          borderRadius: '16px',
          textAlign: 'center',
          fontSize: '14px',
          color: '#666',
          border: '1px solid #eee'
        }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
             <CheckCircle size={20} color={theme.primary} />
          </div>
          <strong style={{ color: '#333', display: 'block', marginBottom: '4px' }}>아직 계정이 없으신가요?</strong>
           인사팀에 문의하여 계정을 생성하세요.
           <br/>
           <button 
             onClick={onOpenRegister}
             style={{
               marginTop: '12px',
               background: 'none',
               border: 'none',
               color: theme.primary,
               fontWeight: '600',
               cursor: 'pointer',
               display: 'inline-flex',
               alignItems: 'center',
               gap: '4px'
             }}
           >
             새 항공사 등록하기 <ArrowRight size={14} />
           </button>
        </div>
      </div>
    </div>
  );
};

const ActionButton = ({ icon: Icon, label, subText, color, onClick, variant = 'solid' }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        padding: '24px',
        backgroundColor: variant === 'solid' 
          ? (isHovered ? color : `${color}10`) 
          : (isHovered ? `${color}10` : 'white'),
        border: variant === 'solid' ? 'none' : `2px solid ${color}`,
        borderRadius: '20px',
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: isHovered ? `0 10px 30px ${color}20` : 'none',
        width: '100%',
        textAlign: 'left'
      }}
    >
      <div style={{
        width: '56px',
        height: '56px',
        borderRadius: '16px',
        backgroundColor: variant === 'solid' ? (isHovered ? 'white' : color) : `${color}15`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        boxShadow: variant === 'solid' && !isHovered ? `0 8px 16px ${color}40` : 'none',
        transition: 'all 0.3s'
      }}>
        <Icon size={28} color={variant === 'solid' ? (isHovered ? color : 'white') : color} strokeWidth={2.5} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{
          fontSize: '18px',
          fontWeight: '700',
          color: variant === 'solid' ? (isHovered ? 'white' : color) : '#333',
          marginBottom: '4px',
          transition: 'color 0.3s'
        }}>
          {label}
        </div>
        <div style={{
          fontSize: '14px',
          color: variant === 'solid' ? (isHovered ? 'rgba(255,255,255,0.9)' : '#666') : '#888',
          fontWeight: '500'
        }}>
          {subText}
        </div>
      </div>
      <div style={{
        opacity: isHovered ? 1 : 0,
        transform: isHovered ? 'translateX(0)' : 'translateX(-10px)',
        transition: 'all 0.3s',
        color: variant === 'solid' ? 'white' : color
      }}>
        <ArrowRight size={20} />
      </div>
    </button>
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
      <PageWrapper theme={theme}>
        <Header theme={theme} onOpenRegister={openRegisterModal} />
        
        <MainContainer>
          <HeroSection theme={theme} />
          <ActionCard theme={theme} onOpenRegister={openRegisterModal} />
        </MainContainer>
      </PageWrapper>

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
