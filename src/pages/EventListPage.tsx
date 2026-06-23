import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getEvents } from '../api/events';
import type { EventDto } from '../types/api';
import { categoryMeta, statusLabel } from '../lib/category';
import Button from '../components/ui/Button';
import { ErrorState, EmptyState, Skeleton } from '../components/ui/States';

function PosterCard({ event }: { event: EventDto }) {
  const [imgFailed, setImgFailed] = useState(false);
  const navigate = useNavigate();
  const cat = categoryMeta(event.category);
  const status = statusLabel(event.status);
  const showFallback = imgFailed || !event.posterUrl;

  return (
    <div
      className="group cursor-pointer overflow-hidden rounded-xl bg-[#1a1d27] shadow-md transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl"
      onClick={() => navigate(`/events/${event.id}`)}
    >
      {/* Poster image area */}
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        {showFallback ? (
          <div
            className="flex h-full w-full items-center justify-center text-5xl"
            style={{
              backgroundImage: `linear-gradient(135deg, ${cat.color}55 0%, #0f1117 100%)`,
            }}
          >
            {cat.emoji}
          </div>
        ) : (
          <img
            src={event.posterUrl ?? ''}
            alt={event.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => setImgFailed(true)}
          />
        )}
        {/* Category badge */}
        <span
          className="absolute left-2 top-2 flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold text-white shadow"
          style={{ backgroundColor: cat.color + 'cc' }}
        >
          {cat.emoji} {cat.label}
        </span>
      </div>

      {/* Info */}
      <div className="p-3">
        <h2 className="truncate font-semibold leading-snug text-white">{event.title}</h2>
        <p className="mt-1 truncate text-xs text-[#94a3b8]">{event.venue}</p>
        <p className="mt-0.5 text-xs text-[#94a3b8]">
          {new Date(event.eventDate).toLocaleString('ko-KR', { dateStyle: 'medium', timeStyle: 'short' })}
        </p>
        <span
          className="mt-2 inline-block rounded-full px-2 py-0.5 text-xs font-semibold"
          style={{ color: status.color, backgroundColor: status.color + '22' }}
        >
          {status.label}
        </span>
      </div>
    </div>
  );
}

function PosterSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl bg-[#1a1d27]">
      <Skeleton className="aspect-[3/4] w-full rounded-none" />
      <div className="p-3 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-3 w-2/3" />
      </div>
    </div>
  );
}

export default function EventListPage() {
  const [page, setPage] = useState(0);

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['events', page],
    queryFn: () => getEvents(page),
  });

  return (
    <div>
      <header className="mb-8">
        <h1 className="font-display text-3xl font-bold tracking-tight text-fg">공연 목록</h1>
        <p className="mt-1 text-sm text-fg-muted">지금 예매 가능한 공연을 만나보세요</p>
      </header>

      {isLoading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <PosterSkeleton key={i} />
          ))}
        </div>
      ) : isError ? (
        <ErrorState
          message={error instanceof Error ? error.message : '알 수 없는 오류'}
          onRetry={() => refetch()}
        />
      ) : !data || data.content.length === 0 ? (
        <EmptyState title="공연이 없습니다" message="새로운 공연이 곧 등록될 예정이에요" />
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {data.content.map((e: EventDto) => (
              <PosterCard key={e.id} event={e} />
            ))}
          </div>

          {data.totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-4">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setPage((p) => p - 1)}
                disabled={data.number === 0}
              >
                이전
              </Button>
              <span className="tabular text-sm text-fg-muted">
                {data.number + 1} / {data.totalPages}
              </span>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setPage((p) => p + 1)}
                disabled={data.number >= data.totalPages - 1}
              >
                다음
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
