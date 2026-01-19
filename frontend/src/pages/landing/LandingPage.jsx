import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // [수정 1] 페이지 이동 기능 추가
import { Settings, LogIn, Clock, Plane, Users, Shield, TrendingUp } from 'lucide-react';

// ===== React State로 대체된 Store =====
const AirlineContext = React.createContext();

const AirlineProvider = ({ children }) => {
  const [config, setConfig] = useState(() => {
    const saved = localStorage.getItem('airline-config');
    return saved ? JSON.parse(saved) : {
      airlineName: 'Sky Airlines',
      primaryColor: '#0066CC',
      secondaryColor: '#FF6B35',
      isConfigured: false,
    };
  });

  useEffect(() => {
    localStorage.setItem('airline-config', JSON.stringify(config));
  }, [config]);

  const setAirlineConfig = (newConfig) => {
    setConfig({ ...newConfig, isConfigured: true });
  };

  return (
    <AirlineContext.Provider value={{ ...config, setAirlineConfig }}>
      {children}
    </AirlineContext.Provider>
  );
};

const useAirline = () => {
  const context = React.useContext(AirlineContext);
  if (!context) throw new Error('useAirline must be used within AirlineProvider');
  return context;
};

// ===== Styled Components =====
const PageWrapper = ({ children, primaryColor }) => (
  <div style={{
    minHeight: '100vh',
    background: `linear-gradient(135deg, ${primaryColor}15 0%, #ffffff 100%)`,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  }}>
    {children}
  </div>
);

const Header = ({ primaryColor, airlineName, onSettingsClick }) => (
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
      <Plane size={32} color={primaryColor} strokeWidth={2.5} />
      <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1a1a1a', margin: 0 }}>
        {airlineName}
      </h1>
    </div>
    <button
      onClick={onSettingsClick}
      style={{
        padding: '12px 24px',
        backgroundColor: 'transparent',
        border: `2px solid ${primaryColor}`,
        borderRadius: '8px',
        color: primaryColor,
        fontSize: '15px',
        fontWeight: '600',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        transition: 'all 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = primaryColor;
        e.target.style.color = 'white';
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = 'transparent';
        e.target.style.color = primaryColor;
      }}
    >
      <Settings size={18} />
      항공사 설정
    </button>
  </header>
);

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

const HeroSection = ({ primaryColor, secondaryColor }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
    <div>
      <h2 style={{
        fontSize: '56px',
        fontWeight: '800',
        color: '#1a1a1a',
        lineHeight: '1.2',
        marginBottom: '24px',
      }}>
        항공사 인사관리의
        <br />
        <span style={{ color: primaryColor }}>새로운 기준</span>
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
        { icon: Shield, label: '보안 시스템', value: 'ISO 27001', desc: '인증' },
        { icon: TrendingUp, label: '업무 효율', value: '+45%', desc: '향상' },
      ].map((item, idx) => (
        <div key={idx} style={{
          padding: '24px',
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          textAlign: 'center',
        }}>
          <item.icon size={32} color={secondaryColor} style={{ margin: '0 auto 12px' }} />
          <div style={{ fontSize: '24px', fontWeight: '700', color: primaryColor, marginBottom: '4px' }}>
            {item.value}
          </div>
          <div style={{ fontSize: '14px', color: '#666' }}>{item.desc}</div>
        </div>
      ))}
    </div>
  </div>
);

// [수정 2] ActionCard 컴포넌트에 useNavigate 적용
const ActionCard = ({ primaryColor, secondaryColor }) => {
  const navigate = useNavigate(); // 페이지 이동 훅 사용

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '24px',
      padding: '48px',
      boxShadow: '0 10px 60px rgba(0,0,0,0.12)',
    }}>
      <h3 style={{
        fontSize: '32px',
        fontWeight: '700',
        color: '#1a1a1a',
        marginBottom: '32px',
        textAlign: 'center',
      }}>
        시작하기
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <ActionButton
          icon={Clock}
          label="출근 로그인"
          description="QR 코드 또는 생체인증으로 빠른 출근"
          color={primaryColor}
          onClick={() => navigate('/work-login')} // [수정] 출근 페이지로 이동
        />
        <ActionButton
          icon={LogIn}
          label="일반 로그인"
          description="관리자 및 직원 포털 접속"
          color={secondaryColor}
          onClick={() => navigate('/login')} // [수정] 일반 로그인 페이지로 이동
          variant="outline"
        />
      </div>

      <div style={{
        marginTop: '32px',
        padding: '20px',
        backgroundColor: `${primaryColor}10`,
        borderRadius: '12px',
        textAlign: 'center',
        fontSize: '14px',
        color: '#666',
      }}>
        <strong style={{ color: primaryColor }}>처음 방문하셨나요?</strong>
        <br />
        관리자에게 초대 코드를 요청하세요
      </div>
    </div>
  );
};

