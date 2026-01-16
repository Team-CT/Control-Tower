import styled from 'styled-components';

// --- Layout ---
export const PageContainer = styled.div`
  width: 100%;
  min-height: 100%;
  background-color: var(--bg-main);
`;

export const ContentWrapper = styled.div`
  padding: 40px 60px;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    padding: 24px;
  }
`;

// --- Header ---
export const PageHeader = styled.div`
  padding: 40px 60px 20px;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    padding: 24px 24px 10px;
  }
`;

export const Breadcrumb = styled.div`
  font-size: 14px;
  color: #6b7280;
  display: flex;
  gap: 8px;
  margin-bottom: 12px;

  span {
    cursor: pointer;
    &:hover { text-decoration: underline; }
  }

  .current {
    color: #111827;
    font-weight: 600;
    cursor: default;
    &:hover { text-decoration: none; }
  }
`;

export const TitleSection = styled.div`
  h2 {
    font-size: 28px;
    font-weight: 700;
    color: var(--text-main);
    margin-bottom: 8px;
  }
  p {
    font-size: 16px;
    color: var(--text-sub);
  }
`;

// --- Grid Layout ---
export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

// --- Components ---
export const SectionCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  border: 1px solid #e5e7eb;
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  h3 {
    font-size: 18px;
    font-weight: 700;
    color: #111827;
    margin: 0;
  }

  .more-btn {
    background: none;
    border: none;
    color: #6b7280;
    font-size: 13px;
    cursor: pointer;
    &:hover { color: #0064DE; }
  }
`;

export const TypeGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

export const TypeButton = styled.button`
  display: flex;
  align-items: center;
  padding: 24px;
  border: 2px solid ${props => props.$active ? 'var(--primary-color)' : 'var(--border-color)'};
  background-color: ${props => props.$active ? 'var(--primary-light)' : '#ffffff'};
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  text-align: left;

  &:hover {
    border-color: var(--primary-color);
  }

  .icon {
    font-size: 28px;
    margin-right: 16px;
  }

  .text {
    display: flex;
    flex-direction: column;
    gap: 4px;

    strong {
      font-size: 16px;
      color: #111827;
    }
    span {
      font-size: 13px;
      color: #6b7280;
    }
  }

  .check {
    position: absolute;
    top: 16px;
    right: 16px;
    color: #0064DE;
    font-size: 18px;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #374151;

  .req {
    color: #ef4444;
    margin-left: 4px;
  }
`;

export const Input = styled.input`
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 15px;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #0064DE;
    box-shadow: 0 0 0 3px rgba(0, 100, 222, 0.1);
  }
`;

export const TextArea = styled.textarea`
  padding: 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 15px;
  outline: none;
  resize: vertical;
  font-family: inherit;

  &:focus {
    border-color: #0064DE;
    box-shadow: 0 0 0 3px rgba(0, 100, 222, 0.1);
  }
`;

export const InfoBox = styled.div`
  margin-top: 24px;
  background-color: #f9fafb;
  padding: 20px;
  border-radius: 8px;
  
  strong {
    display: block;
    font-size: 14px;
    color: #374151;
    margin-bottom: 8px;
  }

  ul {
    padding-left: 20px;
    margin: 0;
    li {
      font-size: 13px;
      color: #6b7280;
      margin-bottom: 4px;
    }
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid #e5e7eb;
`;

export const CancelButton = styled.button`
  padding: 12px 24px;
  border: 1px solid #d1d5db;
  background: white;
  color: #374151;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  font-size: 15px;

  &:hover {
    background: #f9fafb;
  }
`;

export const SubmitButton = styled.button`
  padding: 12px 32px;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  font-size: 15px;

  &:hover {
    background: var(--primary-hover);
  }
`;

// --- Right Column Styles ---
export const UsageCard = styled(SectionCard)`
  background: linear-gradient(145deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  color: white;
  border: none;
`;

export const UsageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  h3 {
    color: white;
    font-size: 18px;
  }
  .year {
    font-size: 13px;
    opacity: 0.8;
    background: rgba(255,255,255,0.1);
    padding: 4px 8px;
    border-radius: 12px;
  }
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(255,255,255,0.2);
  border-radius: 4px;
  overflow: hidden;
  margin-top: 8px;
`;

export const ProgressFill = styled.div`
  width: ${props => props.width}%;
  height: 100%;
  background: #ffffff;
  border-radius: 4px;
`;

export const StatRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid rgba(255,255,255,0.2);
`;

export const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;

  .label {
    font-size: 12px;
    opacity: 0.8;
  }
  .value {
    font-size: 20px;
    font-weight: 700;
  }
`;

export const HistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const HistoryItem = styled.div`
  padding: 16px;
  background: #f9fafb;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .info {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 6px;

    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .type {
      font-weight: 600;
      color: #111827;
      font-size: 15px;
    }

    .date {
      font-size: 13px;
      color: #6b7280;
    }
  }
`;

export const StatusBadge = styled.span`
  font-size: 12px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 4px;
  
  ${props => {
    switch(props.$status) {
      case '승인': return 'background: #dcfce7; color: #166534;';
      case '반려': return 'background: #fee2e2; color: #991b1b;';
      default: return 'background: #f3f4f6; color: #4b5563;';
    }
  }}
`;