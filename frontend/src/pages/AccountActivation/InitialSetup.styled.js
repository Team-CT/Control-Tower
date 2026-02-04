import styled from 'styled-components';

export const MainContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%);
  padding: 60px 40px;
  display: flex;
  justify-content: center;
  align-items: flex-start;

  @media (max-width: 1024px) {
    padding: 40px 20px;
  }
`;

export const ContentWrapper = styled.div`
  width: 100%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const Header = styled.header`
  width: 100%;
`;

export const StepIndicator = styled.div`
  display: flex;
  justify-content: center;
  gap: 80px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    gap: 40px;
  }
`;

export const Step = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  opacity: ${props => props.$active ? 1 : props.$completed ? 0.7 : 0.4};
  transition: opacity 0.3s ease;
`;

export const StepNumber = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.theme?.primary || '#2563eb'};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 600;
`;

export const StepLabel = styled.span`
  font-size: 15px;
  font-weight: 500;
  color: #1f2937;
`;

export const FormCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 60px 80px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);

  @media (max-width: 1024px) {
    padding: 40px;
  }

  @media (max-width: 768px) {
    padding: 32px 24px;
  }
`;

export const IconWrapper = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto 24px;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Icon = styled.div`
  font-size: 40px;
`;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #111827;
  text-align: center;
  margin-bottom: 12px;
`;

export const Subtitle = styled.p`
  font-size: 16px;
  color: #6b7280;
  text-align: center;
  margin-bottom: 48px;
  line-height: 1.6;
`;

export const Section = styled.section`
  margin-bottom: 40px;
  padding-bottom: 40px;
  border-bottom: 1px solid #e5e7eb;

  &:last-of-type {
    border-bottom: none;
    margin-bottom: 0;
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
`;

export const SectionNumber = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #3b82f6;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
`;

export const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #111827;
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 12px;
`;

export const LabelIcon = styled.span`
  font-size: 16px;
`;

export const LogoUploadSection = styled.div`
  margin-bottom: 24px;
`;

export const LogoUploadArea = styled.div`
  display: flex;
  gap: 24px;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const UploadBox = styled.div`
  width: 200px;
  height: 200px;
  border: 2px dashed #d1d5db;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #f9fafb;

  &:hover {
    border-color: #3b82f6;
    background: #eff6ff;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const UploadIcon = styled.div`
  font-size: 40px;
  margin-bottom: 12px;
`;

export const UploadText = styled.div`
  font-size: 14px;
  color: #6b7280;
  text-align: center;
`;

export const UploadGuide = styled.div`
  flex: 1;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 20px;
`;

export const GuideTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 12px;
`;

export const GuideItem = styled.div`
  font-size: 13px;
  color: #6b7280;
  margin-bottom: 6px;
  line-height: 1.5;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const InputField = styled.div`
  margin-bottom: 20px;
  display: flex;
  gap: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const Input = styled.input`
  flex: 1;
  height: 48px;
  padding: 0 16px;
  border: 1.5px solid #d1d5db;
  border-radius: 8px;
  font-size: 15px;
  color: #111827;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

export const Select = styled.select`
  width: 100%;
  height: 48px;
  padding: 0 16px;
  border: 1.5px solid #d1d5db;
  border-radius: 8px;
  font-size: 15px;
  color: #111827;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

export const DepartmentInputWrapper = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 16px;
`;

export const DepartmentIconWrapper = styled.div`
  width: 48px;
  height: 48px;
  background: #eff6ff;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const DepartmentIcon = styled.div`
  font-size: 24px;
`;

export const AddButton = styled.button`
  height: 48px;
  padding: 0 24px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;

  &:hover {
    background: #2563eb;
  }
`;

export const PositionDropdown = styled.select`
  width: 120px;
  height: 48px;
  padding: 0 12px;
  border: 1.5px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  color: #111827;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

export const Description = styled.p`
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 20px;
  line-height: 1.6;
`;

export const BulkUploadInfo = styled.div`
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 24px;
`;

export const InfoIcon = styled.div`
  font-size: 24px;
  margin-bottom: 8px;
`;

export const InfoTitle = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #1e40af;
  margin-bottom: 12px;
`;

export const InfoList = styled.div`
  margin-bottom: 16px;
`;

export const InfoItem = styled.div`
  font-size: 13px;
  color: #3b82f6;
  margin-bottom: 6px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const TemplateButton = styled.button`
  padding: 8px 16px;
  background: white;
  border: 1px solid #3b82f6;
  color: #3b82f6;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #eff6ff;
  }
`;

export const FileUploadArea = styled.div`
  margin-bottom: 24px;
`;

export const UploadDropZone = styled.div`
  width: 100%;
  min-height: 200px;
  border: 2px dashed #d1d5db;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #f9fafb;
  padding: 40px 20px;

  &:hover {
    border-color: #3b82f6;
    background: #eff6ff;
  }
`;

export const UploadMainText = styled.div`
  font-size: 15px;
  color: #111827;
  font-weight: 500;
  margin-bottom: 8px;
  text-align: center;
`;

export const UploadSubText = styled.div`
  font-size: 13px;
  color: #6b7280;
`;

export const WarningBox = styled.div`
  background: #fffbeb;
  border: 1px solid #fcd34d;
  border-radius: 12px;
  padding: 20px;
`;

export const WarningIcon = styled.div`
  font-size: 20px;
  margin-bottom: 8px;
`;

export const WarningTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #92400e;
  margin-bottom: 12px;
`;

export const WarningList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const WarningItem = styled.li`
  font-size: 13px;
  color: #78350f;
  margin-bottom: 6px;
  padding-left: 16px;
  position: relative;

  &:before {
    content: '•';
    position: absolute;
    left: 0;
    font-weight: 700;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  height: 56px;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 32px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(59, 130, 246, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;