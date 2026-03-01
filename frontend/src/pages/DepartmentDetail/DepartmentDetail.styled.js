import styled from "styled-components";

/**
 * ✅ 이 페이지는 Layout(사이드바/탑바) 바깥을 책임지지 않음.
 * ✅ MainLayout 내부에서 렌더링되는 "컨텐츠"만 스타일링.
 * ✅ 상단 배너는 "단색" (그라데이션 제거)
 */

/* ==================== Layout ==================== */

export const MainContainer = styled.div`
  width: 100%;
`;

/** 상단 바: 단색 + 얇은 그림자 (그라데이션 X) */
export const BannerSection = styled.div`
  width: 100%;
  height: 64px; /* ✅ 과한 바 높이 제거 */
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 14px;
  box-shadow: ${({ theme }) => theme.shadow};
`;

/** 페이지 전체 컨테이너 (참고 코드 스타일) */
export const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  padding: 32px 48px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 1440px) {
    padding: 24px 32px;
  }

  @media (max-width: 1024px) {
    padding: 20px 24px;
  }

  @media (max-width: 640px) {
    padding: 16px 16px;
  }
`;

/* ==================== Header (Back Button) ==================== */

/** 기존 JSX에서 BackButton을 상단에 두고 있으니, 참고 코드 톤으로 */
export const BackButton = styled.button`
  width: fit-content;
  height: 40px;
  padding: 0 14px;
  background-color: ${({ theme }) => theme.background.paper};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 10px;

  display: inline-flex;
  align-items: center;
  gap: 10px;

  cursor: pointer;
  font-size: 14px;
  font-weight: 800;
  color: ${({ theme }) => theme.text.primary};
  transition: all 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.background.hover};
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &:active {
    transform: translateY(1px);
  }
`;

/* ==================== Info Card ==================== */

export const InfoCard = styled.section`
  background-color: ${({ theme }) => theme.background.paper};
  border-radius: 14px;
  padding: 28px;
  box-shadow: ${({ theme }) => theme.shadow};
  display: flex;
  flex-direction: column;
  gap: 18px;

  @media (max-width: 1024px) {
    padding: 22px;
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
    gap: 16px;
    min-width: 0;

    .dept-icon {
      width: 44px;
      height: 44px;
      border-radius: 12px;
      background-color: ${({ theme }) => `${theme.colors.primary}15`};
      border: 1px solid ${({ theme }) => theme.border};
      flex-shrink: 0;
    }

    h1 {
      font-size: 26px;
      font-weight: 800;
      color: ${({ theme }) => theme.text.primary};
      margin: 0;
      line-height: 1.2;

      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      @media (max-width: 640px) {
        font-size: 22px;
      }
    }
  }
`;

export const ActionGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  /* ✅ 버튼이 없으면 레이아웃 공간 자체 제거 */
  &:empty {
    display: none;
  }

  button {
    padding: 10px 18px;
    font-size: 14px;
    font-weight: 800;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.2s;
    border: 1px solid ${({ theme }) => theme.border};

    &.primary {
      background-color: ${({ theme }) => theme.colors.primary};
      border-color: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.text.inverse};

      &:hover {
        filter: brightness(0.95);
      }
    }

    &.secondary {
      background-color: ${({ theme }) => theme.background.paper};
      color: ${({ theme }) => theme.text.primary};

      &:hover {
        background-color: ${({ theme }) => theme.background.hover};
        border-color: ${({ theme }) => theme.colors.primary};
      }
    }
  }
`;

/** 참고 코드의 “메타데이터” 느낌으로 2~4개까지 자연스럽게 */
export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  padding-top: 18px;
  border-top: 1px solid ${({ theme }) => theme.border};

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  padding: 16px;
  background-color: ${({ theme }) => theme.background.secondary};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;

  .label {
    font-size: 12px;
    color: ${({ theme }) => theme.text.secondary};
    font-weight: 700;
  }

  .value {
    font-size: 18px;
    color: ${({ theme }) => theme.text.primary};
    font-weight: 800;
    letter-spacing: -0.2px;
  }
`;

/* ==================== Tabs ==================== */

export const TabNavigation = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 4px;
  border-bottom: 2px solid ${({ theme }) => theme.border};
`;

