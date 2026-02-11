import styled from 'styled-components';

export const MainContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: var(--bg-secondary);
  padding: 40px 60px;

  @media (max-width: 1024px) {
    padding: 24px 20px;
  }
`;

export const ContentWrapper = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  background: var(--bg-main);
  border-radius: 16px;
  box-shadow: 0 2px 12px var(--shadow-color);
  overflow: hidden;
`;

export const TabContainer = styled.div`
  display: flex;
  border-bottom: 2px solid #e5e9f0;
  background: #fafbfc;
`;

export const Tab = styled.button`
  flex: 1;
  padding: 20px 32px;
  font-size: 16px;
  font-weight: ${(props) => (props.$active ? '600' : '400')};
  color: ${(props) => (props.$active ? 'var(--color-primary)' : 'var(--text-secondary)')};
  background: ${(props) => (props.$active ? 'var(--bg-main)' : 'transparent')};
  border: none;
  border-bottom: ${(props) =>
    props.$active ? '3px solid var(--color-primary)' : '3px solid transparent'};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) => (props.$active ? 'var(--bg-main)' : 'var(--bg-hover)')};
    color: var(--color-primary);
  }

  @media (max-width: 768px) {
    padding: 16px 20px;
    font-size: 14px;
  }
`;

export const TabContent = styled.div`
  padding: 40px 60px;
  @media (max-width: 1024px) {
    padding: 32px 24px;
  }
`;

// ===== Profile Section =====
export const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const ProfileHeader = styled.div`
  h2 {
    font-size: 24px;
    font-weight: 700;
    color: #1e293b;
    margin: 0;
  }
`;

export const ProfileAvatar = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
  cursor: pointer;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

export const InputRow = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  width: 100%;
`;

export const SmallButton = styled.button`
  flex-shrink: 0;
  padding: 10px 14px;
  font-size: 13px;
  font-weight: 700;
  color: var(--text-inverse);
  background: var(--color-primary);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  /* 입력창 높이(12px 상하 패딩 + 폰트)와 비슷하게 맞춤 */
  height: 44px;

  &:hover {
    filter: brightness(1.08);
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 768px) {
    height: 42px;
    padding: 10px 12px;
    font-size: 12px;
  }
`;

export const AvatarCircle = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(37, 99, 235, 0.3);
`;

export const AvatarInitial = styled.div`
  font-size: 48px;
  font-weight: 700;
  color: #ffffff;
`;

export const CameraIcon = styled.div`
  position: absolute;
  bottom: 4px;
  right: 4px;
  width: 36px;
  height: 36px;
  background: #ffffff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px 40px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

export const InfoRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  grid-column: ${(props) => (props.$fullWidth ? '1 / -1' : 'auto')};
`;

export const InfoLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #475569;
`;

export const InfoValue = styled.div`
  width: 100%;
`;

export const FormInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  font-size: 15px;
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  transition: all 0.2s ease;

  /* ✅ 기본: 입력 가능 */
  background: var(--bg-input);
  cursor: text;

  &:focus {
    outline: none;
    border-color: var(--color-primary);
    background: var(--bg-main);
    box-shadow: 0 0 0 3px var(--shadow-color);
  }

  &::placeholder {
    color: #94a3b8;
  }

  /* ✅ 입력 불가(읽기 전용): 배경색/커서/선택만 막기 */
  &[readonly] {
    background: #f3f4f6;
    color: #6b7280;
    cursor: default;
    user-select: none;
  }

  /* ✅ 완전 비활성(disabled): 더 진하게 + 커서 */
  &:disabled {
    background: #e5e7eb;
    color: #9ca3af;
    cursor: not-allowed;
  }

  /* ✅ readOnly/disabled는 포커스 스타일이 불필요하니 제거(선택) */
  &[readonly]:focus,
  &:disabled:focus {
    box-shadow: none;
    border-color: var(--border-color);
    background: inherit;
  }
`;

