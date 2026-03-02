import styled from "styled-components";

/**
 * DepartmentDetail.styled.js
 * - JSX에서 사용하는 export 이름을 유지하면서
 * - "일반적인 관리자 UI" 톤(절제된 카드/탭/리스트)을 목표로 정리
 *
 * 전제:
 * - Layout(사이드바/탑바)은 상위(MainLayout)가 담당
 * - 여기서는 "컨텐츠 영역"만 스타일링
 */

/* ==================== Layout ==================== */

export const MainContainer = styled.div`
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;

  /* 일반적인 admin 컨텐츠 여백 */
  padding: 32px 40px;

  /* 카드들이 잘 보이도록 약한 배경 */
  background-color: ${({ theme }) =>
    theme.background?.secondary || theme.background?.main || "transparent"};

  min-height: 100%;
  display: flex;
  flex-direction: column;
  gap: 18px;

  @media (max-width: 1440px) {
    padding: 28px 32px;
  }

  @media (max-width: 1024px) {
    padding: 22px 24px;
  }

  @media (max-width: 640px) {
    padding: 16px 16px;
  }
`;

/** 컨텐츠 wrapper: 섹션 사이 간격만 관리 */
export const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

/* ==================== Header ==================== */

export const BackButton = styled.button`
  width: fit-content;
  height: 40px;
  padding: 0 14px;
  border-radius: 10px;

  background-color: ${({ theme }) => theme.background?.paper || "#fff"};
  border: 1px solid ${({ theme }) => theme.border || "rgba(0,0,0,0.12)"};

  display: inline-flex;
  align-items: center;
  gap: 10px;

  cursor: pointer;
  font-size: 14px;
  font-weight: 800;
  color: ${({ theme }) => theme.text?.primary || "rgba(0,0,0,0.85)"};

  transition: background-color 0.15s, border-color 0.15s, transform 0.12s;

  &:hover {
    background-color: ${({ theme }) => theme.background?.hover || "rgba(0,0,0,0.03)"};
    border-color: ${({ theme }) => theme.colors?.primary || "rgba(0,0,0,0.25)"};
  }

  &:active {
    transform: translateY(1px);
  }
`;

/* ==================== Info Card ==================== */

export const InfoCard = styled.section`
  background-color: ${({ theme }) => theme.background?.paper || "#fff"};
  border-radius: 16px;
  padding: 28px;
  box-shadow: ${({ theme }) => theme.shadow || "0 10px 30px rgba(0,0,0,0.06)"};
  border: 1px solid ${({ theme }) => theme.border || "rgba(0,0,0,0.10)"};

  display: flex;
  flex-direction: column;
  gap: 18px;

  @media (max-width: 1024px) {
    padding: 22px;
  }

  @media (max-width: 640px) {
    padding: 18px;
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: flex-start;
  }

  .title-group {
    display: flex;
    align-items: flex-start;
    gap: 14px;
    min-width: 0;

    .dept-icon {
      width: 44px;
      height: 44px;
      border-radius: 12px;
      background-color: ${({ theme }) => `${theme.colors?.primary || "#3b82f6"}12`};
      border: 1px solid ${({ theme }) => theme.border || "rgba(0,0,0,0.10)"};
      flex-shrink: 0;
    }

    h1 {
      margin: 0;
      font-size: 24px;
      font-weight: 900;
      color: ${({ theme }) => theme.text?.primary || "rgba(0,0,0,0.85)"};
      line-height: 1.2;

      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      @media (max-width: 640px) {
        font-size: 20px;
      }
    }
  }
`;

/** 우측 액션 버튼 영역 (없으면 display:none 처리) */
export const ActionGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  &:empty {
    display: none;
  }

  button {
    padding: 10px 16px;
    font-size: 14px;
    font-weight: 800;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.15s;

    border: 1px solid ${({ theme }) => theme.border || "rgba(0,0,0,0.12)"};
    background-color: ${({ theme }) => theme.background?.paper || "#fff"};
    color: ${({ theme }) => theme.text?.primary || "rgba(0,0,0,0.85)"};

    &.primary {
      background-color: ${({ theme }) => theme.colors?.primary || "#111827"};
      border-color: ${({ theme }) => theme.colors?.primary || "#111827"};
      color: ${({ theme }) => theme.text?.inverse || "#fff"};

      &:hover {
        filter: brightness(0.95);
      }
    }

    &.secondary {
      &:hover {
        background-color: ${({ theme }) => theme.background?.hover || "rgba(0,0,0,0.03)"};
        border-color: ${({ theme }) => theme.colors?.primary || "rgba(0,0,0,0.25)"};
      }
    }
  }
`;

/** 요약 정보: 일반적으로 2~4개가 가장 보기 좋음 */
export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  padding-top: 16px;
  border-top: 1px solid ${({ theme }) => theme.border || "rgba(0,0,0,0.10)"};

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const StatItem = styled.div`
  padding: 14px 16px;
  border-radius: 14px;

  background-color: ${({ theme }) =>
    theme.background?.secondary || "rgba(0,0,0,0.02)"};
  border: 1px solid ${({ theme }) => theme.border || "rgba(0,0,0,0.10)"};

  display: flex;
  flex-direction: column;
  gap: 6px;

  .label {
    font-size: 12px;
    font-weight: 700;
    color: ${({ theme }) => theme.text?.secondary || "rgba(0,0,0,0.55)"};
  }

  .value {
    font-size: 18px;
    font-weight: 900;
    color: ${({ theme }) => theme.text?.primary || "rgba(0,0,0,0.85)"};
    letter-spacing: -0.2px;
  }
`;

/* ==================== Tabs ==================== */

export const TabNavigation = styled.div`
  display: flex;
  gap: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.border || "rgba(0,0,0,0.10)"};
