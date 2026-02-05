import styled from 'styled-components';

export const MainContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f5f5 0%, #e5e5e5 100%);
  padding: 60px 40px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 1024px) {
    padding: 40px 20px;
  }
`;

export const ContentWrapper = styled.div`
  width: 100%;
  max-width: 600px;
`;

export const SuccessCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 80px 60px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  text-align: center;

  @media (max-width: 768px) {
    padding: 60px 40px;
  }

  @media (max-width: 480px) {
    padding: 40px 24px;
  }
`;

export const IconWrapper = styled.div`
  width: 100px;
  height: 100px;
  margin: 0 auto 32px;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px rgba(16, 185, 129, 0.3);
  animation: scaleIn 0.5s ease-out;

  @keyframes scaleIn {
    0% {
      transform: scale(0);
      opacity: 0;
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

export const CheckIcon = styled.div`
  font-size: 56px;
  color: white;
  font-weight: 700;
`;

export const Title = styled.h1`
  font-size: 36px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

export const Subtitle = styled.p`
  font-size: 16px;
  color: #6b7280;
  line-height: 1.7;
  margin-bottom: 48px;

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

export const InfoCard = styled.div`
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 40px;
  text-align: left;

  @media (max-width: 768px) {
    padding: 24px;
  }
`;

export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
`;

export const InfoLabel = styled.span`
  font-size: 14px;
  color: #6b7280;
  font-weight: 500;
`;

export const InfoValue = styled.span`
  font-size: 15px;
  color: #111827;
  font-weight: 600;
`;

export const Divider = styled.div`
  height: 1px;
  background: #e5e7eb;
  margin: 8px 0;
`;

export const StatusBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 16px;
  background: #d1fae5;
  color: #065f46;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
`;

export const StatusIcon = styled.span`
  font-size: 12px;
`;

export const ActionButton = styled.button`
  width: 100%;
  height: 56px;
  background: linear-gradient(135deg, #4a4a4a 0%, #2a2a2a 100%);
  color: white;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;