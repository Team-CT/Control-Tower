import styled from 'styled-components';

export const MainContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%);
  padding: 60px 80px;

  @media (max-width: 1024px) {
    padding: 40px 24px;
  }
`;

export const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 60px;
`;

export const HeaderIcon = styled.div`
  width: 72px;
  height: 72px;
  background: linear-gradient(135deg, #4A90E2 0%, #357ABD 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  box-shadow: 0 8px 24px rgba(74, 144, 226, 0.3);
`;

export const BuildingIcon = styled.div`
  width: 36px;
  height: 36px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='white' viewBox='0 0 24 24'%3E%3Cpath d='M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z'/%3E%3C/svg%3E");
  background-size: contain;
`;

export const PageTitle = styled.h1`
  font-size: 36px;
  font-weight: 700;
  color: #1a2332;
  margin-bottom: 12px;
`;

export const PageSubtitle = styled.p`
  font-size: 16px;
  color: #64748b;
`;

export const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 40px;
  max-width: 1600px;
  margin: 0 auto;

  @media (max-width: 1280px) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`;

export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const FormCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  }
`;

export const StepHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
  padding-bottom: 20px;
  border-bottom: 2px solid #f1f5f9;
`;

export const StepNumber = styled.div`
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #4A90E2 0%, #357ABD 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 700;
  flex-shrink: 0;
`;

export const StepTitle = styled.h2`
  font-size: 22px;
  font-weight: 700;
  color: #1a2332;
  margin: 0;
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  grid-column: ${props => props.$fullWidth ? 'span 2' : 'span 1'};

  @media (max-width: 768px) {
    grid-column: span 1;
  }
`;

export const Label = styled.label`
  font-size: 15px;
  font-weight: 600;
  color: #334155;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Required = styled.span`
  color: #ef4444;
`;

export const Input = styled.input`
  width: 100%;
  height: 48px;
  padding: 0 16px;
  border: 1.5px solid #e2e8f0;
  border-radius: 10px;
  font-size: 15px;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #4A90E2;
    box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

export const Select = styled.select`
  width: 100%;
  height: 48px;
  padding: 0 16px;
  border: 1.5px solid #e2e8f0;
  border-radius: 10px;
  font-size: 15px;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #4A90E2;
    box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
  }
`;

export const DomainInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0;
  border: 1.5px solid #e2e8f0;
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.2s ease;

  &:focus-within {
    border-color: #4A90E2;
    box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
  }
`;

export const DomainPrefix = styled.span`
  background: #f8fafc;
  padding: 0 16px;
  height: 48px;
  display: flex;
  align-items: center;
  font-size: 15px;
  color: #64748b;
  border-right: 1.5px solid #e2e8f0;
  font-weight: 600;
`;

export const HelperText = styled.span`
  font-size: 13px;
  color: #64748b;
  margin-top: -4px;
`;

export const Textarea = styled.textarea`
  width: 100%;
  padding: 16px;
  border: 1.5px solid #e2e8f0;
  border-radius: 10px;
  font-size: 15px;
  font-family: inherit;
  resize: vertical;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #4A90E2;
    box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

export const DocumentDescription = styled.p`
  font-size: 14px;
  color: #64748b;
  margin: -16px 0 24px 0;
`;

export const FileUploadArea = styled.label`
  width: 100%;
  min-height: 140px;
  border: 2px dashed #cbd5e1;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #fafbfc;

  &:hover {
    border-color: #4A90E2;
    background: #f0f7ff;
  }
`;

export const UploadIcon = styled.div`
  width: 48px;
  height: 48px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%234A90E2' viewBox='0 0 24 24'%3E%3Cpath d='M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z'/%3E%3C/svg%3E");
  background-size: contain;
`;

export const UploadText = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #334155;
`;

export const UploadSubtext = styled.span`
  font-size: 13px;
  color: #94a3b8;
`;

export const InfoSection = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const InfoCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
`;

export const InfoIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
`;

export const InfoTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #1a2332;
  margin-bottom: 20px;
`;

export const InfoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const InfoItem = styled.li`
  font-size: 14px;
  line-height: 1.7;
  color: #475569;
  padding-left: 4px;
`;

export const SubmitButton = styled.button`
  width: 100%;
  height: 56px;
  background: linear-gradient(135deg, #4A90E2 0%, #357ABD 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 17px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(74, 144, 226, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(74, 144, 226, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const Footer = styled.footer`
  max-width: 1600px;
  margin: 60px auto 0;
  padding-top: 40px;
  border-top: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
  }
`;

export const Copyright = styled.p`
  font-size: 14px;
  color: #64748b;
`;

export const FooterLinks = styled.div`
  display: flex;
  gap: 24px;
`;

export const FooterLink = styled.a`
  font-size: 14px;
  color: #4A90E2;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

// 아이콘들 (간단한 SVG 대체)
export const BuildingSmallIcon = styled.div`
  width: 18px;
  height: 18px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%234A90E2' viewBox='0 0 24 24'%3E%3Cpath d='M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z'/%3E%3C/svg%3E");
  background-size: contain;
`;

export const GlobeIcon = styled(BuildingSmallIcon)`
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%234A90E2' viewBox='0 0 24 24'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z'/%3E%3C/svg%3E");
`;

export const DomainIcon = styled(BuildingSmallIcon)`
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%234A90E2' viewBox='0 0 24 24'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z'/%3E%3C/svg%3E");
`;

export const PhoneIcon = styled(BuildingSmallIcon)`
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%234A90E2' viewBox='0 0 24 24'%3E%3Cpath d='M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z'/%3E%3C/svg%3E");
`;

export const EmailIcon = styled(BuildingSmallIcon)`
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%234A90E2' viewBox='0 0 24 24'%3E%3Cpath d='M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z'/%3E%3C/svg%3E");
`;

export const DocumentIcon = styled(BuildingSmallIcon)`
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%234A90E2' viewBox='0 0 24 24'%3E%3Cpath d='M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z'/%3E%3C/svg%3E");
`;