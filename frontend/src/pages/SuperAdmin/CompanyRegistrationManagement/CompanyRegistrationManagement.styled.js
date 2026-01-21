import styled from 'styled-components';

// Main Container
export const MainContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #f5f7fa;
  padding: 32px;

  @media (max-width: 1024px) {
    padding: 20px;
  }
`;

export const ContentWrapper = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  width: 100%;
`;

// Page Header
export const PageHeader = styled.div`
  margin-bottom: 32px;
`;

export const PageTitle = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #1a1d1f;
  margin: 0 0 8px 0;
`;

export const PageDescription = styled.p`
  font-size: 15px;
  color: #6f767e;
  margin: 0;
`;

// Search Section
export const SearchSection = styled.div`
  margin-bottom: 24px;
`;

export const SearchInputWrapper = styled.div`
  position: relative;
  max-width: 500px;
`;

export const SearchIcon = styled.span`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 18px;
  color: #9a9fa5;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 14px 16px 14px 48px;
  font-size: 15px;
  border: 1px solid #e4e7eb;
  border-radius: 8px;
  background-color: #ffffff;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #4c6fff;
    box-shadow: 0 0 0 3px rgba(76, 111, 255, 0.1);
  }

  &::placeholder {
    color: #9a9fa5;
  }
`;

// Table
export const TableContainer = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  overflow: hidden;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHead = styled.thead`
  background-color: #f8f9fa;
  border-bottom: 1px solid #e4e7eb;
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr`
  &:not(:last-child) {
    border-bottom: 1px solid #f1f3f5;
  }

  &:hover {
    background-color: #f8f9fa;
  }
`;

export const TableHeader = styled.th`
  padding: 16px 20px;
  text-align: left;
  font-size: 14px;
  font-weight: 600;
  color: #1a1d1f;
  white-space: nowrap;
`;

export const TableCell = styled.td`
  padding: 18px 20px;
  font-size: 14px;
  color: #33373d;
  vertical-align: middle;
`;

export const AirlineName = styled.span`
  font-weight: 600;
  color: #1a1d1f;
`;

// Status Badges
export const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  background-color: ${props => props.status === '완치' ? '#d4f4dd' : '#ffe4e6'};
  color: ${props => props.status === '완치' ? '#0f7a35' : '#dc2626'};
`;

export const DocumentStatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  background-color: ${props => {
    if (props.status === '대기') return '#fff3cd';
    if (props.status === '승인') return '#d4f4dd';
    if (props.status === '반려') return '#ffe4e6';
    return '#f1f3f5';
  }};
  color: ${props => {
    if (props.status === '대기') return '#856404';
    if (props.status === '승인') return '#0f7a35';
    if (props.status === '반려') return '#dc2626';
    return '#6f767e';
  }};
`;

export const ViewDetailButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  color: #4c6fff;
  background-color: transparent;
  border: 1px solid #4c6fff;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #4c6fff;
    color: #ffffff;
  }
`;

// Modal Overlay
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
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);

  @media (max-width: 1024px) {
    max-width: 600px;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 32px;
  border-bottom: 1px solid #e4e7eb;
`;

export const ModalTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #1a1d1f;
  margin: 0;
`;

export const CloseButton = styled.button`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  border-radius: 6px;
  font-size: 20px;
  color: #6f767e;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #f1f3f5;
    color: #1a1d1f;
  }
`;

export const ModalContent = styled.div`
  padding: 32px;
`;

// Progress Section
export const ProgressSection = styled.div`
  background-color: #f8f9fa;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
`;

export const ProgressHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`;

export const ProgressIcon = styled.span`
  font-size: 20px;
`;

export const ProgressTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1a1d1f;
  margin: 0;
  flex: 1;
`;

export const ProgressCount = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #4c6fff;
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: #e4e7eb;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 20px;

  &::after {
    content: '';
    display: block;
    width: ${props => props.progress}%;
    height: 100%;
    background: linear-gradient(90deg, #4c6fff 0%, #6b8aff 100%);
    border-radius: 4px;
    transition: width 0.3s ease;
  }
`;

