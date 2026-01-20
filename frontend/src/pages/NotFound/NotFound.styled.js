import styled from 'styled-components';

export const MainContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%);
  padding: 40px 20px;
`;

export const ContentWrapper = styled.div`
  max-width: 800px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 24px;
`;

export const ErrorImageContainer = styled.div`
  margin-bottom: 20px;
  animation: float 3s ease-in-out infinite;

  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
  }
`;

export const TeamImage = styled.img`
  width: 280px;
  height: 280px;
  border-radius: 50%;
  object-fit: cover;
  border: 6px solid #ffffff;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
  }
`;

export const ErrorCode = styled.h1`
  font-size: 120px;
  font-weight: 900;
  color: #1e293b;
  margin: 0;
  line-height: 1;
  letter-spacing: -4px;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 80px;
    letter-spacing: -2px;
  }
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 48px;
  margin: 8px 0;

  span {
    animation: bounce 2s ease-in-out infinite;

    &:nth-child(2) {
      animation-delay: 0.2s;
    }
  }

  @keyframes bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

export const ErrorTitle = styled.h2`
  font-size: 32px;
  font-weight: 700;
  color: #1e293b;
  margin: 16px 0 0 0;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

export const ErrorDescription = styled.p`
  font-size: 18px;
  color: #64748b;
  margin: 12px 0;
  line-height: 1.8;
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export const ErrorSubtext = styled.p`
  font-size: 16px;
  color: #94a3b8;
  margin: 8px 0 32px 0;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  margin: 24px 0;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    max-width: 300px;
  }
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 32px;
  font-size: 16px;
  font-weight: 600;
  color: #475569;
  background: #ffffff;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);

  span {
    font-size: 20px;
    transition: transform 0.3s ease;
  }

  &:hover {
    background: #f8fafc;
    border-color: #cbd5e1;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

    span {
      transform: translateX(-4px);
    }
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 12px 24px;
    font-size: 15px;
  }
`;

export const HomeButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 32px;
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(37, 99, 235, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 12px 24px;
    font-size: 15px;
  }
`;

export const HomeIcon = styled.span`
  font-size: 20px;
  transition: transform 0.3s ease;

  ${HomeButton}:hover & {
    transform: scale(1.2) rotate(10deg);
  }
`;

export const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-top: 48px;
  padding-top: 32px;
  border-top: 1px solid #e2e8f0;
  width: 100%;
`;

export const ContactText = styled.p`
  font-size: 15px;
  color: #64748b;
  margin: 0;
  font-weight: 400;
`;

export const ContactLink = styled.a`
  color: #3b82f6;
  font-weight: 600;
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: all 0.2s ease;

  &:hover {
    color: #2563eb;
    border-bottom-color: #2563eb;
  }
`;

export const Copyright = styled.p`
  font-size: 14px;
  color: #94a3b8;
  margin: 0;
  font-weight: 400;
`;