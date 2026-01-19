import styled from "styled-components";

// --- Layout Containers ---
export const MainContainer = styled.main`
  width: 100%;
  max-width: 1600px; /* 대형 모니터 대응, 중앙 정렬 */
  margin: 0 auto;
  padding: 40px;
  background-color: var(--bg-main);
  min-height: 100%;
  display: flex;
  flex-direction: column;
  gap: 32px;

  @media (max-width: 1024px) {
    padding: 24px;
  }
`;

// --- Header Section ---
export const PageHeader = styled.header`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Breadcrumb = styled.nav`
  font-size: 14px;
  color: #9ca3af;
  display: flex;
  gap: 8px;

  .current {
    color: #111827;
    font-weight: 600;
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

// --- Action Bar ---
export const ActionBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  width: 100%;
`;

export const SearchInputWrapper = styled.div`
  position: relative;
  width: 400px; /* 데스크탑에서 넉넉한 너비 */

  .search-icon {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: #9ca3af;
    font-size: 18px;
  }

  input {
    width: 100%;
    padding: 14px 16px 14px 48px;
    border: 1px solid #e5e7eb;
    border-radius: 50px; /* 둥근 검색창 스타일 */
    font-size: 15px;
    outline: none;
    transition: all 0.2s;
    background-color: #ffffff;

    &:focus {
      border-color: #0064DE;
      box-shadow: 0 0 0 3px rgba(0, 100, 222, 0.1);
    }
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const CreateButton = styled.button`
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 12px 28px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background-color: var(--primary-hover);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 85, 170, 0.2);
  }
`;

// --- Grid & Cards ---
export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 데스크탑 기본 3열 */
  gap: 24px;
  width: 100%;

  /* 반응형 처리 */
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const DepartmentCard = styled.article`
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  /* 상단 컬러 바 효과 (옵션) */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background-color: ${props => props.$type === 'CABIN' ? 'var(--primary-color)' : props.$type === 'MAINTENANCE' ? '#4B5563' : 'var(--secondary-color)'};
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
    border-color: #d1d5db;
  }
`;

export const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;

  .icon-box {
    width: 48px;
    height: 48px;
    background-color: #f3f4f6;
    border-radius: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
  }

  h3 {
    font-size: 20px;
    font-weight: 700;
    color: #111827;
    margin: 0;
  }
`;

export const CardDescription = styled.p`
  font-size: 15px;
  color: #6b7280;
  line-height: 1.6;
  min-height: 48px; /* 2줄 정도의 높이 확보 */
  margin: 0;
`;

export const ManagerSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background-color: #f9fafb;
  border-radius: 8px;

  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #d1d5db;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    color: #4b5563;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .info {
    display: flex;
    flex-direction: column;
    
    .role {
      font-size: 12px;
      color: #6b7280;
      margin-bottom: 2px;
    }
    
    .name {
      font-size: 14px;
      font-weight: 600;
      color: #374151;
    }
  }
`;

export const StatsFooter = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  border-top: 1px solid #f3f4f6;
  margin-top: auto; /* 카드가 길어지면 하단 고정 */

  .stat-item {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 14px;
    color: #4b5563;
    font-weight: 500;

    .icon {
      font-size: 16px;
      color: #9ca3af;
    }
  }
`;