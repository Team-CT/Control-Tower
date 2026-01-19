import styled from 'styled-components';

export const MainContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #F8F9FA;
  padding: 32px 48px;

  @media (max-width: 1024px) {
    padding: 24px;
  }
`;

export const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

export const PageHeader = styled.div`
  margin-bottom: 32px;
`;

export const PageTitle = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #1A1A1A;
  margin: 0 0 8px 0;
`;

export const PageSubtitle = styled.p`
  font-size: 15px;
  color: #6B7280;
  margin: 0;
`;

export const InfoNotice = styled.div`
  background: linear-gradient(135deg, #EBF5FF 0%, #F0F9FF 100%);
  border: 1.5px solid #BFDBFE;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  gap: 16px;
  margin-bottom: 32px;
`;

export const NoticeIcon = styled.div`
  font-size: 24px;
  line-height: 1;
  flex-shrink: 0;
`;

export const NoticeContent = styled.div`
  flex: 1;
`;

export const NoticeTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #1E40AF;
  margin-bottom: 12px;
`;

export const NoticeList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const NoticeItem = styled.li`
  font-size: 14px;
  color: #1E40AF;
  line-height: 1.6;
  padding-left: 20px;
  position: relative;

  &:before {
    content: '•';
    position: absolute;
    left: 8px;
    font-weight: 700;
  }
`;

export const FormContainer = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  margin-bottom: 24px;
`;

export const FormSection = styled.div`
  padding: 28px 32px;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`;

export const SectionHeader = styled.div`
  margin-bottom: 20px;
`;

export const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: #1A1A1A;
  margin: 0;
`;

export const UploadMethodSection = styled.div`
  width: 100%;
`;

export const UploadOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const UploadOption = styled.button`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 24px;
  background: ${props => props.selected ? '#EBF5FF' : '#F9FAFB'};
  border: 2px solid ${props => props.selected ? '#1E88E5' : '#E5E7EB'};
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;

  &:hover {
    background: ${props => props.selected ? '#DBEAFE' : '#F3F4F6'};
    border-color: ${props => props.selected ? '#1565C0' : '#1E88E5'};
  }
`;

export const UploadIcon = styled.div`
  font-size: 32px;
  line-height: 1;
  flex-shrink: 0;
`;

export const UploadOptionContent = styled.div`
  flex: 1;
`;

export const UploadOptionTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #1A1A1A;
  margin-bottom: 4px;
`;

export const UploadOptionDescription = styled.div`
  font-size: 13px;
  color: #6B7280;
`;

export const FormGroup = styled.div`
  width: 100%;
`;

export const FormLabel = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
`;

export const FormInput = styled.input`
  width: 100%;
  padding: 14px 16px;
  border: 1.5px solid #E5E7EB;
  border-radius: 8px;
  font-size: 15px;
  color: #1A1A1A;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #1E88E5;
  }

  &::placeholder {
    color: #9CA3AF;
  }
`;

export const FormTextArea = styled.textarea`
  width: 100%;
  padding: 16px;
  border: 1.5px solid #E5E7EB;
  border-radius: 8px;
  font-size: 15px;
  color: #1A1A1A;
  line-height: 1.6;
  resize: vertical;
  font-family: inherit;
  transition: border-color 0.2s;
  min-height: 300px;

  &:focus {
    outline: none;
    border-color: #1E88E5;
  }

  &::placeholder {
    color: #9CA3AF;
  }

  &:disabled {
    background-color: #F9FAFB;
    cursor: not-allowed;
  }
`;

export const CharacterCounter = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 8px;
  font-size: 13px;
  color: #6B7280;
`;

export const FormActions = styled.div`
  padding: 24px 32px;
  background: #F9FAFB;
  display: flex;
  justify-content: flex-end;
  gap: 12px;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    
    button {
      width: 100%;
    }
  }
`;

export const ResetButton = styled.button`
  padding: 14px 32px;
  background: white;
  color: #374151;
  border: 1.5px solid #E5E7EB;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #F9FAFB;
    border-color: #D1D5DB;
  }
`;

export const SubmitButton = styled.button`
  padding: 14px 32px;
  background: #1E88E5;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: center;

  &:hover {
    background: #1565C0;
  }

  &:disabled {
    background: #D1D5DB;
    cursor: not-allowed;
  }
`;

export const GuideSection = styled.div`
  background: #FFFBEB;
  border: 1.5px solid #FDE68A;
  border-radius: 12px;
  padding: 28px;
`;

export const GuideTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #92400E;
  margin: 0 0 20px 0;
`;

export const GuideList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const GuideItem = styled.div`
  display: flex;
  gap: 16px;
  align-items: flex-start;
`;

export const GuideNumber = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #FCD34D;
  color: #92400E;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: 700;
  flex-shrink: 0;
`;

export const GuideContent = styled.div`
  flex: 1;
`;

export const GuideItemTitle = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #92400E;
  margin-bottom: 6px;
`;

export const GuideItemDescription = styled.div`
  font-size: 14px;
  color: #B45309;
  line-height: 1.5;
`;