export const TabItem = styled.button`
  padding: 12px 20px;
  font-size: 15px;
  font-weight: 800;
  color: ${(props) =>
    props.$isActive ? props.theme.colors.primary : props.theme.text.secondary};
  background-color: transparent;
  border: none;
  border-bottom: 2px solid
    ${(props) => (props.$isActive ? props.theme.colors.primary : "transparent")};
  margin-bottom: -2px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 640px) {
    padding: 12px 14px;
    font-size: 14px;
  }
`;

/* ==================== Table Section ==================== */

export const TableSection = styled.section`
  background-color: ${({ theme }) => theme.background.paper};
  border-radius: 14px;
  padding: 24px;
  box-shadow: ${({ theme }) => theme.shadow};
  border: 1px solid ${({ theme }) => theme.border};

  @media (max-width: 1024px) {
    padding: 18px;
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 14px;

  h3 {
    font-size: 16px;
    font-weight: 900;
    color: ${({ theme }) => theme.text.primary};
    margin: 0;
  }

  .add-btn {
    padding: 8px 10px;
    font-size: 13px;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.primary};
    background-color: transparent;
    border: none;
    cursor: pointer;
    border-radius: 10px;

    &:hover {
      background-color: ${({ theme }) => theme.background.hover};
    }
  }
`;

/* ==================== Table Components ==================== */

/** 전체 테이블 래퍼 */
export const TeamTable = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

/** 헤더/로우 공통 베이스 */
const TableRowBase = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  padding: 14px 16px;
  border-radius: 14px;
  border: 1px solid ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.background.paper};

  .col-id {
    width: 56px;
    text-align: center;
    font-size: 13px;
    font-weight: 800;
    color: ${({ theme }) => theme.text.tertiary};
    flex-shrink: 0;
  }

  .col-name {
    width: 220px;
    font-size: 14px;
    font-weight: 900;
    color: ${({ theme }) => theme.text.primary};
    flex-shrink: 0;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .col-leader {
    width: 160px;
    font-size: 14px;
    font-weight: 700;
    color: ${({ theme }) => theme.text.secondary};
    flex-shrink: 0;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .col-count {
    width: 110px;
    text-align: center;
    flex-shrink: 0;
  }

  .col-task {
    flex: 1;
    min-width: 180px;
    font-size: 14px;
    color: ${({ theme }) => theme.text.secondary};

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .col-action {
    width: 72px;
    text-align: right;
    flex-shrink: 0;
  }

  /* ✅ 태블릿: task 숨기기 */
  @media (max-width: 1024px) {
    .col-task {
      display: none;
    }
  }

  /* ✅ 모바일: leader도 숨기고 name을 넓게 */
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
      width: 56px;
    }
  }
`;

export const TableHeader = styled(TableRowBase)`
  background-color: ${({ theme }) => theme.background.secondary};
  border-color: ${({ theme }) => theme.border};

  .col-id,
  .col-name,
  .col-leader,
  .col-count,
  .col-task,
  .col-action {
    font-size: 12px;
    font-weight: 900;
    color: ${({ theme }) => theme.text.secondary};
  }
`;

export const TableRow = styled(TableRowBase)`
  transition: transform 0.15s, box-shadow 0.15s, background-color 0.15s;

  &:hover {
    background-color: ${({ theme }) => theme.background.hover};
    box-shadow: ${({ theme }) => theme.shadowHover || theme.shadow};
    transform: translateY(-1px);
  }
`;

/** 인원수 뱃지: 참고 코드 Badge 톤 */
export const StatusBadge = styled.span`
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 900;

  background-color: ${({ theme }) => `${theme.status.success}20`};
  color: ${({ theme }) => theme.status.success};

  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

/* ==================== Optional: 상태/에러 ==================== */
/** (JSX에서 직접 스타일 준 부분이 있으면 이건 선택적으로 사용) */
export const EmptyState = styled.div`
  padding: 36px;
  text-align: center;
  color: ${({ theme }) => theme.text.secondary};
`;

export const ErrorState = styled.div`
  padding: 36px;
  text-align: center;
  color: ${({ theme }) => theme.status.error};
`;