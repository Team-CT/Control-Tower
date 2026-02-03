import styled from 'styled-components';

export const CardContent = styled.div`
  padding: 16px;
`;

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
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32px;
  gap: 24px;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
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

export const StatsCard = styled.div`
  background: linear-gradient(135deg, #EBF5FF 0%, #DBEAFE 100%);
  border: 1.5px solid #BFDBFE;
  border-radius: 12px;
  padding: 20px 28px;
  display: flex;
  align-items: center;
  gap: 16px;
  min-width: 200px;

  @media (max-width: 1024px) {
    width: 100%;
  }
`;

export const StatsIcon = styled.div`
  font-size: 32px;
  line-height: 1;
`;

export const StatsLabel = styled.div`
  font-size: 13px;
  color: #1E40AF;
  font-weight: 500;
  margin-bottom: 4px;
`;

export const StatsValue = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: #1E40AF;
  line-height: 1;
`;

export const SearchSection = styled.form`
  background: white;
  padding: 20px 24px;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  margin-bottom: 32px;
  display: flex;
  gap: 12px;
  align-items: center;

  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

export const SearchBar = styled.div`
  flex: 1;
  position: relative;
  min-width: 300px;

  @media (max-width: 768px) {
    min-width: 100%;
  }
`;

export const SearchIcon = styled.span`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 18px;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 14px 16px 14px 48px;
  border: 1.5px solid #E5E7EB;
  border-radius: 8px;
  font-size: 15px;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #1E88E5;
  }

  &::placeholder {
    color: #9CA3AF;
  }
`;

export const FilterButton = styled.button`
  width: 48px;
  height: 48px;
  border: 1.5px solid #E5E7EB;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #F3F4F6;
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
  white-space: nowrap;

  &:hover {
    background: #1565C0;
  }
`;

export const HistorySection = styled.div`
  margin-bottom: 32px;
`;

export const HistoryCount = styled.div`
  font-size: 15px;
  color: #6B7280;
  margin-bottom: 16px;
  font-weight: 500;
`;

export const HistoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

export const HistoryCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  border-left: 4px solid ${props => props.hasAdminNote ? '#10B981' : '#E5E7EB'};
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const CardIcon = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: ${props => props.type === 'pdf' ? '#FEE2E2' : '#DBEAFE'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
`;

export const CardTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #1A1A1A;
  margin: 0;
  line-height: 1.4;
`;

export const CardDate = styled.div`
  font-size: 13px;
  color: #6B7280;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const FileAttachment = styled.div`
  background: #F9FAFB;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  padding: 12px 16px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const FileIcon = styled.span`
  font-size: 16px;
`;

export const FileName = styled.span`
  font-size: 14px;
  color: #374151;
  font-weight: 500;
  word-break: break-word;
`;

export const ContentSection = styled.div`
  padding: 16px;
  background: ${props => props.isAdminNote ? '#F0FDF4' : '#F9FAFB'};
  border-radius: 8px;
  margin-top: 12px;
  border: 1px solid ${props => props.isAdminNote ? '#BBF7D0' : '#E5E7EB'};
`;

export const ContentLabel = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: ${props => props.isAdminNote ? '#065F46' : '#1E88E5'};
  margin-bottom: 8px;
`;

export const ContentText = styled.p`
  font-size: 14px;
  color: #4B5563;
  line-height: 1.6;
  margin: 0;
  white-space: pre-line;
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
