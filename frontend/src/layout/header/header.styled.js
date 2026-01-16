import styled from 'styled-components';

export const HeaderContainer = styled.header`
  background: white;
  padding: 20px 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  box-sizing: border-box;
`;

export const Breadcrumb = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
`;

export const BreadcrumbItem = styled.span`
  color: ${props => props.$active ? '#333' : '#999'};
  font-weight: ${props => props.$active ? '600' : '400'};
`;

export const BreadcrumbSeparator = styled.span`
  color: #ccc;
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

export const SearchIconButton = styled.button`
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;

  &:hover {
    color: #4A90E2;
  }
`;

export const NotificationBadge = styled.div`
  position: relative;
  cursor: pointer;
`;

export const NotificationIcon = styled.div`
  font-size: 24px;
`;

export const Badge = styled.span`
  position: absolute;
  top: -4px;
  right: -4px;
  background: #FF4757;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 600;
`;

export const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
`;

export const UserAvatar = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4A90E2 0%, #357ABD 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 16px;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UserName = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #333;
`;

export const UserRole = styled.div`
  font-size: 13px;
  color: #999;
`;