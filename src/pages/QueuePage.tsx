import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { enterQueue, getQueueStatus } from '../api/queue';

export default function QueuePage() {
  const { eventId } = useParams();
  const evId = Number(eventId);
  const navigate = useNavigate();

  const [entered, setEntered] = useState(false);

  const { data: queueStatus } = useQuery({
    queryKey: ['queue', evId],
    queryFn: () => getQueueStatus(evId),
    refetchInterval: 2000,
    enabled: entered,
  });

  const handleEnterQueue = async () => {
    try {
      await enterQueue(evId);
      setEntered(true);
    } catch (err) {
      alert(err instanceof Error ? err.message : '대기열 입장에 실패했습니다.');
    }
  };

  const position = queueStatus?.position ?? -1;
  const totalWaiting = queueStatus?.totalWaiting ?? 0;
  const canEnter = entered && position !== -1 && position <= 1;

  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-surface rounded-2xl shadow-lg flex flex-col items-center gap-8">
      <h1 className="text-2xl font-bold text-gray-200">대기열</h1>

      {!entered ? (
        <div className="flex flex-col items-center gap-4">
          <p className="text-muted text-center">
            이 공연의 좌석 선택을 위해 대기열에 입장하세요.
          </p>
          <button
            onClick={handleEnterQueue}
            className="px-8 py-3 bg-accent hover:bg-accent/80 text-white font-semibold rounded-xl transition-colors"
          >
            대기열 입장
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-6 w-full">
          {position === -1 ? (
            <p className="text-muted text-lg">대기열에 없음</p>
          ) : (
            <>
              <div className="flex flex-col items-center gap-2">
                <p className="text-muted text-sm">내 순번</p>
                <p className="text-5xl font-bold text-accent">{position}</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <p className="text-muted text-sm">전체 대기</p>
                <p className="text-2xl font-semibold text-gray-200">{totalWaiting}명</p>
              </div>

              {canEnter ? (
                <div className="flex flex-col items-center gap-4 mt-4">
                  <p className="text-accent2 text-lg font-semibold animate-pulse">
                    입장 가능!
                  </p>
                  <button
                    onClick={() => navigate(`/events/${evId}/seats`)}
                    className="px-8 py-3 bg-accent2 hover:bg-accent2/80 text-white font-semibold rounded-xl transition-colors"
                  >
                    좌석 선택하러 가기
                  </button>
                </div>
              ) : (
                <p className="text-muted text-sm text-center">
                  순번이 되면 자동으로 입장 가능 안내가 표시됩니다.
                </p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
