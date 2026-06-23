import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getEvents } from '../api/events';
import type { EventDto, EventStatus } from '../types/api';

function statusBadge(status: EventStatus): string {
  switch (status) {
    case 'ON_SALE':
      return 'bg-accent2 text-bg';
    case 'UPCOMING':
      return 'bg-accent text-white';
    case 'SOLD_OUT':
    case 'ENDED':
      return 'bg-muted text-bg';
    default:
      return 'bg-muted text-bg';
  }
}

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

export default function EventListPage() {
  const [page, setPage] = useState(0);
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['events', page],
    queryFn: () => getEvents(page),
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
    <div>
      <h1 className="text-3xl font-bold mb-8 text-gray-100">공연 목록</h1>

      {data.content.length === 0 ? (
        <p className="text-muted text-center py-20">공연이 없습니다.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.content.map((e: EventDto) => (
            <div
              key={e.id}
              onClick={() => navigate(`/events/${e.id}`)}
              className="bg-surface rounded-xl p-5 cursor-pointer hover:ring-2 hover:ring-accent transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <h2 className="text-lg font-semibold text-gray-100 flex-1 mr-2 leading-snug">
                  {e.title}
                </h2>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap ${statusBadge(e.status)}`}
                >
                  {statusLabel(e.status)}
                </span>
              </div>
              <p className="text-muted text-sm mb-1">{e.venue}</p>
              <p className="text-gray-400 text-sm">
                {new Date(e.eventDate).toLocaleString('ko-KR')}
              </p>
            </div>
          ))}
        </div>
      )}

      {data.totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={() => setPage((p) => p - 1)}
            disabled={data.number === 0}
            className="px-4 py-2 rounded-lg bg-surface text-gray-200 disabled:opacity-40 hover:bg-accent hover:text-white transition-colors disabled:cursor-not-allowed"
          >
            이전
          </button>
          <span className="text-muted text-sm">
            {data.number + 1} / {data.totalPages}
          </span>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={data.number >= data.totalPages - 1}
            className="px-4 py-2 rounded-lg bg-surface text-gray-200 disabled:opacity-40 hover:bg-accent hover:text-white transition-colors disabled:cursor-not-allowed"
          >
            다음
          </button>
        </div>
      )}
    </div>
  );
}
