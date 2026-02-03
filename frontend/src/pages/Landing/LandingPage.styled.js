import styled from "styled-components";

/** ✅ 단일 그레이 토큰: 항공사/테마 의존 제거 */
const TOKENS = {
  pageBg: "linear-gradient(135deg, rgba(17,24,39,0.06) 0%, #ffffff 70%)",
  bgMain: "#ffffff",
  textPrimary: "#111827",
  textSecondary: "#4b5563",
  textTertiary: "#9ca3af",
  border: "#e5e7eb",
  shadowSm: "0 2px 20px rgba(0,0,0,0.05)",
  shadowMd: "0 4px 20px rgba(0,0,0,0.08)",
  shadowLg: "0 20px 80px rgba(0,0,0,0.08)",
  accent: "#111827", // ✅ 포인트도 진회색(단일)
  accentSoft: "rgba(17,24,39,0.06)",
  accentSoft2: "rgba(17,24,39,0.10)",
};

export const PageWrapper = styled.div`
  min-height: 100vh;
  background: ${TOKENS.pageBg}; /* ✅ theme.primary 제거 */
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
`;

export const HeaderContainer = styled.header`
  padding: 24px 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: ${TOKENS.shadowSm};
  position: sticky;
  top: 0;
  z-index: 100;
`;

export const HeaderLogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const HeaderLogoWrapper = styled.div`
  background-color: ${TOKENS.accent}; /* ✅ theme.primary 제거 */
  padding: 8px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const RotatedIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotate(-45deg);
`;

export const HeaderTitle = styled.h1`
  font-size: 24px;
  font-weight: 800;
  color: ${TOKENS.textPrimary};
  margin: 0;

  span {
    font-weight: 400;
    color: ${TOKENS.textTertiary};
    font-size: 18px;
  }
`;

export const HeaderRegisterButton = styled.button`
  padding: 12px 24px;
  background-color: transparent;
  border: 2px solid ${TOKENS.accent}; /* ✅ theme.primary 제거 */
  border-radius: 8px;
  color: ${TOKENS.accent};
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.25s ease;

  &:hover {
    background-color: ${TOKENS.accent};
    color: white;
  }
`;

export const MainContainer = styled.main`
  max-width: 1440px;
  margin: 0 auto;
  padding: 80px 80px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
`;

export const HeroContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const HeroBadge = styled.div`
  display: inline-block;
  padding: 8px 16px;
  background-color: ${TOKENS.accentSoft}; /* ✅ theme.primary 제거 */
  color: ${TOKENS.accent};
  border-radius: 30px;
  font-weight: 700;
  font-size: 14px;
  margin-bottom: 24px;
`;

export const HeroTitle = styled.h2`
  font-size: 56px;
  font-weight: 900;
  color: ${TOKENS.textPrimary};
  line-height: 1.2;
  margin-bottom: 24px;

  span {
    color: ${TOKENS.accent}; /* ✅ theme.primary 제거 */
  }
`;

export const HeroDescription = styled.p`
  font-size: 20px;
  color: ${TOKENS.textSecondary};
  line-height: 1.8;
  margin-bottom: 40px;
`;

export const HeroStatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
`;

export const HeroStatCard = styled.div`
  padding: 24px;
  background-color: ${TOKENS.bgMain};
  border-radius: 12px;
  box-shadow: ${TOKENS.shadowMd};
  text-align: center;
  transition: transform 0.25s ease;
  cursor: default;
  border: 1px solid rgba(17,24,39,0.06);

  &:hover {
    transform: translateY(-5px);
  }
`;

export const CenteredIconWrapper = styled.div`
  margin: 0 auto 12px;
  display: flex;
  justify-content: center;
`;

export const StatValue = styled.div`
  font-size: 24px;
  font-weight: 800;
  color: ${TOKENS.accent}; /* ✅ theme.primary 제거 */
  margin-bottom: 4px;
`;

export const StatDesc = styled.div`
  font-size: 14px;
  color: ${TOKENS.textSecondary};
`;

export const ActionCardContainer = styled.div`
  background-color: ${TOKENS.bgMain};
  border-radius: 32px;
  padding: 48px;
  box-shadow: ${TOKENS.shadowLg};
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(17,24,39,0.06);
`;

export const ActionCardBackgroundCircle = styled.div`
  position: absolute;
  top: -10%;
  right: -10%;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(17,24,39,0.08) 0%, transparent 70%);
  z-index: 0;
`;

export const ActionCardContent = styled.div`
  position: relative;
  z-index: 1;
`;

export const ActionCardTitle = styled.h3`
  font-size: 32px;
  font-weight: 900;
  color: ${TOKENS.textPrimary};
  margin-bottom: 12px;
  text-align: center;
`;

export const ActionCardDescription = styled.p`
  text-align: center;
  color: ${TOKENS.textSecondary};
  margin-bottom: 40px;
`;

export const ActionButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ActionRegisterWrapper = styled.div`
  margin-top: 32px;
  padding: 24px;
  background-color: rgba(17,24,39,0.03);
  border-radius: 16px;
  text-align: center;
  font-size: 14px;
  color: ${TOKENS.textSecondary};
  border: 1px solid rgba(17,24,39,0.06);
`;

export const CheckIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 8px;
`;

export const ActionRegisterTitle = styled.strong`
  color: ${TOKENS.textPrimary};
  display: block;
  margin-bottom: 4px;
`;

export const ActionRegisterButton = styled.button`
  margin-top: 12px;
  background: none;
  border: none;
  color: ${TOKENS.accent}; /* ✅ theme.primary 제거 */
  font-weight: 800;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 4px;

  &:hover {
    text-decoration: underline;
  }
`;

/**
 * ✅ 여기(액션 버튼)가 “항공사별 컬러 구분”의 핵심이었음
 * - $color 제거 (무조건 회색)
 * - $variant 유지하고 싶으면 유지 가능하지만, 색상 차이를 최소화
 * - $isHovered 기반 애니메이션은 유지 (UX는 유지)
 */
export const ActionButtonStyled = styled.button`
  padding: 24px;
  background-color: ${({ $isHovered }) => ($isHovered ? "rgba(17,24,39,0.06)" : "#ffffff")};
  border: 1px solid rgba(17,24,39,0.10);
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  gap: 20px;
  transform: ${({ $isHovered }) => ($isHovered ? "translateY(-2px)" : "translateY(0)")};
  box-shadow: ${({ $isHovered }) => ($isHovered ? "0 10px 30px rgba(0,0,0,0.10)" : "none")};
  width: 100%;
  text-align: left;
`;

export const ActionIconWrapper = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background-color: ${({ $isHovered }) => ($isHovered ? TOKENS.accent : "rgba(17,24,39,0.08)")};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.25s ease;
  color: ${({ $isHovered }) => ($isHovered ? "#fff" : TOKENS.textPrimary)};
`;

export const ActionTextWrapper = styled.div`
  flex: 1;
`;

export const ActionLabel = styled.div`
  font-size: 18px;
  font-weight: 900;
  color: ${TOKENS.textPrimary};
  margin-bottom: 4px;
`;

export const ActionSubText = styled.div`
  font-size: 14px;
  color: ${TOKENS.textSecondary};
  font-weight: 600;
`;

export const ActionArrowWrapper = styled.div`
  opacity: ${({ $isHovered }) => ($isHovered ? 1 : 0)};
  transform: ${({ $isHovered }) => ($isHovered ? "translateX(0)" : "translateX(-10px)")};
  transition: all 0.25s ease;
  color: ${TOKENS.textPrimary};
`;
