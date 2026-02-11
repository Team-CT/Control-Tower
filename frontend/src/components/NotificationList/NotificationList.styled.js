import styled from 'styled-components';

export const NotificationListContainer = styled.div`
  max-height: 500px;
  overflow-y: auto;
`;

export const NotificationItem = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 12px 16px;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: background-color 0.2s;
  background-color: ${({ $isUnread }) => ($isUnread ? '#f8f9ff' : 'white')};

  &:hover {
    background-color: ${({ $isUnread }) => ($isUnread ? '#f0f2ff' : '#f5f5f5')};
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const NotificationContent = styled.div`
  flex: 1;
  min-width: 0;
`;

export const NotificationText = styled.p`
  margin: 0 0 4px 0;
  font-size: 14px;
  color: #333;
  line-height: 1.4;
  word-wrap: break-word;
`;

export const NotificationMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #999;
`;

export const NotificationTime = styled.span``;

export const NotificationType = styled.span`
  padding: 2px 6px;
  background-color: #e3f2fd;
  color: #1976d2;
  border-radius: 4px;
  font-size: 11px;
`;

export const DeleteButton = styled.button`
  margin-left: 8px;
  width: 24px;
  height: 24px;
  border: none;
  background: transparent;
  color: #999;
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background-color: #ffebee;
    color: #d32f2f;
  }
`;

export const EmptyState = styled.div`
  padding: 40px 20px;
  text-align: center;
`;

export const EmptyText = styled.p`
  margin: 0;
  color: #999;
  font-size: 14px;
`;

