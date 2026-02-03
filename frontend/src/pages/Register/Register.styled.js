import styled from 'styled-components';
import { Plane } from 'lucide-react';

/** 단색 회색 톤 토큰 (Login과 동일 컨셉) */
const TOKENS = {
  pageBg: '#f3f4f6',
  cardBg: '#ffffff',
  leftBg: '#f9fafb',

  textPrimary: '#111827',
  textSecondary: '#4b5563',
  textTertiary: '#9ca3af',

  border: '#e5e7eb',
  shadow: '0 20px 40px rgba(0,0,0,0.08)',
  shadowBtn: '0 4px 12px rgba(0,0,0,0.12)',

  accent: '#111827',
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
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
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
  background: ${TOKENS.leftBg};
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
  margin: 0 0 12px;
  color: ${TOKENS.textPrimary};
`;

export const ServiceDescription = styled.p`
  font-size: 15px;
  line-height: 1.7;
  color: ${TOKENS.textSecondary};
  max-width: 92%;
  margin: 0;
`;

/* ---------- Stepper ---------- */
export const Stepper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 40px;
`;

export const Step = styled.div`
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 900;
  white-space: nowrap;

  background: ${({ $active }) => ($active ? TOKENS.accent : 'transparent')};
  color: ${({ $active, $done }) =>
    $active ? '#ffffff' : $done ? TOKENS.textPrimary : TOKENS.textTertiary};

  border: ${({ $active, $done }) =>
    $active
      ? '1px solid transparent'
      : $done
      ? '1px solid rgba(17,24,39,0.25)'
      : `1px solid ${TOKENS.border}`};

  transition: all 0.25s ease;
`;

export const StepLine = styled.div`
  flex: 1;
  height: 2px;
  background: ${({ $done }) => ($done ? TOKENS.accent : TOKENS.border)};
  transition: background 0.25s ease;
`;

/* ---------- Right : Register ---------- */
export const RegisterSection = styled.div`
  flex: 1.2;
  background: ${TOKENS.cardBg};
  padding: 60px 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  isolation: isolate;

  @media (max-width: 768px) {
    padding: 40px 24px;
  }
`;

export const RegisterCard = styled.div`
  width: 100%;
  max-width: 400px;
`;

export const RegisterHeader = styled.div`
  margin-bottom: 36px;
`;

export const RegisterTitle = styled.h2`
  font-size: 28px;
  font-weight: 900;
  margin: 0;
  color: ${TOKENS.textPrimary};
`;

export const RegisterForm = styled.form`
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
`;

export const InputRow = styled.div`
  display: flex;
  gap: 8px;
`;

/* Input */
export const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid ${TOKENS.border};
  border-radius: 10px;
  font-size: 15px;
  background: #f9fafb;
  color: ${TOKENS.textPrimary};
  outline: none;
  box-sizing: border-box;

  &:focus {
    background: #fff;
    border-color: ${TOKENS.accent};
    box-shadow: 0 0 0 4px ${TOKENS.ring};
  }

  &::placeholder {
    color: ${TOKENS.textTertiary};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

/* Buttons */
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
  transition: all 0.2s ease;
  margin-top: 8px;

  &:hover {
    box-shadow: ${TOKENS.shadowBtn};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
    box-shadow: none;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

export const SmallButton = styled.button`
  white-space: nowrap;
  padding: 0 16px;
  height: 44px;
  background: ${TOKENS.cardBg};
  color: ${TOKENS.textPrimary};
  border: 1px solid ${TOKENS.border};
  border-radius: 10px;
  font-weight: 900;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: ${TOKENS.shadowBtn};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
    box-shadow: none;
  }
`;

export const PrevButton = styled.button`
  width: 100%;
  padding: 14px;
  background: transparent;
  color: ${TOKENS.textSecondary};
  border: 1px solid ${TOKENS.border};
  border-radius: 12px;
  font-size: 15px;
  font-weight: 900;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: -6px;

  &:hover {
    color: ${TOKENS.textPrimary};
    box-shadow: ${TOKENS.shadowBtn};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
    box-shadow: none;
  }
`;

/* Toggle */
export const ToggleContainer = styled.div`
  display: flex;
  gap: 8px;
  background: #f9fafb;
  border: 1px solid ${TOKENS.border};
  padding: 4px;
  border-radius: 12px;
`;

export const ToggleButton = styled.button`
  flex: 1;
  padding: 10px;
  border: 1px solid transparent;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 900;
  cursor: pointer;
  transition: all 0.2s ease;

  background: ${props => (props.$active ? TOKENS.accent : 'transparent')};
  color: ${props => (props.$active ? '#fff' : TOKENS.textSecondary)};

  &:hover {
    color: ${props => (props.$active ? '#fff' : TOKENS.textPrimary)};
  }
`;

export const RowGroup = styled.div`
  display: flex;
  gap: 16px;

  > div {
    flex: 1;
  }
`;

/* Link */
export const LoginLink = styled.span`
  display: block;
  text-align: center;
  color: ${TOKENS.textTertiary};
  font-size: 14px;
  margin-top: 24px;
  cursor: pointer;

  &:hover {
    color: ${TOKENS.textPrimary};
    text-decoration: underline;
  }
`;

/* ---------- Profile Image ---------- */
export const ProfileImageSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const ProfileImagePreview = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid ${TOKENS.border};
  background: #f9fafb;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ProfilePlaceholder = styled.div`
  font-size: 32px;
  color: ${TOKENS.textTertiary};
`;

export const ImageUploadButton = styled.button`
  padding: 10px 14px;
  background: ${TOKENS.cardBg};
  color: ${TOKENS.textPrimary};
  border: 1px solid ${TOKENS.border};
  border-radius: 12px;
  font-size: 14px;
  font-weight: 900;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: ${TOKENS.shadowBtn};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
    box-shadow: none;
  }
`;

export const HelperText = styled.p`
  font-size: 12px;
  color: ${TOKENS.textTertiary};
  margin-top: 4px;
`;

/* ✅ 타이머 배지 (인증번호 인풋 뒤/옆 표시) */
export const TimerBadge = styled.div`
  height: 44px;
  min-width: 64px;
  padding: 0 12px;
  border-radius: 10px;
  border: 1px solid ${TOKENS.border};
  background: #f9fafb;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 13px;
  color: ${({ $expired }) => ($expired ? TOKENS.textTertiary : TOKENS.textPrimary)};
`;

/* Unused but kept for compatibility */
export const FormSection = styled.div``;
export const FormCard = styled.div``;
export const Header = styled.div``;
export const LogoWrapper = styled.div``;
export const Title = styled.h1``;
export const SubTitle = styled.p``;
export const Form = styled.form``;
export const Label = styled.label``;
export const Select = styled.select``;
export const Footer = styled.div``;
