import styled from 'styled-components';
import { Plane } from 'lucide-react';

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f7fa;
  padding: 20px;
`;

export const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 1000px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  min-height: 600px;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
  }
`;

// 왼쪽 브랜드 섹션
export const BrandSection = styled.div`
  flex: 1;
  background: ${props => `linear-gradient(135deg, ${props.theme.primary} 0%, ${props.theme.secondary} 100%)`};
  padding: 60px 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: white;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 60%);
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: 40px 30px;
    min-height: 300px;
  }
`;

export const BrandHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  z-index: 1;
`;

export const LogoIcon = styled(Plane)`
  width: 32px;
  height: 32px;
  transform: rotate(-45deg);
`;

export const BrandName = styled.h1`
  font-size: 24px;
  font-weight: 800;
  letter-spacing: 0.5px;
`;

export const ServiceInfo = styled.div`
  z-index: 1;
  margin-top: 40px;
`;

export const ServiceTitle = styled.h2`
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 12px;
`;

export const ServiceDescription = styled.p`
  font-size: 15px;
  line-height: 1.6;
  opacity: 0.9;
  max-width: 90%;
`;

export const Stepper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  z-index: 1;
  margin-top: 40px;
`;

export const Step = styled.div`
  font-size: 14px;
  font-weight: 600;
  opacity: ${props => props.$active ? 1 : 0.5};
  transition: opacity 0.3s;
`;

export const StepLine = styled.div`
  flex: 1;
  height: 2px;
  background: rgba(255, 255, 255, 0.3);
`;

// 오른쪽 폼 섹션
export const RegisterSection = styled.div`  // Rename FormSection to RegisterSection to match import
  flex: 1.2;
  background: white;
  padding: 60px 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 40px 24px;
  }
`;

export const RegisterCard = styled.div`
  width: 100%;
  max-width: 400px;
`;

// This was Header, renamed to RegisterHeader to match usage
export const RegisterHeader = styled.div` 
  text-align: left;
  margin-bottom: 32px;
`;

export const RegisterTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 8px;
`;

export const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const InputLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #374151;
`;

export const InputRow = styled.div`
  display: flex;
  gap: 8px;
`;

// [테마 적용] 입력창
export const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 15px;
  transition: all 0.2s;
  outline: none;
  box-sizing: border-box; 

  &:focus {
    border-color: ${props => props.theme.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.primary}20;
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 14px;
  background-color: ${props => props.theme.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 12px;

  &:hover {
    background-color: ${props => props.theme.secondary};
  }
`;

export const SmallButton = styled.button`
  white-space: nowrap;
  padding: 0 20px;
  background-color: #f3f4f6;
  color: #4b5563;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #e5e7eb;
    color: #1f2937;
  }
`;

export const PrevButton = styled.button`
  width: 100%;
  padding: 14px;
  background-color: transparent;
  color: #6b7280;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: -8px;

  &:hover {
    background-color: #f9fafb;
    color: #374151;
  }
`;

export const ToggleContainer = styled.div`
  display: flex;
  gap: 8px;
  background: #f3f4f6;
  padding: 4px;
  border-radius: 12px;
`;

export const ToggleButton = styled.button`
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  background-color: ${props => props.$active ? 'white' : 'transparent'};
  color: ${props => props.$active ? props.$color : '#6b7280'};
  box-shadow: ${props => props.$active ? '0 2px 8px rgba(0,0,0,0.1)' : 'none'};

  &:hover {
    color: ${props => !props.$active && '#374151'};
  }
`;

export const RowGroup = styled.div`
  display: flex;
  gap: 16px;
  
  > div {
    flex: 1;
  }
`;

export const LoginLink = styled.span`
  display: block;
  text-align: center;
  color: #6b7280;
  font-size: 14px;
  margin-top: 24px;
  cursor: pointer;
  
  &:hover {
    color: ${props => props.theme.primary};
    text-decoration: underline;
  }
`;

// Unused but kept for compatibility if needed elsewhere or strictly following older file
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