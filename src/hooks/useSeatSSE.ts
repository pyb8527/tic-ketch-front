import { useEffect } from 'react';

/**
 * 좌석 상태 변화를 서버-센트 이벤트로 감지하는 훅.
 * 호출부에서 onSeatUpdate를 useCallback으로 감싸서 쓰기를 권장 (재연결 방지).
 */
export function useSeatSSE(eventId: number, onSeatUpdate: () => void): void {
  useEffect(() => {
    const base = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080';
    const es = new EventSource(`${base}/api/events/${eventId}/seats/stream`);

    es.addEventListener('seat-status', () => {
      onSeatUpdate();
    });

    es.addEventListener('error', () => {
      // 브라우저 자동 재연결을 방해하지 않도록 무음 처리
    });

    return () => {
      es.close();
    };
  }, [eventId, onSeatUpdate]);
}