const ActionButton = ({ icon: Icon, label, description, color, onClick, variant = 'solid' }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        padding: '24px',
        backgroundColor: variant === 'solid' ? (isHovered ? color : `${color}15`) : 'white',
        border: `2px solid ${color}`,
        borderRadius: '16px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: isHovered ? `0 8px 30px ${color}40` : '0 2px 10px rgba(0,0,0,0.05)',
      }}
    >
      <div style={{
        width: '56px',
        height: '56px',
        borderRadius: '12px',
        backgroundColor: variant === 'solid' ? (isHovered ? 'white' : color) : `${color}15`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}>
        <Icon size={28} color={variant === 'solid' ? (isHovered ? color : 'white') : color} />
      </div>
      <div style={{ textAlign: 'left', flex: 1 }}>
        <div style={{
          fontSize: '18px',
          fontWeight: '700',
          color: variant === 'solid' ? (isHovered ? 'white' : color) : color,
          marginBottom: '4px',
        }}>
          {label}
        </div>
        <div style={{
          fontSize: '14px',
          color: variant === 'solid' ? (isHovered ? 'rgba(255,255,255,0.9)' : '#666') : '#666',
        }}>
          {description}
        </div>
      </div>
    </button>
  );
};

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      backdropFilter: 'blur(4px)',
    }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{
        backgroundColor: 'white',
        borderRadius: '24px',
        padding: '48px',
        maxWidth: '600px',
        width: '90%',
        boxShadow: '0 20px 80px rgba(0,0,0,0.3)',
      }}>
        {children}
      </div>
    </div>
  );
};

const SettingsModal = ({ isOpen, onClose, onSave, currentConfig }) => {
  const [name, setName] = useState(currentConfig.airlineName);
  const [primary, setPrimary] = useState(currentConfig.primaryColor);
  const [secondary, setSecondary] = useState(currentConfig.secondaryColor);

  const handleSave = () => {
    onSave({ airlineName: name, primaryColor: primary, secondaryColor: secondary });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h3 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '32px', color: '#1a1a1a' }}>
        항공사 설정
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#666' }}>
            항공사 이름
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="예: Sky Airlines"
            style={{
              width: '100%',
              padding: '14px 16px',
              fontSize: '16px',
              border: '2px solid #e0e0e0',
              borderRadius: '8px',
              outline: 'none',
              transition: 'border-color 0.3s',
            }}
            onFocus={(e) => e.target.style.borderColor = primary}
            onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#666' }}>
              주요 컬러
            </label>
            <input
              type="color"
              value={primary}
              onChange={(e) => setPrimary(e.target.value)}
              style={{
                width: '100%',
                height: '56px',
                border: '2px solid #e0e0e0',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#666' }}>
              보조 컬러
            </label>
            <input
              type="color"
              value={secondary}
              onChange={(e) => setSecondary(e.target.value)}
              style={{
                width: '100%',
                height: '56px',
                border: '2px solid #e0e0e0',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            />
          </div>
        </div>

        <div style={{
          padding: '20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '12px',
          border: `2px dashed ${primary}`,
        }}>
          <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px', color: '#666' }}>
            미리보기
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <Plane size={32} color={primary} />
            <span style={{ fontSize: '20px', fontWeight: '700', color: primary }}>{name || 'Airlines'}</span>
          </div>
          <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
            <div style={{ width: '60px', height: '40px', backgroundColor: primary, borderRadius: '6px' }} />
            <div style={{ width: '60px', height: '40px', backgroundColor: secondary, borderRadius: '6px' }} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: '14px',
              backgroundColor: '#f0f0f0',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              color: '#666',
            }}
          >
            취소
          </button>
          <button
            onClick={handleSave}
            style={{
              flex: 1,
              padding: '14px',
              backgroundColor: primary,
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              color: 'white',
            }}
          >
            저장하기
          </button>
        </div>
      </div>
    </Modal>
  );
};

// ===== Main Component =====
const LandingPageContent = () => {
  const { airlineName, primaryColor, secondaryColor, setAirlineConfig } = useAirline();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <PageWrapper primaryColor={primaryColor}>
      <Header
        primaryColor={primaryColor}
        airlineName={airlineName}
        onSettingsClick={() => setIsSettingsOpen(true)}
      />
      
      <MainContainer>
        <HeroSection primaryColor={primaryColor} secondaryColor={secondaryColor} />
        <ActionCard primaryColor={primaryColor} secondaryColor={secondaryColor} />
      </MainContainer>

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onSave={setAirlineConfig}
        currentConfig={{ airlineName, primaryColor, secondaryColor }}
      />
    </PageWrapper>
  );
};

export default function AirlineLandingPage() {
  return (
    <AirlineProvider>
      <LandingPageContent />
    </AirlineProvider>
  );
}