import styled from 'styled-components';
import {
  User, Lock, ArrowRight, CheckCircle,
  HelpCircle, Info, Plane, Zap
} from 'lucide-react';

/** 단색 회색 톤 토큰 */
const TOKENS = {
  pageBg: '#f3f4f6',        // 페이지 배경
  cardBg: '#ffffff',        // 카드 배경
  leftBg: '#f9fafb',        // 왼쪽 섹션 단색

  textPrimary: '#111827',
  textSecondary: '#4b5563',
  textTertiary: '#9ca3af',

  border: '#e5e7eb',
  shadow: '0 20px 40px rgba(0,0,0,0.08)',
  shadowBtn: '0 4px 12px rgba(0,0,0,0.12)',

  accent: '#111827',        // 버튼/포커스용 진회색
  ring: 'rgba(17,24,39,0.15)',
};

/* ---------- Layout ---------- */
export const Container = styled.div`
  min-height: 100vh;
  background: ${TOKENS.pageBg};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1000px;
  min-height: 600px;
  display: flex;
  background: ${TOKENS.cardBg};
  border-radius: 24px;
  box-shadow: ${TOKENS.shadow};
  overflow: hidden;
  border: 1px solid ${TOKENS.border};

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

/* ---------- Left : Brand ---------- */
export const BrandSection = styled.div`
  flex: 1;
  background: ${TOKENS.leftBg}; /* ✅ 단색 */
  padding: 60px 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-right: 1px solid ${TOKENS.border};

  @media (max-width: 768px) {
    border-right: none;
    border-bottom: 1px solid ${TOKENS.border};
    padding: 40px 30px;
  }
`;

export const BrandHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const LogoIcon = styled(Plane)`
  width: 32px;
  height: 32px;
  transform: rotate(-45deg);
  color: ${TOKENS.textPrimary};
`;

export const BrandName = styled.h1`
  font-size: 24px;
  font-weight: 900;
  margin: 0;
  color: ${TOKENS.textPrimary};
`;

export const ServiceInfo = styled.div`
  margin-top: 40px;
`;

export const ServiceTitle = styled.h2`
  font-size: 32px;
  font-weight: 900;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  color: ${TOKENS.textPrimary};
`;

export const ServiceIcon = styled(Zap)`
  width: 28px;
  height: 28px;
  color: ${TOKENS.textPrimary};
`;

export const ServiceSubtitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 18px;
  color: ${TOKENS.textSecondary};
`;

export const ServiceDescription = styled.p`
  font-size: 15px;
  line-height: 1.7;
  color: ${TOKENS.textSecondary};
  max-width: 92%;
`;

export const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: ${TOKENS.textSecondary};
`;

export const FeatureCheckIcon = styled(CheckCircle)`
  width: 16px;
  height: 16px;
  color: ${TOKENS.textTertiary};
`;

export const FeatureText = styled.span``;

/* ---------- Right : Login ---------- */
export const LoginSection = styled.div`
  flex: 1.2;
  background: ${TOKENS.cardBg}; /* ✅ 단색 */
  padding: 60px 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  isolation: isolate;

  @media (max-width: 768px) {
    padding: 40px 24px;
  }
`;

export const LoginCard = styled.div`
  width: 100%;
  max-width: 400px;
`;

export const LoginHeader = styled.div`
  margin-bottom: 36px;
`;

export const LoginTitle = styled.h2`
  font-size: 28px;
  font-weight: 900;
  margin-bottom: 10px;
  color: ${TOKENS.textPrimary};
`;

export const LoginSubtitle = styled.p`
  font-size: 15px;
  color: ${TOKENS.textSecondary};
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 22px;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const InputLabel = styled.label`
  font-size: 14px;
  font-weight: 800;
  color: ${TOKENS.textPrimary};
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const UserIcon = styled(User)`
  width: 16px;
  height: 16px;
  color: ${TOKENS.textTertiary};
`;

export const LockIcon = styled(Lock)`
  width: 16px;
  height: 16px;
  color: ${TOKENS.textTertiary};
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid ${TOKENS.border};
  border-radius: 10px;
  font-size: 15px;
  background: #f9fafb;
  color: ${TOKENS.textPrimary};

  &:focus {
    background: #fff;
    border-color: ${TOKENS.accent};
    box-shadow: 0 0 0 4px ${TOKENS.ring};
    outline: none;
  }

  &::placeholder {
    color: ${TOKENS.textTertiary};
  }
`;

export const RememberMeRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Checkbox = styled.input`
  width: 16px;
  height: 16px;
  accent-color: ${TOKENS.accent};
`;

export const CheckboxLabel = styled.label`
  font-size: 14px;
  color: ${TOKENS.textSecondary};
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 14px;
  background: ${TOKENS.accent};
  color: #fff;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 900;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    box-shadow: ${TOKENS.shadowBtn};
    transform: translateY(-1px);
  }
`;

export const ArrowIcon = styled(ArrowRight)`
  width: 18px;
  height: 18px;
`;

export const FooterLinks = styled.div`
  margin-top: 32px;
  display: flex;
  justify-content: center;
  gap: 12px;
  font-size: 13px;
  color: ${TOKENS.textTertiary};
`;

export const FooterLink = styled.button`
  background: none;
  border: none;
  padding: 0;
  font-size: inherit;
  color: inherit;
  cursor: pointer;

  &:hover {
    color: ${TOKENS.textPrimary};
    text-decoration: underline;
  }
`;

export const FooterDivider = styled.div`
  width: 1px;
  height: 12px;
  background: ${TOKENS.border};
`;

export const HelpIcon = styled(HelpCircle)`
  width: 14px;
  height: 14px;
`;

export const InfoIcon = styled(Info)`
  width: 14px;
  height: 14px;
`;
