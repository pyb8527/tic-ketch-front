import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { enterQueue, getQueueStatus } from '../api/queue';

interface QueueStatus {
  position: number;
  totalWaiting: number;
}

export default function QueuePage() {
  const { eventId } = useParams();
  const evId = Number(eventId);
  const navigate = useNavigate();

  const enteredRef = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [status, setStatus] = useState<QueueStatus | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isNaN(evId)) {
      setError('잘못된 이벤트 ID입니다.');
      return;
    }

    // Guard against React 18 StrictMode double-invoke
    if (enteredRef.current) return;
    enteredRef.current = true;

    const init = async () => {
      try {
        const initial = await enterQueue(evId);
        setStatus(initial);

        if (initial.position <= 1 || initial.position === -1) {
          navigate(`/events/${evId}/seats`, { replace: true });
          return;
        }

        intervalRef.current = setInterval(async () => {
          try {
            const latest = await getQueueStatus(evId);
            setStatus(latest);

            if (latest.position <= 1 || latest.position === -1) {
              if (intervalRef.current !== null) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
              }
              navigate(`/events/${evId}/seats`, { replace: true });
            }
          } catch (pollErr) {
            console.error('대기열 상태 조회 실패:', pollErr);
          }
        }, 1500);
      } catch (err) {
        setError(err instanceof Error ? err.message : '대기열 입장에 실패했습니다.');
      }
    };

    init();

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [evId, navigate]);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center" style={{ background: '#0f1117' }}>
        <div
          className="rounded-2xl p-8 text-center"
          style={{ background: '#1a1d27', maxWidth: '400px', width: '100%' }}
        >
          <p style={{ color: '#ff6b6b' }}>{error}</p>
        </div>
      </div>
    );
  }

  const position = status?.position ?? 0;
  const totalWaiting = status?.totalWaiting ?? 0;
  const isReady = position <= 1 || position === -1;

  return (
    <div className="flex min-h-screen items-center justify-center px-4" style={{ background: '#0f1117' }}>
      <div
        className="flex flex-col items-center gap-8 rounded-2xl p-10 text-center shadow-2xl"
        style={{ background: '#1a1d27', maxWidth: '420px', width: '100%' }}
      >
        {/* Spinner */}
        <div
          className="animate-spin rounded-full border-4 border-t-transparent"
          style={{
            width: '64px',
            height: '64px',
            borderColor: '#6c63ff',
            borderTopColor: 'transparent',
          }}
        />

        {/* Heading */}
        <h1 className="text-2xl font-bold" style={{ color: '#ffffff' }}>
          입장 대기 중
        </h1>

        {/* Position info */}
        <div className="flex flex-col items-center gap-1">
          {isReady ? (
            <p className="text-3xl font-bold" style={{ color: '#00d4aa' }}>
              곧 입장합니다
            </p>
          ) : (
            <>
              <p className="text-sm" style={{ color: '#8b8fa8' }}>
                내 앞
              </p>
              <p className="text-6xl font-bold leading-none" style={{ color: '#6c63ff' }}>
                {position - 1}
              </p>
              <p className="text-sm" style={{ color: '#8b8fa8' }}>
                명
              </p>
            </>
          )}
        </div>

        {/* Total waiting */}
        <p className="text-sm" style={{ color: '#8b8fa8' }}>
          총 대기 <span style={{ color: '#ffffff' }}>{totalWaiting}</span>명
        </p>

        {/* Note */}
        <p className="text-xs leading-relaxed" style={{ color: '#6b6f85' }}>
          잠시만 기다려 주세요. 순서가 되면 자동으로 입장합니다.
        </p>
      </div>
    </div>
  );
}
