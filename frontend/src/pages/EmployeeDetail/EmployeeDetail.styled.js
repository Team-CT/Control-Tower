import styled from "styled-components";

// --- Layout Containers ---
export const MainContainer = styled.main`
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  padding: 40px;
  background-color: var(--bg-main);
  min-height: 100%;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

// --- Header Section ---
export const PageHeader = styled.header`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Breadcrumb = styled.div`
  font-size: 14px;
  color: #6b7280;
  display: flex;
  gap: 8px;

  .current {
    color: #111827;
    font-weight: 600;
  }
`;

export const TitleGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    font-size: 24px;
    font-weight: 700;
    color: #111827;
  }
`;

export const ActionButton = styled.button`
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  background-color: ${props => props.$primary ? 'var(--primary-color)' : '#ffffff'}; 
  color: ${props => props.$primary ? '#ffffff' : 'var(--text-main)'};
  border: ${props => props.$primary ? 'none' : '1px solid var(--border-color)'};
  transition: all 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

// --- Profile Card Section ---
export const ProfileCard = styled.section`
  background: #ffffff;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  display: flex;
  gap: 40px;
  align-items: flex-start;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

export const AvatarGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  min-width: 120px;

  .avatar-circle {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: var(--primary-color);
    color: white;
    font-size: 36px;
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .name-box {
    text-align: center;
    h3 {
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 4px;
    }
    .rank {
      font-size: 14px;
      color: #6b7280;
    }
  }
`;

export const InfoGrid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 24px;
  column-gap: 32px;

  @media (max-width: 1280px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  &.full-width {
    grid-column: 1 / -1;
  }

  label {
    font-size: 13px;
    color: #6b7280;
    font-weight: 500;
  }

  p {
    font-size: 16px;
    color: var(--text-main);
    font-weight: 600;
    
    &.highlight {
      color: var(--primary-color);
    }
  }
`;

export const StatusBadge = styled.div`
  width: 120px;
  height: 100px;
  border: 1px solid #d1d5db;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  background-color: #f0fdf4; 

  .label {
    font-size: 12px;
    color: #6b7280;
  }
  
  .value {
    font-size: 20px;
    font-weight: 700;
    color: #15803d; 
  }
`;

// --- Tab & History Section ---
export const TabNavigation = styled.nav`
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  gap: 24px;

  button {
    background: none;
    border: none;
    padding: 12px 4px;
    font-size: 16px;
    font-weight: 600;
    color: #6b7280;
    cursor: pointer;
    position: relative;

    &.active {
      color: #2563EB;
      
      &:after {
        content: '';
        position: absolute;
        bottom: -1px;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: #2563EB;
      }
    }
  }
`;

export const HistorySection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const HistoryCard = styled.div`
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;

  .card-header {
    padding: 20px 24px;
    border-bottom: 1px solid #f3f4f6;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title-row {
      display: flex;
      align-items: center;
      gap: 12px;
      
      h4 {
        font-size: 16px;
        font-weight: 700;
      }
    }
    
    .date {
      font-size: 14px;
      color: #9ca3af;
    }
  }

  .card-content {
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 24px;

    .meta-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 24px;
      background-color: #f9fafb;
      padding: 20px;
      border-radius: 8px;

      @media (max-width: 1024px) {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    .description-box {
      background-color: #eff6ff; 
      border: 1px solid #dbeafe;
      border-radius: 8px;
      padding: 16px 20px;
      display: flex;
      flex-direction: column;
      gap: 8px;

      label {
        font-size: 12px;
        color: #2563EB;
        font-weight: 600;
      }
      p {
        font-size: 15px;
        color: #1e40af;
        line-height: 1.5;
      }
    }
  }
`;