`;

export const TabItem = styled.button`
  padding: 12px 6px;
  font-size: 15px;
  font-weight: 800;

  background: none;
  border: none;
  cursor: pointer;
  position: relative;

  color: ${(props) =>
    props.$isActive ? props.theme.colors?.primary || "#111827" : props.theme.text?.secondary || "rgba(0,0,0,0.55)"};

  transition: color 0.12s;

  &:hover {
    color: ${({ theme }) => theme.colors?.primary || "#111827"};
  }

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -1px;
    width: 100%;
    height: 2px;
    background-color: ${(props) =>
      props.$isActive ? props.theme.colors?.primary || "#111827" : "transparent"};
  }

  @media (max-width: 640px) {
    font-size: 14px;
    padding: 12px 4px;
  }
`;

/* ==================== Table Section ==================== */

export const TableSection = styled.section`
  background-color: ${({ theme }) => theme.background?.paper || "#fff"};
  border-radius: 16px;
  padding: 22px;
  box-shadow: ${({ theme }) => theme.shadow || "0 10px 30px rgba(0,0,0,0.06)"};
  border: 1px solid ${({ theme }) => theme.border || "rgba(0,0,0,0.10)"};

  @media (max-width: 1024px) {
    padding: 18px;
  }

  @media (max-width: 640px) {
    padding: 14px;
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;

  h3 {
    margin: 0;
    font-size: 16px;
    font-weight: 900;
    color: ${({ theme }) => theme.text?.primary || "rgba(0,0,0,0.85)"};
  }

  /* 필요 시 +추가 버튼(작은 텍스트 버튼)을 쓰려면 .add-btn 사용 */
  .add-btn {
    padding: 8px 10px;
    font-size: 13px;
    font-weight: 900;
    color: ${({ theme }) => theme.colors?.primary || "#111827"};
    background: none;
    border: none;
    cursor: pointer;
    border-radius: 10px;

    &:hover {
      background-color: ${({ theme }) => theme.background?.hover || "rgba(0,0,0,0.03)"};
    }
  }
`;

/* ==================== Table Components ==================== */

export const TeamTable = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

/** 헤더/로우 공통 베이스 */
const RowBase = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  padding: 14px 16px;
  border-radius: 14px;
  border: 1px solid ${({ theme }) => theme.border || "rgba(0,0,0,0.10)"};
  background-color: ${({ theme }) => theme.background?.paper || "#fff"};

  .col-id {
    width: 56px;
    text-align: center;
    font-size: 13px;
    font-weight: 900;
    color: ${({ theme }) => theme.text?.tertiary || "rgba(0,0,0,0.45)"};
    flex-shrink: 0;
  }

  .col-name {
    width: 240px;
    font-size: 14px;
    font-weight: 900;
    color: ${({ theme }) => theme.text?.primary || "rgba(0,0,0,0.85)"};
    flex-shrink: 0;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .col-leader {
    width: 180px;
    font-size: 14px;
    font-weight: 700;
    color: ${({ theme }) => theme.text?.secondary || "rgba(0,0,0,0.55)"};
    flex-shrink: 0;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .col-count {
    width: 120px;
    text-align: center;
    flex-shrink: 0;
  }

  /* (옵션) task 컬럼을 쓰고 싶으면 JSX에서 .col-task를 넣으면 됨 */
  .col-task {
    flex: 1;
    min-width: 180px;
    font-size: 14px;
    color: ${({ theme }) => theme.text?.secondary || "rgba(0,0,0,0.55)"};

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .col-action {
    width: 120px; /* 편집/삭제 버튼 2개 정도를 담기 좋은 폭 */
    text-align: right;
    flex-shrink: 0;
  }

  /* 태블릿: task 숨기기 */
  @media (max-width: 1024px) {
    .col-task {
      display: none;
    }
  }

  /* 모바일: leader도 숨기고 name을 넓게 */
  @media (max-width: 640px) {
    padding: 12px 12px;
    gap: 10px;

    .col-id {
      width: 44px;
    }

    .col-name {
      width: auto;
      flex: 1;
    }

    .col-leader {
      display: none;
    }

    .col-count {
      width: 84px;
    }

    .col-action {
      width: 90px;
    }
  }
`;

export const TableHeader = styled(RowBase)`
  background-color: ${({ theme }) =>
    theme.background?.secondary || "rgba(0,0,0,0.02)"};

  .col-id,
  .col-name,
  .col-leader,
  .col-count,
  .col-task,
  .col-action {
    font-size: 12px;
    font-weight: 900;
    color: ${({ theme }) => theme.text?.secondary || "rgba(0,0,0,0.55)"};
  }
`;

export const TableRow = styled(RowBase)`
  transition: transform 0.12s, box-shadow 0.12s, background-color 0.12s;

  &:hover {
    background-color: ${({ theme }) => theme.background?.hover || "rgba(0,0,0,0.03)"};
    box-shadow: ${({ theme }) => theme.shadowHover || theme.shadow || "0 10px 30px rgba(0,0,0,0.06)"};
    transform: translateY(-1px);
  }
`;

/** 인원수 Badge */
export const StatusBadge = styled.span`
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 900;

  background-color: ${({ theme }) => `${theme.status?.success || "#16a34a"}18`};
  color: ${({ theme }) => theme.status?.success || "#16a34a"};

  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

/* ==================== Optional: 상태/에러 ==================== */

export const EmptyState = styled.div`
  padding: 32px 12px;
  text-align: center;
  color: ${({ theme }) => theme.text?.secondary || "rgba(0,0,0,0.55)"};
`;

export const ErrorState = styled.div`
  padding: 32px 12px;
  text-align: center;
  color: ${({ theme }) => theme.status?.error || "#b42318"};
`;