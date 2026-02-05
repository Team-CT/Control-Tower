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
  max-width: 1440px;
  margin: 0 auto;
  width: 100%;
`;

export const PageHeader = styled.div`
  margin-bottom: 32px;
`;

export const HeaderBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 12px;
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

export const ActionBar = styled.div`
  background: white;
  padding: 16px 20px;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  margin-bottom: 24px;
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
`;

export const ActionButton = styled.button`
  padding: 10px 20px;
  background: ${props => props.$active ? '#4F46E5' : '#F3F4F6'};
  color: ${props => props.$active ? 'white' : '#4B5563'};
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  white-space: nowrap;

  &:hover {
    background: ${props => props.$active ? '#4338CA' : '#E5E7EB'};
  }
`;

export const FilterButton = styled.button`
  padding: 10px 20px;
  background: #F3F4F6;
  color: #4B5563;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;

  &:hover {
    background: #E5E7EB;
  }
`;

export const SortButton = styled.button`
  padding: 10px 20px;
  background: #F3F4F6;
  color: #4B5563;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;

  &:hover {
    background: #E5E7EB;
  }
`;

export const SearchBar = styled.div`
  flex: 1;
  min-width: 300px;
  position: relative;

  @media (max-width: 768px) {
    width: 100%;
    min-width: 100%;
  }
`;

export const SearchIcon = styled.span`
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 10px 14px 10px 42px;
  border: 1.5px solid #E5E7EB;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #4F46E5;
  }

  &::placeholder {
    color: #9CA3AF;
  }
`;

export const ProgramList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ProgramCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 28px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  }
`;

export const ProgramHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
  padding-bottom: 20px;
  border-bottom: 1px solid #F3F4F6;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const ParticipantAvatar = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: ${props => props.color || '#4A90E2'};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 700;
  flex-shrink: 0;
`;

export const ParticipantInfo = styled.div`
  flex: 1;
`;

export const ParticipantName = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: #1A1A1A;
`;

export const ParticipantId = styled.span`
  font-size: 14px;
  color: #6B7280;
  font-weight: 500;
`;

export const ParticipantDepartment = styled.div`
  font-size: 14px;
  color: #6B7280;
`;

export const StatusBadge = styled.div`
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
  background: ${props => {
    switch (props.$statusType) {
      case 'warning':
        return '#FEF3C7';
      case 'success':
        return '#D1FAE5';
      case 'info':
        return '#DBEAFE';
      default:
        return '#F3F4F6';
    }
  }};
  color: ${props => {
    switch (props.$statusType) {
      case 'warning':
        return '#92400E';
      case 'success':
        return '#065F46';
      case 'info':
        return '#1E40AF';
      default:
        return '#4B5563';
    }
  }};
`;

export const ProgramContent = styled.div`
  margin-bottom: 24px;
`;

export const SectionLabel = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #6B7280;
  margin-bottom: 8px;
`;

export const ProgramDescription = styled.p`
  font-size: 15px;
  color: #374151;
  line-height: 1.6;
  margin: 0;
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 20px;
  background: #F9FAFB;
  border-radius: 10px;
  margin-bottom: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const StatItem = styled.div`
  text-align: center;
`;

export const StatValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #4F46E5;
  margin-bottom: 6px;
`;

export const StatLabel = styled.div`
  font-size: 13px;
  color: #6B7280;
  font-weight: 500;
`;

export const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const FooterDate = styled.div`
  font-size: 13px;
  color: #6B7280;
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const CardActions = styled.div`
  display: flex;
  gap: 12px;

  @media (max-width: 768px) {
    width: 100%;
    
    button {
      flex: 1;
    }
  }
`;

export const RejectButton = styled.button`
  padding: 12px 28px;
  background: white;
  color: #DC2626;
  border: 1.5px solid #DC2626;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 6px;
  justify-content: center;

  &:hover {
    background: #FEE2E2;
  }
`;

export const ApproveButton = styled.button`
  padding: 12px 28px;
  background: #10B981;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 6px;
  justify-content: center;

  &:hover {
    background: #059669;
  }
`;

export const EmptyState = styled.div`
  background: white;
  border-radius: 12px;
  padding: 80px 20px;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
`;

export const EmptyIcon = styled.div`
  font-size: 64px;
  margin-bottom: 16px;
  opacity: 0.5;
`;

export const EmptyText = styled.p`
  font-size: 16px;
  color: #6B7280;
  margin: 0;
`;

// === Modal Components ===

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 24px;
`;

export const ModalContainer = styled.div`
  background: white;
  border-radius: 12px;
  width: 100%;
  max-width: 600px; // 상세 모달 크기 적절히 조절
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  animation: modalFadeIn 0.2s ease-out;

  @keyframes modalFadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

export const ModalHeader = styled.div`
  padding: 24px 24px 16px;
  border-bottom: 1px solid #E5E7EB;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ModalTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #111827;
  margin: 0;
`;

export const ModalCloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #9CA3AF;
  cursor: pointer;
  padding: 4px;
  
  &:hover {
    color: #4B5563;
  }
`;

export const ModalBody = styled.div`
  padding: 24px;
`;

export const ModalSection = styled.div`
  margin-bottom: 24px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const ModalLabel = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
`;

export const ModalValue = styled.div`
  font-size: 15px;
  color: #111827;
  padding: 10px 12px;
  background: ${props => props.$isBox ? '#F9FAFB' : 'transparent'};
  border: ${props => props.$isBox ? '1px solid #E5E7EB' : 'none'};
  border-radius: 6px;
  
  ${props => props.$grid && `
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  `}
`;

export const InputTextarea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  font-size: 15px;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #4F46E5;
    box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.1);
  }
`;

export const SelectBox = styled.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  font-size: 15px;
  background-color: white;
  
  &:focus {
    outline: none;
    border-color: #4F46E5;
  }
`;

export const ModalFooter = styled.div`
  padding: 16px 24px 24px;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  border-top: 1px solid #E5E7EB;
`;

export const ModalActionButton = styled.button`
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  
  ${props => props.$variant === 'primary' && `
    background: #4F46E5;
    color: white;
    border: none;
    &:hover { background: #4338CA; }
    &:disabled { background: #9CA3AF; cursor: not-allowed; }
  `}

  ${props => props.$variant === 'danger' && `
    background: #DC2626;
    color: white;
    border: none;
    &:hover { background: #B91C1C; }
    &:disabled { background: #F87171; cursor: not-allowed; }
  `}

  ${props => props.$variant === 'secondary' && `
    background: white;
    color: #374151;
    border: 1px solid #D1D5DB;
    &:hover { background: #F3F4F6; }
  `}
`;
