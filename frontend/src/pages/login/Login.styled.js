import styled from 'styled-components';
import { 
  User, Lock, ArrowRight, CheckCircle, 
  HelpCircle, Info, Plane, Zap 
} from 'lucide-react'; // 아이콘 라이브러리 활용

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f2f5;
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

// [왼쪽] 브랜드 섹션
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

  /* 배경 패턴 효과 (선택 사항) */
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

// 로고 아이콘 (Plane)
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
  display: flex;
  align-items: center;
  gap: 12px;
`;

// 서비스 아이콘 (Zap)
export const ServiceIcon = styled(Zap)`
  width: 32px;
  height: 32px;
`;

export const ServiceSubtitle = styled.h3`
  font-size: 18px;
  font-weight: 500;
  opacity: 0.9;
  margin-bottom: 24px;
`;

export const ServiceDescription = styled.p`
  font-size: 15px;
  line-height: 1.6;
  opacity: 0.8;
  max-width: 90%;
`;

export const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 1;
`;

export const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  opacity: 0.9;
`;

// 체크 아이콘
export const FeatureCheckIcon = styled(CheckCircle)`
  width: 16px;
  height: 16px;
  color: rgba(255, 255, 255, 0.8);
`;

export const FeatureText = styled.span``;

// [오른쪽] 로그인 섹션
export const LoginSection = styled.div`
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

export const LoginCard = styled.div`
  width: 100%;
  max-width: 400px;
`;

export const LoginHeader = styled.div`
  text-align: left;
  margin-bottom: 40px;
`;

export const LoginTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 12px;
`;

export const LoginSubtitle = styled.p`
  font-size: 15px;
  color: #666;
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
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
  display: flex;
  align-items: center;
  gap: 6px;
`;

// 입력창 아이콘들
export const UserIcon = styled(User)`
  width: 16px;
  height: 16px;
  color: #6b7280;
`;

export const LockIcon = styled(Lock)`
  width: 16px;
  height: 16px;
  color: #6b7280;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 15px;
  transition: all 0.2s;
  outline: none;
  background: #f9fafb;

  &:focus {
    background: white;
    border-color: ${props => props.theme.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.primary}20;
  }

  &::placeholder {
    color: #9ca3af;
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
  cursor: pointer;
`;

export const Checkbox = styled.input`
  width: 16px;
  height: 16px;
  cursor: pointer;
  accent-color: ${props => props.theme.primary};
`;

export const CheckboxLabel = styled.label`
  font-size: 14px;
  color: #4b5563;
  cursor: pointer;
  user-select: none;
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
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 8px;

  &:hover {
    background-color: ${props => props.theme.secondary};
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }

  &:active {
    transform: translateY(0);
  }
`;

// 화살표 아이콘
export const ArrowIcon = styled(ArrowRight)`
  width: 18px;
  height: 18px;
`;

export const FooterLinks = styled.div`
  margin-top: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  font-size: 13px;
  color: #6b7280;
`;

export const FooterLink = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  transition: color 0.2s;
  background: none;
  border: none;
  padding: 0;
  color: inherit;
  font-size: inherit;
  font-family: inherit;

  &:hover {
    color: ${props => props.theme.primary};
    text-decoration: underline;
  }
`;

export const FooterDivider = styled.div`
  width: 1px;
  height: 12px;
  background-color: #e5e7eb;
`;

// 푸터 아이콘들
export const HelpIcon = styled(HelpCircle)`
  width: 14px;
  height: 14px;
`;

export const InfoIcon = styled(Info)`
  width: 14px;
  height: 14px;
`;