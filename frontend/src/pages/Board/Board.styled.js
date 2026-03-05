import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${({ theme }) => theme.background.secondary};
  width: 100%;
`;

export const MainContent = styled.main`
  width: 100%;
  flex: 1;
  min-height: 100vh;
`;

export const ContentWrapper = styled.div`
  padding: 48px;
  max-width: 1600px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: 1440px) {
    padding: 32px;
  }
`;

export const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

export const PageTitle = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: ${({ theme }) => theme.text.primary};
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const CreateButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.text.inverse || 'white'};
  border: none;
  padding: 12px 28px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: ${({ theme }) => theme.shadow};

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover || theme.colors.primary};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadowLg};
  }
`;

export const TabSection = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
`;

export const Tab = styled.button`
  padding: 10px 20px;
  border: 2px solid ${({ theme, $active }) => $active ? theme.colors.primary : theme.border};
  background: ${({ theme, $active }) => $active ? theme.colors.primary : theme.background.paper};
  color: ${({ theme, $active }) => $active ? (theme.text.inverse || 'white') : theme.text.secondary};
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme, $active }) => $active ? (theme.text.inverse || 'white') : theme.colors.primary};
  }
`;

export const SearchSection = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 32px;
  align-items: center;
`;

export const SearchForm = styled.form`
  flex: 1;
  display: flex;
  max-width: 600px;
`;

export const SearchInput = styled.input`
  flex: 1;
  padding: 14px 20px;
  border: 2px solid ${({ theme }) => theme.border};
  border-right: none;
  border-radius: 8px 0 0 8px;
  font-size: 15px;
  outline: none;
  transition: border-color 0.2s;
  background: ${({ theme }) => theme.background.paper};
  color: ${({ theme }) => theme.text.primary};

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.text.disabled || theme.text.tertiary};
  }
`;

export const SearchButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.text.inverse || 'white'};
  border: none;
  padding: 14px 24px;
  border-radius: 0 8px 8px 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover || theme.colors.primary};
  }
`;

export const FilterButton = styled.button`
  padding: 12px 24px;
  border: 2px solid ${({ theme, $active }) => $active ? theme.colors.primary : theme.border};
  background: ${({ theme, $active }) => $active ? theme.colors.primary : theme.background.paper};
  color: ${({ theme, $active }) => $active ? (theme.text.inverse || 'white') : theme.text.secondary};
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme, $active }) => $active ? (theme.text.inverse || 'white') : theme.colors.primary};
  }
`;

export const BoardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 48px;
`;

export const BoardItem = styled.div`
  background: ${({ theme }) => theme.background.paper};
  border-radius: 12px;
  padding: 24px 28px;
  display: flex;
  gap: 20px;
  align-items: center;
  box-shadow: ${({ theme }) => theme.shadowSm};
  transition: all 0.2s;
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.border};

  &:hover {
    box-shadow: ${({ theme }) => theme.shadow};
    transform: translateY(-2px);
  }
`;

export const CategoryBadge = styled.div`
  background: ${({ theme }) => `${theme.colors.primary}15`};
  color: ${({ theme }) => theme.colors.primary};
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
  min-width: 80px;
  text-align: center;
`;

export const BoardContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const BoardTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.text.primary};
  margin: 0;
  line-height: 1.5;
`;

export const BoardMetaRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const BoardMeta = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

export const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: ${({ theme }) => theme.text.secondary};
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 48px;
`;

export const PaginationButton = styled.button`
  width: 40px;
  height: 40px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.background.paper};
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  color: ${({ theme }) => theme.text.secondary};
  transition: all 0.2s;

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export const PageNumber = styled.button`
  width: 40px;
  height: 40px;
  border: 1px solid ${({ theme, $active }) => $active ? theme.colors.primary : theme.border};
  background: ${({ theme, $active }) => $active ? theme.colors.primary : theme.background.paper};
  color: ${({ theme, $active }) => $active ? (theme.text.inverse || 'white') : theme.text.secondary};
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: ${({ $active }) => $active ? '600' : '500'};
  transition: all 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme, $active }) => $active ? (theme.text.inverse || 'white') : theme.colors.primary};
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex; align-items: center; justify-content: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  background: ${({ theme }) => theme.background.paper};
  width: 560px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 32px;
  border-radius: 16px;
  box-shadow: ${({ theme }) => theme.shadowLg};
  border: 1px solid ${({ theme }) => theme.border};
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

export const ModalTitle = styled.h3`
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.text.primary};
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: ${({ theme }) => theme.text.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 6px;
  transition: all 0.2s;

  &:hover {
    background: ${({ theme }) => theme.background.hover};
    color: ${({ theme }) => theme.text.primary};
  }
`;

export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const PostForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const FormLabel = styled.label`
  font-weight: 600;
  font-size: 14px;
  color: ${({ theme }) => theme.text.primary};
`;

export const FormSelect = styled.select`
  padding: 10px 14px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  font-size: 14px;
  background: ${({ theme }) => theme.background.paper};
  color: ${({ theme }) => theme.text.primary};
  outline: none;
  cursor: pointer;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const FormInput = styled.input`
  padding: 10px 14px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  font-size: 14px;
  background: ${({ theme }) => theme.background.paper};
  color: ${({ theme }) => theme.text.primary};
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &[type="file"] {
    padding: 8px;
    cursor: pointer;
  }
`;

export const FormTextarea = styled.textarea`
  padding: 10px 14px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  font-size: 14px;
  background: ${({ theme }) => theme.background.paper};
  color: ${({ theme }) => theme.text.primary};
  outline: none;
  resize: vertical;
  font-family: inherit;
  transition: border-color 0.2s;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 8px;
`;

export const CancelButton = styled.button`
  padding: 10px 20px;
  background: ${({ theme }) => theme.background.secondary};
  color: ${({ theme }) => theme.text.secondary};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.2s;

  &:hover {
    background: ${({ theme }) => theme.background.hover};
  }
`;

export const SubmitButton = styled.button`
  padding: 10px 20px;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.text.inverse || 'white'};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover || theme.colors.primary};
  }
`;
