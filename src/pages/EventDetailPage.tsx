import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getEvent } from '../api/events';
import type { EventStatus } from '../types/api';

function statusLabel(status: EventStatus): string {
  switch (status) {
    case 'ON_SALE':
      return '판매 중';
    case 'UPCOMING':
      return '예정';
    case 'SOLD_OUT':
      return '매진';
    case 'ENDED':
      return '종료';
    default:
      return status;
  }
}

function statusColor(status: EventStatus): string {
  switch (status) {
    case 'ON_SALE':
      return 'text-accent2';
    case 'UPCOMING':
      return 'text-accent';
    case 'SOLD_OUT':
    case 'ENDED':
      return 'text-muted';
    default:
      return 'text-muted';
  }
}

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const eventId = Number(id);

  if (isNaN(eventId)) {
    return (
      <div className="py-20 text-center text-danger">
        유효하지 않은 공연 ID입니다.
      </div>
    );
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['event', eventId],
    queryFn: () => getEvent(eventId),
    enabled: !isNaN(eventId),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20 text-muted">
        로딩 중...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-20 text-center text-danger">
        오류가 발생했습니다: {error instanceof Error ? error.message : '알 수 없는 오류'}
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-surface rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-gray-100 mb-6">{data.title}</h1>

        <dl className="space-y-4 mb-8">
          <div className="flex gap-3">
            <dt className="text-muted w-16 shrink-0">장소</dt>
            <dd className="text-gray-200">{data.venue}</dd>
          </div>
          <div className="flex gap-3">
            <dt className="text-muted w-16 shrink-0">일시</dt>
            <dd className="text-gray-200">
              {new Date(data.eventDate).toLocaleString('ko-KR')}
            </dd>
          </div>
          <div className="flex gap-3">
            <dt className="text-muted w-16 shrink-0">상태</dt>
            <dd className={`font-semibold ${statusColor(data.status)}`}>
              {statusLabel(data.status)}
            </dd>
          </div>
        </dl>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => navigate(`/events/${eventId}/seats`)}
            className="flex-1 py-3 px-6 bg-accent text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
          >
            좌석 선택
          </button>
          <button
            onClick={() => navigate(`/queue/${eventId}`)}
            className="flex-1 py-3 px-6 bg-accent2 text-bg font-semibold rounded-xl hover:opacity-90 transition-opacity"
          >
            대기열 입장
          </button>
        </div>
      </div>
    </div>
  );
}
