import styled from "styled-components";


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
  font-weight: 800;
  color: #111827;
  margin: 0;
`;

export const PageSubtitle = styled.p`
  font-size: 15px;
  color: #6b7280;
  margin: 0;
`;

// ==================== Flight Summary Card ====================
export const FlightSummaryCard = styled.section`
  background: #ffffff;
  border-radius: 14px;
  padding: 22px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  margin-bottom: 18px;
`;

export const FlightSummaryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 18px;

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: flex-start;
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
  font-weight: 900;
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
  flex-wrap: wrap;
`;

export const StatusBadge = styled.span`
  padding: 7px 14px;
  font-size: 13px;
  font-weight: 800;
  border-radius: 999px;

  background-color: ${(props) => (props.$status === "normal" ? "#dbeafe" : "#d1fae5")};
  color: ${(props) => (props.$status === "normal" ? "#1e40af" : "#065f46")};
`;

// ==================== Flight Route ====================
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
  font-weight: 900;
  color: #111827;
  margin: 0;
`;

export const RouteCode = styled.p`
  font-size: 16px;
  font-weight: 900;
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

export const RoutePlaneIcon = styled.div`
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

export const ViewDetailsButton = styled.button`
  margin-top: 16px;
  width: 100%;
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid #d1d5db;
  background: #ffffff;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f9fafb;
    border-color: #cbd5e1;
  }
`;

// ==================== Crew Section ====================
export const CrewSection = styled.section`
  background: #ffffff;
  border-radius: 14px;
  padding: 18px 22px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  margin-top: 16px;
`;

export const CrewSectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
`;

export const CrewSectionTitle = styled.h2`
  font-size: 16px;
  font-weight: 900;
  color: #111827;
  margin: 0;
`;

export const CrewMemberList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const CrewMemberCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 14px;
  padding: 14px;
  border: 1px solid #eef2f7;
  border-radius: 12px;
  background: #fbfdff;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

export const CrewMemberLeft = styled.div`
  display: flex;
  gap: 12px;
`;

export const CrewAvatar = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 14px;
  background: ${(props) => props.$bgColor || "#3b82f6"};
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex: 0 0 auto;
`;

export const CrewInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const CrewName = styled.div`
  font-size: 15px;
  font-weight: 900;
  color: #111827;
`;

export const CrewMetadata = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
  color: #6b7280;
  font-size: 12px;
`;

export const CrewRole = styled.span`
  font-weight: 800;
  color: #374151;
`;

export const CrewDivider = styled.span`
  color: #cbd5e1;
`;

export const CrewID = styled.span``;

export const CrewExperience = styled.span``;

export const CrewCertifications = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

export const CertBadge = styled.span`
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 800;
  background: #eff6ff;
  color: #1e40af;
`;

export const CrewMemberRight = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 0 0 auto;

  @media (max-width: 1024px) {
    width: 100%;
    justify-content: space-between;
  }
`;

export const CrewStatusBadge = styled.span`
  padding: 7px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 900;

  background: ${(props) => {
    if ((props.$status || "").includes("근무")) return "#d1fae5";
    if ((props.$status || "").includes("휴가")) return "#fee2e2";
    return "#e5e7eb";
  }};

  color: ${(props) => {
    if ((props.$status || "").includes("근무")) return "#065f46";
    if ((props.$status || "").includes("휴가")) return "#991b1b";
    return "#374151";
  }};
`;

export const CrewActions = styled.div`
  display: flex;
  gap: 8px;
`;

export const ActionButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;

  &:hover {
    background: #f9fafb;
    border-color: #cbd5e1;
  }
`;
