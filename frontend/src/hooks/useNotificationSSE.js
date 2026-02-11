import { useEffect, useRef, useState } from 'react';

const useNotificationSSE = (token, onNotification) => {
  const [lastEventId, setLastEventId] = useState(null);
  const eventSourceRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);
  const reconnectAttemptsRef = useRef(0);
  const maxReconnectAttempts = 5;
  const baseReconnectDelay = 1000;

  useEffect(() => {
    if (!token) {
      return;
    }

    const connect = () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }

      const baseUrl = import.meta.env.DEV ? '' : 'http://localhost:8001';
      const url = new URL(`${baseUrl}/api/notifications/stream`);
      url.searchParams.append('token', token);
      if (lastEventId) {
        url.searchParams.append('lastEventId', lastEventId);
      }

      const eventSource = new EventSource(url.toString());

      eventSourceRef.current = eventSource;

      eventSource.onopen = () => {
        console.log('SSE 연결 성공');
        reconnectAttemptsRef.current = 0;
      };

      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (event.id) {
            setLastEventId(event.id);
          }
          if (onNotification) {
            onNotification(data);
          }
        } catch (error) {
          console.error('알림 데이터 파싱 실패:', error);
        }
      };

      eventSource.addEventListener('notification', (event) => {
        try {
          const data = JSON.parse(event.data);
          if (event.id) {
            setLastEventId(event.id);
          }
          if (onNotification) {
            onNotification(data);
          }
        } catch (error) {
          console.error('알림 이벤트 처리 실패:', error);
        }
      });

      eventSource.addEventListener('connect', (event) => {
        console.log('SSE 연결 확인:', event.data);
      });

      eventSource.onerror = (error) => {
        console.error('SSE 연결 에러:', error);
        eventSource.close();

        if (reconnectAttemptsRef.current < maxReconnectAttempts) {
          const delay = baseReconnectDelay * Math.pow(2, reconnectAttemptsRef.current);
          reconnectAttemptsRef.current += 1;
          console.log(`${delay}ms 후 재연결 시도 (${reconnectAttemptsRef.current}/${maxReconnectAttempts})`);

          reconnectTimeoutRef.current = setTimeout(() => {
            connect();
          }, delay);
        } else {
          console.error('최대 재연결 시도 횟수 초과');
        }
      };
    };

    connect();

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [token, lastEventId, onNotification]);

  return { lastEventId };
};

export default useNotificationSSE;

