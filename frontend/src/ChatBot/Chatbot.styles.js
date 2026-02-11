import styled from 'styled-components';

export const ChatIcon = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  background-color: ${(props) => props.theme.colors?.primary || '#003366'};
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  z-index: 9999;
  transition: transform 0.2s;
  &:hover { transform: scale(1.1); }
`;

export const ChatWindow = styled.div`
  position: fixed;
  bottom: 100px;
  right: 30px;
  width: 350px;
  height: 500px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 9999;
`;

export const ChatHeader = styled.div`
  background: ${(props) => props.theme.colors?.primary || '#003366'};
  color: white;
  padding: 15px;
  font-weight: bold;
`;

export const MessageArea = styled.div`
  flex: 1;
  padding: 15px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: #f8f9fa;
`;

export const MessageBubble = styled.div`
  max-width: 80%;
  padding: 10px 15px;
  border-radius: 15px;
  font-size: 14px;
  line-height: 1.4;
  align-self: ${props => props.$isBot ? 'flex-start' : 'flex-end'};
  background: ${props => props.$isBot ? '#e9ecef' : (props.theme.colors?.primary || '#003366')};
  color: ${props => props.isBot ? '#333' : 'white'};
`;

export const InputArea = styled.div`
  padding: 15px;
  border-top: 1px solid #eee;
  display: flex;
  gap: 5px;
  input {
    flex: 1;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 8px;
    outline: none;
  }
  button {
    background: ${(props) => props.theme.colors?.primary || '#003366'};
    color: white;
    border: none;
    padding: 8px 15px;
    border-radius: 5px;
    cursor: pointer;
  }
`;