export const AddressTextarea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  font-size: 15px;
  font-family: inherit;
  color: #1e293b;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  resize: vertical;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    background: #ffffff;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  padding-top: 20px;
  border-top: 1px solid #e5e9f0;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const CancelButton = styled.button`
  padding: 12px 32px;
  font-size: 15px;
  font-weight: 600;
  color: #64748b;
  background: #f1f5f9;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #e2e8f0;
    border-color: #94a3b8;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const SaveButton = styled.button`
  padding: 12px 32px;
  font-size: 15px;
  font-weight: 600;
  color: var(--text-inverse);
  background: var(--color-primary);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px var(--shadow-color);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px var(--shadow-color);
    filter: brightness(1.1);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

// ===== Security Section =====
export const SecuritySection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const SecurityCard = styled.div`
  background: #ffffff;
  border: 1px solid #e5e9f0;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  }
`;

export const SecurityCardHeader = styled.div`
  padding: 20px 24px;
  background: #f8fafc;
  border-bottom: 1px solid #e5e9f0;

  h3 {
    font-size: 18px;
    font-weight: 700;
    color: #1e293b;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

export const SecurityCardBody = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const SecurityItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid #f1f5f9;

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 16px;
  }
`;

export const SecurityItemLeft = styled.div`
  flex: 1;
  min-width: 0;
`;

export const SecurityItemRight = styled.div`
  flex-shrink: 0;
  min-width: 300px;

  @media (max-width: 1024px) {
    width: 100%;
    min-width: unset;
  }
`;

export const SecurityItemTitle = styled.h4`
  font-size: 15px;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 6px 0;
`;

export const SecurityItemDescription = styled.p`
  font-size: 14px;
  color: #64748b;
  margin: 0;
  line-height: 1.6;
`;

export const PasswordInputGroup = styled.div`
  width: 100%;
`;

export const PasswordInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  font-size: 15px;
  color: #1e293b;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    background: #ffffff;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

export const ChangePasswordButton = styled.button`
  padding: 12px 32px;
  font-size: 15px;
  font-weight: 600;
  color: var(--text-inverse);
  background: var(--color-primary);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px var(--shadow-color);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px var(--shadow-color);
    filter: brightness(1.1);
  }
`;

export const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 56px;
  height: 28px;
  cursor: pointer;
`;

export const ToggleSlider = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${(props) => (props.checked ? 'var(--color-primary)' : 'var(--border-color)')};
  border-radius: 28px;
  transition: all 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    height: 22px;
    width: 22px;
    left: ${(props) => (props.checked ? '30px' : '3px')};
    bottom: 3px;
    background: #ffffff;
    border-radius: 50%;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

export const ThemeSelector = styled.div`
  display: flex;
  gap: 12px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const ThemeOption = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

export const ThemeRadio = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: #3b82f6;
`;

export const ThemeLabel = styled.span`
  font-size: 14px;
  color: #475569;
  font-weight: 500;
`;

export const LanguageSelect = styled.select`
  width: 100%;
  padding: 12px 16px;
  font-size: 15px;
  color: #1e293b;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    background: #ffffff;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

export const NotificationPreferences = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const NotificationItem = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  cursor: pointer;
  padding: 16px;
  background: #f8fafc;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: #f1f5f9;
  }
`;

export const NotificationCheckbox = styled.input`
  width: 20px;
  height: 20px;
  margin-top: 2px;
  cursor: pointer;
  accent-color: #3b82f6;
`;

export const DangerZone = styled.div`
  background: #fff5f5;
  border: 2px solid #fee2e2;
  border-radius: 12px;
  overflow: hidden;

  ${SecurityCardHeader} {
    background: #fef2f2;
    border-bottom-color: #fecaca;

    h3 {
      color: #991b1b;
    }
  }
`;

export const DangerButton = styled.button`
  padding: 10px 24px;
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
  background: #dc2626;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #b91c1c;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(220, 38, 38, 0.3);
  }
`;