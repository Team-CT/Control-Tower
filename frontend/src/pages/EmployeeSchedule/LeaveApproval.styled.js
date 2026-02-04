import styled from 'styled-components';

export const MainContentArea = styled.div`
  flex: 1;
  padding: 40px;
  background-color: #f9fafb;
  overflow-y: auto;
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 30px;
`;

export const StatCard = styled.div`
  background-color: white;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: flex-start;
  gap: 16px;
  border-left: 4px solid ${(props) => props.$bgColor || 'transparent'};
`;

export const StatIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background-color: ${(props) => props.$bgColor || '#f3f4f6'};
  color: ${(props) => props.$color || '#6b7280'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
`;

export const StatInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StatLabel = styled.span`
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 4px;
`;

export const StatValue = styled.span`
  font-size: 24px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 4px;
`;

export const StatSubtext = styled.span`
  font-size: 12px;
  color: #9ca3af;
`;

export const FilterSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

export const FilterTabs = styled.div`
  display: flex;
  background-color: white;
  padding: 4px;
  border-radius: 12px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
`;

export const FilterTab = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  background-color: ${(props) => (props.$active ? '#eff6ff' : 'transparent')};
  color: ${(props) => (props.$active ? '#2563eb' : '#6b7280')};
  font-weight: ${(props) => (props.$active ? '600' : '500')};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) => (props.$active ? '#eff6ff' : '#f9fafb')};
  }
`;

export const TabIcon = styled.span`
  font-size: 16px;
`;

export const TabLabel = styled.span`
  font-size: 14px;
`;

export const SortDropdown = styled.select`
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  color: #374151;
  background-color: white;
  font-size: 14px;
  cursor: pointer;
  outline: none;

  &:focus {
    border-color: #2563eb;
  }
`;

export const ApprovalListSection = styled.div`
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

export const ListHeader = styled.div`
  padding: 20px 24px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ListTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: #111827;
  margin: 0;
`;

export const SortButton = styled.button`
  color: #6b7280;
  background: none;
  border: none;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;

  &:hover {
    color: #111827;
  }
`;

export const ApprovalList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ApprovalItem = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #f3f4f6;
  transition: background-color 0.2s;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #f9fafb;
  }
`;

export const ApprovalAvatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background-color: ${(props) => props.$color || '#e5e7eb'};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 18px;
  margin-right: 16px;
`;

export const ApprovalInfo = styled.div`
  flex: 1;
`;

export const ApprovalName = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 4px;
`;

export const ApprovalDepartment = styled.div`
  font-size: 13px;
  color: #6b7280;
`;

export const ApprovalDetails = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  gap: 24px;
`;

export const ApprovalType = styled.span`
  padding: 4px 12px;
  border-radius: 9999px;
  font-size: 13px;
  font-weight: 600;
  
  ${(props) => {
    switch (props.$type) {
      case 'annual':
        return `background-color: #dbeafe; color: #2563eb;`;
      case 'sick':
        return `background-color: #f3e8ff; color: #7c3aed;`;
      case 'half':
        return `background-color: #ffedd5; color: #c2410c;`;
      default:
        return `background-color: #f3f4f6; color: #4b5563;`;
    }
  }}
`;

export const ApprovalDate = styled.div`
  font-size: 14px;
  color: #374151;
  font-weight: 500;
`;

export const ApprovalPeriod = styled.div`
  font-size: 13px;
  color: #6b7280;
  background-color: #f9fafb;
  padding: 4px 8px;
  border-radius: 6px;
`;

export const ApprovalActions = styled.div`
  display: flex;
  gap: 8px;
`;

export const ViewButton = styled.button`
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background-color: white;
  color: #374151;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #f9fafb;
    border-color: #d1d5db;
  }
`;

export const ApproveButton = styled.button`
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  background-color: #10b981;
  color: white;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #059669;
  }
`;

export const RejectButton = styled.button`
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  background-color: #ef4444;
  color: white;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #dc2626;
  }
`;

/* ----- 모달 스타일 (추가됨) ----- */
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 30px;
  border-radius: 12px;
  width: 500px;
  max-width: 90%;
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
  
  h2 {
    margin-bottom: 20px;
    font-size: 1.5rem;
    color: #333;
  }
`;

export const DetailRow = styled.div`
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  
  label {
    font-weight: bold;
    color: #555;
    margin-bottom: 5px;
  }
  
  span, p {
    font-size: 1rem;
    color: #333;
  }
  
  p {
    background: #f9f9f9;
    padding: 10px;
    border-radius: 5px;
    min-height: 60px;
    margin-top: 0;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

export const CloseButton = styled.button`
  padding: 10px 20px;
  background: #e5e7eb;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  
  &:hover {
    background: #d1d5db;
  }
`;