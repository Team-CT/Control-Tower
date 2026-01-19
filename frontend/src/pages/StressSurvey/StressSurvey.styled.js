import styled from 'styled-components';

// Main Container
export const MainContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 40px;

  @media (max-width: 1024px) {
    padding: 24px 20px;
  }
`;

// Survey Header
export const SurveyHeader = styled.div`
  background: linear-gradient(135deg, #4a90c2 0%, #6bb3e0 100%);
  border-radius: 16px;
  padding: 40px;
  color: white;
  margin-bottom: 32px;
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 1024px) {
    padding: 30px;
    flex-direction: column;
    text-align: center;
  }
`;

export const HeaderIcon = styled.i`
  font-size: 2.5rem;
  opacity: 0.9;
`;

export const HeaderContent = styled.div`
  flex: 1;
`;

export const HeaderTitle = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 8px;

  @media (max-width: 1024px) {
    font-size: 1.5rem;
  }
`;

export const HeaderDescription = styled.p`
  font-size: 1rem;
  opacity: 0.9;
  line-height: 1.6;
`;

// Progress Bar
export const ProgressBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 40px;
  position: relative;
  padding: 0 50px;

  @media (max-width: 1024px) {
    padding: 0 20px;
  }
`;

export const ProgressLine = styled.div`
  position: absolute;
  top: 20px;
  left: 80px;
  right: 80px;
  height: 3px;
  background: #e5e7eb;
  z-index: 0;

  @media (max-width: 1024px) {
    left: 50px;
    right: 50px;
  }
`;

export const ProgressStep = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: ${props => props.$active || props.$completed ? 'pointer' : 'default'};
  z-index: 1;
  opacity: ${props => props.$active || props.$completed ? 1 : 0.6};
  transition: all 0.3s ease;

  &:hover {
    opacity: ${props => props.$active || props.$completed ? 0.8 : 0.6};
  }
`;

export const StepCircle = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${props => 
    props.$completed ? '#10b981' : 
    props.$active ? 'linear-gradient(135deg, #4a90c2 0%, #6bb3e0 100%)' : 
    '#e5e7eb'
  };
  color: ${props => props.$active || props.$completed ? 'white' : '#9ca3af'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.125rem;
  font-weight: 700;
  margin-bottom: 12px;
  transition: all 0.3s ease;
  box-shadow: ${props => props.$active ? '0 4px 12px rgba(74, 144, 194, 0.3)' : 'none'};
`;

export const StepLabel = styled.span`
  font-size: 0.875rem;
  color: ${props => props.$active || props.$completed ? '#1f2937' : '#9ca3af'};
  font-weight: ${props => props.$active || props.$completed ? '600' : '400'};
  text-align: center;
  white-space: nowrap;
`;

// Survey Card
export const SurveyCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 48px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  animation: fadeIn 0.4s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 1024px) {
    padding: 32px 24px;
  }
`;

// Role Badge
export const RoleBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #dbeafe;
  color: #1e40af;
  padding: 10px 20px;
  border-radius: 24px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 24px;

  i {
    font-size: 1rem;
  }
`;

// Section Header
export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
  padding-bottom: 20px;
  border-bottom: 2px solid #f3f4f6;
`;

export const SectionIcon = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 14px;
  background: ${props => {
    switch(props.$color) {
      case 'green': return 'linear-gradient(135deg, #10b981 0%, #34d399 100%)';
      case 'purple': return 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)';
      case 'orange': return 'linear-gradient(135deg, #f97316 0%, #fb923c 100%)';
      default: return 'linear-gradient(135deg, #4a90c2 0%, #6bb3e0 100%)';
    }
  }};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  flex-shrink: 0;
`;

export const SectionInfo = styled.div`
  flex: 1;
`;

export const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 6px;

  @media (max-width: 1024px) {
    font-size: 1.25rem;
  }
`;

export const SectionDescription = styled.p`
  font-size: 0.95rem;
  color: #6b7280;
`;

// Info Grid (Step 1)
export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 32px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const InfoItem = styled.div`
  background: #f9fafb;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
`;

export const InfoLabel = styled.label`
  display: block;
  font-size: 0.85rem;
  color: #6b7280;
  margin-bottom: 6px;
  font-weight: 500;
`;

export const InfoValue = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  color: #1f2937;
`;

// Notice Box
export const NoticeBox = styled.div`
  background: #fef3c7;
  border: 1px solid #f59e0b;
  border-radius: 12px;
  padding: 24px;
  margin-top: 32px;
`;

export const NoticeTitle = styled.h4`
  color: #b45309;
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;

  i {
    font-size: 1.1rem;
  }
`;

export const NoticeList = styled.ul`
  color: #92400e;
  font-size: 0.95rem;
  padding-left: 24px;
  line-height: 1.8;

  li {
    margin-bottom: 6px;
  }
`;

// Stats Grid
export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const StatBox = styled.div`
  background: #f9fafb;
  border-radius: 12px;
  padding: 32px;
  text-align: center;
  border: 1px solid #e5e7eb;
`;

export const StatValue = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${props => {
    switch(props.$color) {
      case 'green': return '#10b981';
      case 'purple': return '#8b5cf6';
      case 'orange': return '#f97316';
      default: return '#4a90c2';
    }
  }};
  margin-bottom: 8px;
`;

export const StatUnit = styled.span`
  font-size: 1.25rem;
  font-weight: 600;
  margin-left: 4px;
`;

export const StatLabel = styled.div`
  font-size: 0.95rem;
  color: #6b7280;
  font-weight: 500;
`;

