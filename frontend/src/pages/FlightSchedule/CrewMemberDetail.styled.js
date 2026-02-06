import styled from "styled-components";

/**
 * ✅ 이 페이지는 Layout(사이드바/탑바) 바깥을 책임지지 않음.
 * ✅ MainLayout 내부에서 렌더링되는 "컨텐츠"만 스타일링.
 */

/* ==================== Page Container ==================== */
export const PageContainer = styled.div`
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  padding: 32px 48px;

  @media (max-width: 1440px) {
    padding: 24px 32px;
  }

  @media (max-width: 1024px) {
    padding: 20px 24px;
  }
`;

/* ==================== Header ==================== */
export const PageHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 28px;

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 12px;
  }
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
`;

export const BackButton = styled.button`
  width: 40px;
  height: 40px;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 18px;
  transition: all 0.2s;

  &:hover {
    background-color: #f3f4f6;
    border-color: #3b82f6;
  }
`;

export const BreadcrumbText = styled.p`
  font-size: 14px;
  color: #6b7280;
  margin: 0 0 4px 0;
`;

export const PageTitle = styled.h1`
  font-size: 28px;
  font-weight: 800;
  color: #111827;
  margin: 0;
`;

export const PageSubtitle = styled.p`
  font-size: 15px;
  color: #6b7280;
  margin: 4px 0 0 0;
`;

/* ==================== Profile Card ==================== */
export const ProfileCard = styled.div`
  background-color: #ffffff;
  border-radius: 14px;
  padding: 32px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  margin-bottom: 24px;

  @media (max-width: 1024px) {
    padding: 24px;
  }
`;

export const ProfileHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 28px;
  padding-bottom: 22px;
  border-bottom: 1px solid #e5e7eb;

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

export const ProfileLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const ProfileAvatar = styled.div`
  width: 80px;
  height: 80px;
  background-color: ${(props) => props.$bgColor || "#3b82f6"};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-weight: 800;
  color: #ffffff;
  flex-shrink: 0;
`;

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ProfileName = styled.h2`
  font-size: 24px;
  font-weight: 800;
  color: #111827;
  margin: 0;
`;

export const ProfileMetadata = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
`;

export const MetadataItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const MetadataLabel = styled.span`
  font-size: 12px;
  color: #6b7280;
`;

export const MetadataValue = styled.span`
  font-size: 15px;
  font-weight: 700;
  color: #111827;
`;

export const MetadataDivider = styled.span`
  color: #d1d5db;
  font-size: 14px;
`;

export const ProfileRight = styled.div`
  display: flex;
  align-items: center;
`;

export const EditButton = styled.button`
  padding: 10px 22px;
  font-size: 14px;
  font-weight: 700;
  color: #ffffff;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  border: none;
  border-radius: 10px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 18px rgba(59, 130, 246, 0.22);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const ProfileDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const DetailRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const DetailLabel = styled.span`
  font-size: 13px;
  color: #6b7280;
  font-weight: 700;
`;

export const DetailValue = styled.span`
  font-size: 15px;
  color: #111827;
  font-weight: 600;
`;

export const StatusBadge = styled.span`
  padding: 6px 14px;
  font-size: 13px;
  font-weight: 800;
  border-radius: 999px;
  width: fit-content;

  background-color: ${(props) =>
    props.$status === "근무 가능" ? "#d1fae5" : "#fee2e2"};
  color: ${(props) =>
    props.$status === "근무 가능" ? "#065f46" : "#991b1b"};
`;

/* ==================== Tabs ==================== */
export const TabsContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  border-bottom: 2px solid #e5e7eb;
`;

export const TabButton = styled.button`
  padding: 12px 24px;
  font-size: 15px;
  font-weight: 800;
  color: ${(props) => (props.$active ? "#2563eb" : "#6b7280")};
  background-color: transparent;
  border: none;
  border-bottom: 2px solid ${(props) => (props.$active ? "#3b82f6" : "transparent")};
  margin-bottom: -2px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: #2563eb;
  }
`;

/* ==================== Leave History ==================== */
export const HistorySection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const LeaveCard = styled.div`
  background-color: #ffffff;
  border-radius: 14px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.2s, transform 0.2s;

  &:hover {
    box-shadow: 0 10px 18px rgba(0, 0, 0, 0.06);
    transform: translateY(-2px);
  }
`;

export const LeaveHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 18px;
`;

export const LeaveIcon = styled.div`
  width: 40px;
  height: 40px;
  background-color: #eff6ff;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
`;

export const LeaveTitle = styled.h3`
  font-size: 18px;
  font-weight: 800;
  color: #111827;
  margin: 0;
  flex: 1;
`;

export const LeaveDate = styled.span`
  font-size: 13px;
  color: #6b7280;
`;

export const LeaveDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const LeaveDetailRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

export const LeaveDetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const LeaveDetailLabel = styled.span`
  font-size: 13px;
  color: #6b7280;
  font-weight: 700;
`;

export const LeaveDetailValue = styled.span`
  font-size: 14px;
  color: #111827;
  font-weight: 600;
`;

export const LeaveStatusBadge = styled.span`
  padding: 6px 12px;
  font-size: 13px;
  font-weight: 800;
  border-radius: 999px;
  background-color: #d1fae5;
  color: #065f46;
  width: fit-content;
`;

export const LeaveDurationBadge = styled.span`
  padding: 6px 12px;
  font-size: 13px;
  font-weight: 800;
  border-radius: 999px;
  background-color: #dbeafe;
  color: #1e40af;
  width: fit-content;
`;

export const LeaveReason = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  background-color: #f9fafb;
  border-radius: 12px;
`;

export const LeaveReasonLabel = styled.span`
  font-size: 13px;
  color: #6b7280;
  font-weight: 800;
`;

export const LeaveReasonText = styled.p`
  font-size: 14px;
  color: #111827;
  margin: 0;
  line-height: 1.6;
`;

/* ==================== Modal ==================== */
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
  border-radius: 14px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  overflow: hidden;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-bottom: 1px solid #e5e7eb;
`;

export const ModalTitle = styled.h2`
  font-size: 20px;
  font-weight: 800;
  color: #111827;
  margin: 0;
`;

export const CloseButton = styled.button`
  width: 32px;
  height: 32px;
  background-color: transparent;
  border: none;
  font-size: 24px;
  color: #6b7280;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  transition: all 0.2s;

  &:hover {
    background-color: #f3f4f6;
    color: #111827;
  }
`;

export const ModalContent = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const FormLabel = styled.label`
  font-size: 14px;
  font-weight: 700;
  color: #374151;
`;

export const FormSelect = styled.select`
  padding: 10px 14px;
  font-size: 14px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background-color: #ffffff;
  color: #111827;
  cursor: pointer;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &:disabled {
    background-color: #f9fafb;
    cursor: not-allowed;
  }
`;

export const FormInput = styled.input`
  padding: 10px 14px;
  font-size: 14px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background-color: #ffffff;
  color: #111827;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &:disabled {
    background-color: #f9fafb;
    cursor: not-allowed;
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

export const FormActions = styled.div`
  display: flex;
  gap: 12px;
  padding: 24px;
  border-top: 1px solid #e5e7eb;
  justify-content: flex-end;
`;

export const CancelButton = styled.button`
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 700;
  color: #6b7280;
  background-color: #ffffff;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background-color: #f9fafb;
    border-color: #9ca3af;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const SubmitButton = styled.button`
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 700;
  color: #ffffff;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 10px 18px rgba(59, 130, 246, 0.22);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;