export const ProgressStepsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const ProgressStep = styled.div`
  display: flex;
  gap: 12px;
  opacity: ${props => props.completed ? 1 : 0.5};
`;

export const StepIcon = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #d4f4dd;
  color: #0f7a35;
  border-radius: 50%;
  font-size: 12px;
  font-weight: 600;
  flex-shrink: 0;
`;

export const StepLabel = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #1a1d1f;
  margin-bottom: 4px;
`;

export const StepDescription = styled.div`
  font-size: 13px;
  color: #6f767e;
`;

// Info Section
export const InfoSection = styled.div`
  margin-bottom: 24px;
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const InfoLabel = styled.label`
  font-size: 13px;
  font-weight: 500;
  color: #6f767e;
`;

export const InfoValue = styled.div`
  font-size: 15px;
  font-weight: 500;
  color: #1a1d1f;
`;

// Verification Box
export const VerificationBox = styled.div`
  background-color: ${props => props.error ? '#fff5f5' : '#f0f9ff'};
  border: 1px solid ${props => props.error ? '#fee2e2' : '#e0f2fe'};
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 24px;
`;

export const VerificationHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`;

export const VerificationIcon = styled.span`
  font-size: 18px;
`;

export const VerificationTitle = styled.h4`
  font-size: 14px;
  font-weight: 600;
  color: #1a1d1f;
  margin: 0;
`;

export const VerificationMessage = styled.p`
  font-size: 14px;
  color: ${props => props.error ? '#dc2626' : props.success ? '#0f7a35' : '#1a1d1f'};
  margin: 0;
  line-height: 1.5;
`;

// Document Section
export const DocumentSection = styled.div`
  margin-bottom: 24px;
`;

export const DocumentTitle = styled.h4`
  font-size: 15px;
  font-weight: 600;
  color: #1a1d1f;
  margin: 0 0 12px 0;
`;

export const DocumentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const DocumentItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background-color: #f8f9fa;
  border-radius: 8px;
`;

export const DocumentIcon = styled.span`
  font-size: 20px;
`;

export const DocumentName = styled.span`
  flex: 1;
  font-size: 14px;
  color: #1a1d1f;
`;
export const DownloadLink = styled.a`
  font-size: 13px;
  font-weight: 500;
  color: #4c6fff;
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: #3651e0;
    text-decoration: underline;
  }
`;

// Status Section
export const StatusSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background-color: #f8f9fa;
  border-radius: 8px;
`;

export const StatusLabel = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #6f767e;
`;

export const StatusBadgeLarge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  background-color: ${props => {
    if (props.status === 'pending') return '#fff3cd';
    if (props.status === 'approved') return '#d4f4dd';
    if (props.status === 'rejected') return '#ffe4e6';
    return '#f1f3f5';
  }};
  color: ${props => {
    if (props.status === 'pending') return '#856404';
    if (props.status === 'approved') return '#0f7a35';
    if (props.status === 'rejected') return '#dc2626';
    return '#6f767e';
  }};
`;

// Modal Footer
export const ModalFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  padding: 20px 32px;
  border-top: 1px solid #e4e7eb;
`;
export const RejectButton = styled.button`
  padding: 12px 24px;
  font-size: 15px;
  font-weight: 600;
  color: #dc2626;
  background-color: transparent;
  border: 1px solid #dc2626;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #dc2626;
    color: #ffffff;
  }
`;

export const ApproveButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 12px 24px;
  font-size: 15px;
  font-weight: 600;
  color: #ffffff;
  background-color: #4c6fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #3651e0;
  }
`;

export const CloseOnlyButton = styled.button`
  padding: 12px 24px;
  font-size: 15px;
  font-weight: 600;
  color: #6f767e;
  background-color: #f1f3f5;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #e4e7eb;
    color: #1a1d1f;
  }
`;