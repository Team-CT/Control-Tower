import styled from 'styled-components';
import { Plane } from 'lucide-react';

/* ---------- Layout ---------- */
export const Container = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.background.main};
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
  background: ${({ theme }) => theme.background.paper || 'white'};
  border-radius: 24px;
  box-shadow: ${({ theme }) => theme.shadow};
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.border};

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

/* ---------- Left : Brand ---------- */
export const BrandSection = styled.div`
  flex: 1;
  background: ${({ theme }) => theme.background.secondary || '#f9fafb'};
  padding: 60px 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-right: 1px solid ${({ theme }) => theme.border};

  @media (max-width: 768px) {
    border-right: none;
    border-bottom: 1px solid ${({ theme }) => theme.border};
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
  color: ${({ theme }) => theme.text.primary};
`;

export const BrandName = styled.h1`
  font-size: 24px;
  font-weight: 900;
  margin: 0;
  color: ${({ theme }) => theme.text.primary};
`;

export const ServiceInfo = styled.div`
  margin-top: 40px;
`;

export const ServiceTitle = styled.h2`
  font-size: 32px;
  font-weight: 900;
  margin: 0 0 12px;
  color: ${({ theme }) => theme.text.primary};
`;

export const ServiceDescription = styled.p`
  font-size: 15px;
  line-height: 1.7;
  color: ${({ theme }) => theme.text.secondary};
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

  background: ${({ $active, theme }) => ($active ? theme.colors.primary : 'transparent')};
  color: ${({ $active, $done, theme }) =>
    $active ? theme.text.inverse : $done ? theme.text.primary : theme.text.tertiary};

  border: ${({ $active, $done, theme }) =>
    $active
      ? '1px solid transparent'
      : $done
        ? `1px solid ${theme.text.primary}40`
        : `1px solid ${theme.border}`};

  transition: all 0.25s ease;
`;

export const StepLine = styled.div`
  flex: 1;
  height: 2px;
  background: ${({ $done, theme }) => ($done ? theme.colors.primary : theme.border)};
  transition: background 0.25s ease;
`;

/* ---------- Right : Register ---------- */
export const RegisterSection = styled.div`
  flex: 1.2;
  background: ${({ theme }) => theme.background.paper || 'white'};
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
  color: ${({ theme }) => theme.text.primary};
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
  color: ${({ theme }) => theme.text.primary};
`;

export const InputRow = styled.div`
  display: flex;
  gap: 8px;
`;

/* Input */
export const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 10px;
  font-size: 15px;
  background: ${({ theme }) => theme.background.input || '#f9fafb'};
  color: ${({ theme }) => theme.text.primary};
  outline: none;
  box-sizing: border-box;

  &:focus {
    background: ${({ theme }) => theme.background.paper || '#fff'};
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 4px ${({ theme }) => `${theme.colors.primary}20`};
  }

  &::placeholder {
    color: ${({ theme }) => theme.text.tertiary};
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
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.text.inverse};
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 900;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 8px;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadowHover || '0 4px 12px rgba(0,0,0,0.12)'};
    transform: translateY(-1px);
    background: ${({ theme }) => theme.colors.primaryHover || theme.colors.primary};
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
  background: ${({ theme }) => theme.background.paper || 'white'};
  color: ${({ theme }) => theme.text.primary};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 10px;
  font-weight: 900;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadowHover || '0 4px 12px rgba(0,0,0,0.12)'};
    transform: translateY(-1px);
    background: ${({ theme }) => theme.background.hover};
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
  color: ${({ theme }) => theme.text.secondary};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  font-size: 15px;
  font-weight: 900;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: -6px;

  &:hover {
    color: ${({ theme }) => theme.text.primary};
    box-shadow: ${({ theme }) => theme.shadowHover || '0 4px 12px rgba(0,0,0,0.12)'};
    transform: translateY(-1px);
    background: ${({ theme }) => theme.background.hover};
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
  background: ${({ theme }) => theme.background.secondary || '#f9fafb'};
  border: 1px solid ${({ theme }) => theme.border};
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

  background: ${({ $active, theme }) => ($active ? theme.colors.primary : 'transparent')};
  color: ${({ $active, theme }) => ($active ? theme.text.inverse : theme.text.secondary)};

  &:hover {
    color: ${({ $active, theme }) => ($active ? theme.text.inverse : theme.text.primary)};
    background: ${({ $active, theme }) => ($active ? theme.colors.primaryHover || theme.colors.primary : theme.background.hover)};
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
  color: ${({ theme }) => theme.text.tertiary};
  font-size: 14px;
  margin-top: 24px;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.text.primary};
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
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.background.secondary || '#f9fafb'};
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
  color: ${({ theme }) => theme.text.tertiary};
`;

export const ImageUploadButton = styled.button`
  padding: 10px 14px;
  background: ${({ theme }) => theme.background.paper || 'white'};
  color: ${({ theme }) => theme.text.primary};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  font-size: 14px;
  font-weight: 900;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadowHover};
    transform: translateY(-1px);
    background: ${({ theme }) => theme.background.hover};
  }

  &:active {
    transform: translateY(0);
    box-shadow: none;
  }
`;

export const HelperText = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.text.tertiary};
  margin-top: 4px;
`;

/* ✅ 타이머 배지 (인증번호 인풋 뒤/옆 표시) */
export const TimerBadge = styled.div`
  height: 44px;
  min-width: 64px;
  padding: 0 12px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.background.secondary || '#f9fafb'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 13px;
  color: ${({ $expired, theme }) => ($expired ? theme.text.tertiary : theme.text.primary)};
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
