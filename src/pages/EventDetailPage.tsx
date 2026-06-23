import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getEvent } from '../api/events';
import { categoryMeta, statusLabel } from '../lib/category';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { ErrorState, LoadingState } from '../components/ui/States';

function Poster({ posterUrl, category }: { posterUrl: string | null; category: string }) {
  const [imgFailed, setImgFailed] = useState(false);
  const cat = categoryMeta(category);
  const showFallback = imgFailed || !posterUrl;

  return (
    <div className="w-full overflow-hidden rounded-xl">
      {showFallback ? (
        <div
          className="flex aspect-[3/4] w-full items-center justify-center text-7xl"
          style={{
            backgroundImage: `linear-gradient(135deg, ${cat.color}55 0%, #0f1117 100%)`,
          }}
        >
          {cat.emoji}
        </div>
      ) : (
        <img
          src={posterUrl ?? ''}
          alt=""
          className="aspect-[3/4] w-full object-cover"
          onError={() => setImgFailed(true)}
        />
      )}
    </div>
  );
}

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const eventId = Number(id);

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['event', eventId],
    queryFn: () => getEvent(eventId),
    enabled: !isNaN(eventId),
  });

  if (isNaN(eventId)) {
    return <ErrorState title="잘못된 접근" message="유효하지 않은 공연 ID입니다." />;
  }
  if (isLoading) return <LoadingState />;
  if (isError) {
    return (
      <ErrorState
        message={error instanceof Error ? error.message : '알 수 없는 오류'}
        onRetry={() => refetch()}
      />
    );
  }
  if (!data) return null;

  const cat = categoryMeta(data.category);
  const status = statusLabel(data.status);
  const bookable = data.status === 'ON_SALE' || data.status === 'UPCOMING';

  return (
    <div className="mx-auto max-w-3xl animate-fade-in">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 inline-flex items-center gap-1 rounded-md text-sm text-fg-muted transition-colors hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
      >
        <span aria-hidden>←</span> 목록으로
      </button>

      <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
        {/* Poster */}
        <div className="w-full sm:w-56 shrink-0">
          <Poster posterUrl={data.posterUrl} category={data.category} />
        </div>

        {/* Info */}
        <Card elevated className="flex-1 p-6">
          {/* Category badge */}
          <span
            className="mb-3 inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-semibold"
            style={{ color: cat.color, backgroundColor: cat.color + '22' }}
          >
            {cat.emoji} {cat.label}
          </span>

          <h1 className="break-keep font-display text-2xl font-bold leading-tight text-fg">
            {data.title}
          </h1>

          <dl className="mt-5 space-y-3 border-t border-border pt-5">
            <div className="flex gap-3">
              <dt className="w-14 shrink-0 text-sm text-fg-muted">장소</dt>
              <dd className="text-fg">{data.venue}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-14 shrink-0 text-sm text-fg-muted">일시</dt>
              <dd className="tabular text-fg">
                {new Date(data.eventDate).toLocaleString('ko-KR', { dateStyle: 'medium', timeStyle: 'short' })}
              </dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-14 shrink-0 text-sm text-fg-muted">상태</dt>
              <dd>
                <span
                  className="rounded-full px-2 py-0.5 text-sm font-semibold"
                  style={{ color: status.color, backgroundColor: status.color + '22' }}
                >
                  {status.label}
                </span>
              </dd>
            </div>
          </dl>

          <div className="mt-6">
            <Button
              size="lg"
              fullWidth
              onClick={() => navigate(`/queue/${eventId}`)}
              disabled={!bookable}
            >
              입장하기
            </Button>
            <p className="mt-2 text-center text-xs text-fg-subtle">
              대기열이 있으면 잠시 대기 후 입장합니다.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
