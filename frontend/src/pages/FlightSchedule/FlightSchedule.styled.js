import styled from "styled-components";

/**
 * ✅ 이 페이지는 Layout(사이드바/탑바) 바깥을 책임지지 않음.
 * ✅ default layout 내부에서 렌더링되는 "컨텐츠"만 스타일링.
 */

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

// ==================== Header ====================
export const PageHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 12px;
  }
`;

export const HeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const BreadcrumbText = styled.p`
  font-size: 14px;
  color: #6b7280;
  margin: 0;
`;

export const PageTitle = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #111827;
  margin: 0;
`;

export const PageSubtitle = styled.p`
  font-size: 15px;
  color: #6b7280;
  margin: 0;
`;

// ==================== Filter Section ====================
export const FilterSection = styled.section`
  display: flex;
  gap: 16px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  margin-bottom: 20px;
  flex-wrap: wrap;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

export const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 180px;
`;

export const FilterLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #374151;
`;

export const FilterButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

export const FilterButton = styled.button`
  padding: 10px 18px;
  font-size: 14px;
  font-weight: 600;
  border: 1px solid ${(props) => (props.$active ? "#3b82f6" : "#d1d5db")};
  background-color: ${(props) => (props.$active ? "#eff6ff" : "#ffffff")};
  color: ${(props) => (props.$active ? "#2563eb" : "#6b7280")};
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) => (props.$active ? "#dbeafe" : "#f9fafb")};
  }
`;

export const DateInput = styled.input`
  padding: 10px 14px;
  font-size: 14px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  background-color: #ffffff;
  color: #111827;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.12);
  }
`;

export const CitySelect = styled.select`
  padding: 10px 14px;
  font-size: 14px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  background-color: #ffffff;
  color: #111827;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.12);
  }
`;

export const SearchButton = styled.button`
  align-self: flex-end;
  padding: 10px 28px;
  font-size: 15px;
  font-weight: 700;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: #ffffff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(59, 130, 246, 0.22);
  }

  &:active {
    transform: translateY(0);
  }
`;

// ==================== Flight List ====================
export const FlightListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const FlightCard = styled.div`
  background-color: #ffffff;
  border-radius: 14px;
  padding: 22px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.2s, transform 0.2s;

  &:hover {
    box-shadow: 0 10px 22px rgba(0, 0, 0, 0.06);
    transform: translateY(-2px);
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`;

export const FlightBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const AirlineIcon = styled.div`
  width: 46px;
  height: 46px;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #ffffff;
`;

export const FlightNumber = styled.h3`
  font-size: 18px;
  font-weight: 800;
  color: #111827;
  margin: 0;
`;

export const FlightDate = styled.p`
  font-size: 13px;
  color: #6b7280;
  margin: 4px 0 0 0;
`;

export const StatusBadgeGroup = styled.div`
  display: flex;
  gap: 8px;
`;

export const StatusBadge = styled.span`
  padding: 7px 14px;
  font-size: 13px;
  font-weight: 700;
  border-radius: 999px;

  background-color: ${(props) => (props.$status === "normal" ? "#dbeafe" : "#d1fae5")};
  color: ${(props) => (props.$status === "normal" ? "#1e40af" : "#065f46")};
`;

export const FlightRoute = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 32px;

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 14px;
  }
`;

export const RoutePoint = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
`;

export const RouteTime = styled.p`
  font-size: 24px;
  font-weight: 800;
  color: #111827;
  margin: 0;
`;

export const RouteCode = styled.p`
  font-size: 16px;
  font-weight: 800;
  color: #2563eb;
  margin: 0;
`;

export const RouteAirport = styled.p`
  font-size: 13px;
  color: #6b7280;
  margin: 0;
`;

export const RouteIndicator = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  position: relative;
`;

export const AirplaneIcon = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 999px;
  background: #eff6ff;
  color: #2563eb;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
`;

export const RouteLine = styled.div`
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, #3b82f6 0%, #2563eb 100%);
  border-radius: 2px;
`;

export const RouteDuration = styled.p`
  font-size: 13px;
  color: #6b7280;
  margin: 0;
`;
