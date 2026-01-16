import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: #f5f7fa;
  width: 100%;
`;

export const Sidebar = styled.aside`
  width: 280px;
  background: linear-gradient(180deg, #4A90E2 0%, #357ABD 100%);
  color: white;
  padding: 32px 0;
  position: fixed;
  height: 100vh;
  overflow-y: auto;
  box-shadow: 4px 0 12px rgba(0, 0, 0, 0.1);

  @media (max-width: 1024px) {
    width: 240px;
  }
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 24px;
  margin-bottom: 48px;
`;

export const LogoIcon = styled.div`
  font-size: 32px;
`;

export const LogoText = styled.div`
  font-size: 22px;
  font-weight: 700;
  line-height: 1.2;
`;

export const LogoSubtext = styled.div`
  font-size: 11px;
  font-weight: 400;
  opacity: 0.85;
  margin-top: 2px;
`;

export const NavDivider = styled.div`
  font-size: 12px;
  font-weight: 600;
  opacity: 0.7;
  padding: 16px 24px 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const NavSection = styled.nav`
  margin-bottom: 24px;
`;

export const NavItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 24px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 15px;
  font-weight: 500;
  background: ${props => props.active ? 'rgba(255, 255, 255, 0.15)' : 'transparent'};
  border-left: 4px solid ${props => props.active ? '#fff' : 'transparent'};

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

export const NavIcon = styled.span`
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
`;

export const MainContent = styled.main`
  margin-left: 280px;
  flex: 1;
  width: calc(100% - 280px);
  min-height: 100vh;

  @media (max-width: 1024px) {
    margin-left: 240px;
    width: calc(100% - 240px);
  }
`;

export const Header = styled.header`
  background: white;
  padding: 20px 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 100;
`;

export const Breadcrumb = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  max-width: 600px;
`;

export const BreadcrumbItem = styled.span`
  color: ${props => props.active ? '#333' : '#999'};
  font-weight: ${props => props.active ? '600' : '400'};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
`;

export const BreadcrumbSeparator = styled.span`
  color: #ccc;
  flex-shrink: 0;
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

export const SearchIconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SearchIcon = styled.span`
  font-size: 20px;
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

export const ContentWrapper = styled.div`
  padding: 48px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: 1440px) {
    padding: 32px;
  }
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: white;
  border: 2px solid #E5E8EB;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: 24px;

  &:hover {
    border-color: #4A90E2;
    color: #4A90E2;
  }
`;

export const PostCard = styled.article`
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  margin-bottom: 32px;
`;

export const PostHeader = styled.div`
  padding: 40px 48px 32px;
  border-bottom: 1px solid #E5E8EB;
`;

export const CategoryBadge = styled.div`
  display: inline-block;
  background: ${props => props.bgColor || '#E5F3FF'};
  color: ${props => {
    if (props.bgColor === '#FFE5E5') return '#D32F2F';
    if (props.bgColor === '#FFF9E5') return '#F57C00';
    return '#1976D2';
  }};
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 16px;
`;

export const PostTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #222;
  margin: 0 0 20px 0;
  line-height: 1.4;

  @media (max-width: 1024px) {
    font-size: 26px;
  }
`;

export const PostMeta = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
`;

export const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #666;
`;

export const MetaIcon = styled.span`
  font-size: 16px;
`;

export const PostBody = styled.div`
  padding: 48px;
  font-size: 16px;
  line-height: 1.8;
  color: #333;

  @media (max-width: 1024px) {
    padding: 32px;
    font-size: 15px;
  }
`;

export const GreetingText = styled.p`
  font-size: 16px;
  color: #333;
  margin-bottom: 24px;
  font-weight: 500;
`;

export const ContentParagraph = styled.p`
  margin-bottom: 32px;
  line-height: 1.8;
  color: #444;
`;

export const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #222;
  margin: 40px 0 20px 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ScheduleList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 32px 0;
`;

export const ScheduleItem = styled.li`
  padding: 14px 20px;
  background: #F8F9FA;
  border-radius: 8px;
  margin-bottom: 12px;
  display: flex;
  gap: 12px;
  align-items: baseline;
`;

export const ScheduleTitle = styled.span`
  font-weight: 700;
  color: #4A90E2;
  min-width: 80px;
`;

export const SchedulePeriod = styled.span`
  color: #555;
`;

export const LocationList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 32px 0;
`;

export const LocationItem = styled.li`
  padding: 14px 20px;
  background: #F8F9FA;
  border-radius: 8px;
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const LocationTitle = styled.span`
  font-weight: 700;
  color: #4A90E2;
`;

export const LocationAddress = styled.span`
  color: #555;
  font-size: 15px;
`;

export const ExamList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 32px 0;
`;

export const ExamItem = styled.li`
  padding: 12px 0 12px 24px;
  position: relative;
  color: #555;

  &:before {
    content: '•';
    position: absolute;
    left: 8px;
    color: #4A90E2;
    font-weight: bold;
  }
`;

export const PrecautionSection = styled.div`
  background: #FFF9E5;
  border-left: 4px solid #F57C00;
  padding: 24px;
  border-radius: 8px;
  margin: 32px 0;
`;

export const PrecautionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
`;

export const PrecautionTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #F57C00;
  margin: 0;
`;

export const PrecautionList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const PrecautionItem = styled.li`
  padding: 10px 0 10px 24px;
  position: relative;
  color: #555;

  &:before {
    content: '⚠';
    position: absolute;
    left: 0;
    color: #F57C00;
  }
`;

export const ContactSection = styled.div`
  background: #E5F3FF;
  padding: 24px;
  border-radius: 8px;
  margin: 32px 0;
`;

export const ContactTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #1976D2;
  margin: 0 0 12px 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ContactText = styled.p`
  color: #555;
  margin-bottom: 16px;
  line-height: 1.6;
`;

export const ContactList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ContactItem = styled.div`
  display: flex;
  gap: 12px;
  align-items: baseline;
`;

export const ContactLabel = styled.span`
  font-weight: 700;
  color: #1976D2;
  min-width: 140px;
`;

export const ContactValue = styled.span`
  color: #555;
`;

export const ClosingText = styled.p`
  margin-top: 40px;
  margin-bottom: 12px;
  line-height: 1.8;
  color: #444;
`;

export const SignatureText = styled.p`
  font-weight: 600;
  color: #333;
  margin: 0;
`;

export const PostFooter = styled.div`
  padding: 24px 48px;
  border-top: 1px solid #E5E8EB;
  background: #FAFBFC;
`;

export const PostStats = styled.div`
  display: flex;
  gap: 16px;
`;

export const StatButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: white;
  border: 2px solid ${props => props.active ? '#FF4757' : '#E5E8EB'};
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.active ? '#FF4757' : '#666'};

  &:hover {
    border-color: ${props => props.active ? '#FF4757' : '#4A90E2'};
    color: ${props => props.active ? '#FF4757' : '#4A90E2'};
  }
`;

export const StatCount = styled.span`
  font-weight: 700;
`;

export const ActionButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
`;

export const ListButton = styled.button`
  padding: 14px 32px;
  background: white;
  border: 2px solid #E5E8EB;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #4A90E2;
    color: #4A90E2;
  }
`;

export const EditButton = styled.button`
  padding: 14px 32px;
  background: #FF4757;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  color: white;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 12px rgba(255, 71, 87, 0.3);

  &:hover {
    background: #E63946;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(255, 71, 87, 0.4);
  }
`;