// Question Item
export const QuestionItem = styled.div`
  margin-bottom: 40px;
  
  &:last-of-type {
    margin-bottom: 0;
  }
`;

export const QuestionText = styled.div`
  font-size: 1.05rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 20px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  line-height: 1.6;
`;

export const QuestionNumber = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: #4a90c2;
  color: white;
  border-radius: 50%;
  font-size: 0.875rem;
  font-weight: 700;
  flex-shrink: 0;
  margin-top: 2px;
`;

// Rating Scale
export const RatingScale = styled.div`
  display: flex;
  gap: 12px;

  @media (max-width: 1024px) {
    gap: 8px;
  }
`;

export const RatingOption = styled.div`
  flex: 1;
`;

export const RatingInput = styled.input`
  display: none;
`;

export const RatingLabel = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 12px;
  background: ${props => props.$checked ? 'linear-gradient(135deg, #4a90c2 0%, #6bb3e0 100%)' : '#f9fafb'};
  border: 2px solid ${props => props.$checked ? '#4a90c2' : '#e5e7eb'};
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 100px;
  color: ${props => props.$checked ? 'white' : '#1f2937'};

  &:hover {
    border-color: #4a90c2;
    background: ${props => props.$checked ? 'linear-gradient(135deg, #4a90c2 0%, #6bb3e0 100%)' : '#f3f4f6'};
  }
`;

export const RatingValue = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 8px;
`;

export const RatingText = styled.span`
  font-size: 0.8rem;
  text-align: center;
  white-space: pre-line;
  line-height: 1.4;
`;

// Comment Section
export const CommentSection = styled.div`
  margin-top: 40px;
`;

export const CommentLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.95rem;
  color: #4b5563;
  margin-bottom: 12px;
  font-weight: 500;

  i {
    color: #4a90c2;
  }
`;

export const CommentTextarea = styled.textarea`
  width: 100%;
  padding: 16px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-family: inherit;
  font-size: 0.95rem;
  resize: vertical;
  min-height: 120px;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #4a90c2;
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

// Action Buttons
export const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    
    button {
      width: 100%;
    }
  }
`;

export const PrevButton = styled.button`
  padding: 14px 32px;
  background: #f3f4f6;
  color: #6b7280;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover:not(:disabled) {
    background: #e5e7eb;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  i {
    font-size: 0.875rem;
  }
`;

export const NextButton = styled.button`
  padding: 14px 32px;
  background: linear-gradient(135deg, #4a90c2 0%, #6bb3e0 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(74, 144, 194, 0.4);
  }

  i {
    font-size: 0.875rem;
  }
`;

export const SubmitButton = styled.button`
  padding: 14px 32px;
  background: linear-gradient(135deg, #10b981 0%, #34d399 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(16, 185, 129, 0.4);
  }

  i {
    font-size: 0.875rem;
  }
`;

// Result Summary
export const ResultSummary = styled.div`
  text-align: center;
  padding: 40px 0;
`;

export const ResultScoreCircle = styled.div`
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4a90c2 0%, #6bb3e0 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto 32px;
  color: white;
  box-shadow: 0 8px 24px rgba(74, 144, 194, 0.3);
`;

export const ResultScore = styled.div`
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1;
`;

export const ResultMaxScore = styled.div`
  font-size: 1rem;
  opacity: 0.9;
  margin-top: 4px;
`;

export const ResultGrade = styled.div`
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 12px;
  color: ${props => {
    switch(props.$type) {
      case 'good': return '#10b981';
      case 'normal': return '#f59e0b';
      case 'bad': return '#ef4444';
      default: return '#6b7280';
    }
  }};
`;

export const ResultMessage = styled.p`
  color: #6b7280;
  font-size: 1rem;
  line-height: 1.8;
  max-width: 600px;
  margin: 0 auto;
`;

// Result Details
export const ResultDetailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const ResultDetailCard = styled.div`
  background: #f9fafb;
  padding: 28px;
  border-radius: 12px;
  text-align: center;
  border: 1px solid #e5e7eb;
`;

export const DetailLabel = styled.div`
  font-size: 0.9rem;
  color: #6b7280;
  margin-bottom: 12px;
  font-weight: 500;
`;

export const DetailScore = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #4a90c2;
  margin-bottom: 12px;
`;

export const DetailGrade = styled.div`
  display: inline-block;
  padding: 6px 16px;
  border-radius: 16px;
  font-size: 0.85rem;
  font-weight: 600;
  background: ${props => {
    switch(props.$type) {
      case 'good': return '#d1fae5';
      case 'normal': return '#fef3c7';
      case 'bad': return '#fee2e2';
      default: return '#f3f4f6';
    }
  }};
  color: ${props => {
    switch(props.$type) {
      case 'good': return '#059669';
      case 'normal': return '#d97706';
      case 'bad': return '#dc2626';
      default: return '#6b7280';
    }
  }};
`;

// Recommend Section
export const RecommendSection = styled.div`
  margin-top: 40px;
  padding: 32px;
  background: #eff6ff;
  border-radius: 12px;
`;

export const RecommendTitle = styled.h4`
  color: #1e40af;
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;

  i {
    font-size: 1.3rem;
  }
`;

export const RecommendList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const RecommendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  background: white;
  padding: 20px;
  border-radius: 12px;
  transition: all 0.2s ease;

  &:hover {
    transform: translateX(4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`;

export const RecommendIcon = styled.i`
  font-size: 1.5rem;
  color: #4a90c2;
  width: 40px;
  text-align: center;
`;

export const RecommendContent = styled.div`
  flex: 1;
`;

export const RecommendItemTitle = styled.div`
  font-size: 1rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 4px;
`;

export const RecommendItemDesc = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
`;