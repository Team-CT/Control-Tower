import styled from 'styled-components';

export const MainContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #f5f7fa;
  padding: 32px 40px;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    padding: 24px 20px;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  gap: 32px;
  max-width: 1600px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 24px;
  }
`;

export const LeftPanel = styled.div`
  flex: 0 0 380px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: 1024px) {
    flex: 1;
  }
`;

export const RightPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
`;

export const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 20px;
  background-color: #4d7cfe;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #3a63e0;
  }

  &:active {
    background-color: #2d4ec2;
  }
`;

export const CodeGroupCard = styled.div`
  background-color: #ffffff;
  border: 1px solid #e0e6ed;
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;

  &:hover {
    border-color: #4d7cfe;
    box-shadow: 0 4px 12px rgba(77, 124, 254, 0.1);
  }
`;

export const CodeGroupCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
`;

export const CodeGroupDeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px 8px;
  font-size: 16px;
  color: #ef4444;
  opacity: 0.6;
  transition: opacity 0.2s;
  z-index: 10;

  &:hover {
    opacity: 1;
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const CodeGroupTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 4px 0;
`;

export const CodeGroupSubtitle = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: #6b7280;
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const CodeGroupLabel = styled.div`
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 8px;
`;

export const CodeCountBadge = styled.div`
  display: inline-block;
  padding: 4px 12px;
  background-color: #eff6ff;
  color: #4d7cfe;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 600;
`;

export const AirlineFilterWrapper = styled.div`
  margin-bottom: 16px;
`;

export const AirlineSelectWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const AirlineSelect = styled.select`
  width: 100%;
  padding: 10px 12px;
  padding-right: 40px;
  border: 1px solid #e0e6ed;
  border-radius: 8px;
  font-size: 14px;
  color: #1a1a1a;
  background-color: #ffffff;
  cursor: pointer;
  transition: border-color 0.2s;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236b7280' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;

  &:focus {
    outline: none;
    border-color: #4d7cfe;
  }

  &:disabled {
    background-color: #f9fafb;
    color: #6b7280;
    cursor: not-allowed;
  }
`;

export const SearchInputWrapper = styled.div`
  position: relative;
  margin-bottom: 24px;
`;

export const SearchIcon = styled.span`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 18px;
  opacity: 0.5;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 12px 16px 12px 48px;
  border: 1px solid #e0e6ed;
  border-radius: 8px;
  font-size: 14px;
  color: #1a1a1a;
  box-sizing: border-box;
  transition: border-color 0.2s;

  &::placeholder {
    color: #9ca3af;
  }

  &:focus {
    outline: none;
    border-color: #4d7cfe;
  }
`;

export const TableWrapper = styled.div`
  background-color: #ffffff;
  border: 1px solid #e0e6ed;
  border-radius: 12px;
  overflow: hidden;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHeader = styled.thead`
  background-color: #f9fafb;
  border-bottom: 1px solid #e0e6ed;
`;

export const TableHeaderCell = styled.th`
  padding: 16px 20px;
  text-align: left;
  font-size: 14px;
  font-weight: 600;
  color: #6b7280;
  white-space: nowrap;

  &:first-child {
    width: 80px;
  }

  &:nth-child(2) {
    width: 120px;
  }

  &:nth-child(5) {
    width: 120px;
  }

  &:last-child {
    width: 100px;
    text-align: center;
  }
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr`
  border-bottom: 1px solid #f3f4f6;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f9fafb;
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const TableCell = styled.td`
  padding: 16px 20px;
  font-size: 14px;
  color: #1a1a1a;
  vertical-align: middle;

  &:last-child {
    text-align: center;
  }
`;

export const CodeLink = styled.a`
  color: #4d7cfe;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const StatusBadge = styled.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 600;
  background-color: ${props => props.$status === '사용' ? '#d1fae5' : '#fee2e2'};
  color: ${props => props.$status === '사용' ? '#059669' : '#dc2626'};
`;

export const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
  margin: 0 4px;
  font-size: 18px;
  opacity: 0.6;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
`;

export const EditIcon = styled.span`
  color: #4d7cfe;
`;

export const DeleteIcon = styled.span`
  color: #ef4444;
`;

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
  padding: 20px;
`;

export const ModalContainer = styled.div`
  background-color: #ffffff;
  border-radius: 16px;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid #e4e7eb;
`;

export const ModalTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: #1a1d1f;
  margin: 0;
`;

export const CloseButton = styled.button`
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  border-radius: 6px;
  font-size: 18px;
  color: #6f767e;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #f1f3f5;
    color: #1a1d1f;
  }
`;

export const ModalContent = styled.div`
  padding: 24px;
  flex-grow: 1;
  overflow-y: auto;
`;

export const FormGroup = styled.div`
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const FormLabel = styled.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #4b5563;
  margin-bottom: 8px;
`;

export const FormInput = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #e0e6ed;
  border-radius: 8px;
  font-size: 14px;
  color: #1a1a1a;
  box-sizing: border-box;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #4d7cfe;
  }

  &:disabled {
    background-color: #f9fafb;
    color: #6b7280;
    cursor: not-allowed;
  }
`;

export const FormTextarea = styled.textarea`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #e0e6ed;
  border-radius: 8px;
  font-size: 14px;
  color: #1a1a1a;
  box-sizing: border-box;
  min-height: 80px;
  resize: vertical;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #4d7cfe;
  }
`;

export const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 20px 24px;
  border-top: 1px solid #e4e7eb;
`;

export const CancelButton = styled.button`
  padding: 10px 20px;
  background-color: #f1f3f5;
  color: #4b5563;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e4e7eb;
  }
`;

export const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #4d7cfe;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #3a63e0;
  }

  &:disabled {
    background-color: #a0c3ff;
    cursor: not-allowed;
  }
`;