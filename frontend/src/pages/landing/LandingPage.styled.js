import styled from 'styled-components';

export const PageWrapper = styled.div`
  min-height: 100vh;
  background: ${props => `linear-gradient(135deg, ${props.theme.colors.primary}15 0%, #ffffff 100%)`};
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
`;

export const HeaderContainer = styled.header`
  padding: 24px 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 20px rgba(0,0,0,0.05);
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
  background-color: ${props => props.theme.colors.primary};
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
  color: var(--text-primary);
  margin: 0;
  
  span {
    font-weight: 400;
    color: var(--text-tertiary);
    font-size: 18px;
  }
`;

export const HeaderRegisterButton = styled.button`
  padding: 12px 24px;
  background-color: transparent;
  border: 2px solid ${props => props.theme.colors.primary};
  border-radius: 8px;
  color: ${props => props.theme.colors.primary};
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.theme.colors.primary};
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
  background-color: ${props => `${props.theme.colors.primary}15`};
  color: ${props => props.theme.colors.primary};
  border-radius: 30px;
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 24px;
`;

export const HeroTitle = styled.h2`
  font-size: 56px;
  font-weight: 800;
  color: var(--text-primary);
  line-height: 1.2;
  margin-bottom: 24px;

  span {
    color: ${props => props.theme.colors.primary};
  }
`;

export const HeroDescription = styled.p`
  font-size: 20px;
  color: var(--text-secondary);
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
  background-color: var(--bg-main);
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  text-align: center;
  transition: transform 0.3s ease;
  cursor: default;

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
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 4px;
`;

export const StatDesc = styled.div`
  font-size: 14px;
  color: var(--text-secondary);
`;

export const ActionCardContainer = styled.div`
  background-color: white;
  border-radius: 32px;
  padding: 48px;
  box-shadow: 0 20px 80px rgba(0,0,0,0.08);
  position: relative;
  overflow: hidden;
`;

export const ActionCardBackgroundCircle = styled.div`
  position: absolute;
  top: -10%;
  right: -10%;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: ${props => `radial-gradient(circle, ${props.theme.colors.primary}10 0%, transparent 70%)`};
  z-index: 0;
`;

export const ActionCardContent = styled.div`
  position: relative;
  z-index: 1;
`;

export const ActionCardTitle = styled.h3`
  font-size: 32px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 12px;
  text-align: center;
`;

export const ActionCardDescription = styled.p`
  text-align: center;
  color: #666;
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
  background-color: #f8f9fa;
  border-radius: 16px;
  text-align: center;
  font-size: 14px;
  color: #666;
  border: 1px solid #eee;
`;

export const CheckIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 8px;
`;

export const ActionRegisterTitle = styled.strong`
  color: #333;
  display: block;
  margin-bottom: 4px;
`;

export const ActionRegisterButton = styled.button`
  margin-top: 12px;
  background: none;
  border: none;
  color: ${props => props.theme.colors.primary};
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;

export const ActionButtonStyled = styled.button`
  padding: 24px;
  background-color: ${props => props.$variant === 'solid' 
    ? (props.$isHovered ? props.$color : `${props.$color}10`) 
    : (props.$isHovered ? `${props.$color}10` : 'white')};
  border: ${props => props.$variant === 'solid' ? 'none' : `2px solid ${props.$color}`};
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  gap: 20px;
  transform: ${props => props.$isHovered ? 'translateY(-2px)' : 'translateY(0)'};
  box-shadow: ${props => props.$isHovered ? `0 10px 30px ${props.$color}20` : 'none'};
  width: 100%;
  text-align: left;
`;

export const ActionIconWrapper = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background-color: ${props => props.$variant === 'solid' ? (props.$isHovered ? 'white' : props.$color) : `${props.$color}15`};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: ${props => props.$variant === 'solid' && !props.$isHovered ? `0 8px 16px ${props.$color}40` : 'none'};
  transition: all 0.3s;
`;

export const ActionTextWrapper = styled.div`
  flex: 1;
  `;

export const ActionLabel = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: ${props => props.$variant === 'solid' ? (props.$isHovered ? 'white' : props.$color) : '#333'};
  margin-bottom: 4px;
  transition: color 0.3s;
`;

export const ActionSubText = styled.div`
  font-size: 14px;
  color: ${props => props.$variant === 'solid' ? (props.$isHovered ? 'rgba(255,255,255,0.9)' : '#666') : '#888'};
  font-weight: 500;
`;

export const ActionArrowWrapper = styled.div`
  opacity: ${props => props.$isHovered ? 1 : 0};
  transform: ${props => props.$isHovered ? 'translateX(0)' : 'translateX(-10px)'};
  transition: all 0.3s;
  color: ${props => props.$variant === 'solid' ? 'white' : props.$color};
`;
