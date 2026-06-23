import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getEvents } from '../api/events';
import type { EventDto } from '../types/api';
import { categoryMeta, statusLabel } from '../lib/category';
import { ErrorState, EmptyState, Skeleton } from '../components/ui/States';

/* ─── Constants ─────────────────────────────────────────── */
const CATEGORY_ORDER = ['CONCERT', 'MUSICAL', 'SPORTS', 'EXHIBITION'] as const;
type CategoryKey = typeof CATEGORY_ORDER[number] | 'ALL';

/* ─── EventCard ─────────────────────────────────────────── */
interface EventCardProps {
  event: EventDto;
  rank?: number;
}

function EventCard({ event, rank }: EventCardProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const navigate = useNavigate();
  const cat = categoryMeta(event.category);
  const st = statusLabel(event.status);
  const showFallback = imgFailed || !event.posterUrl;

  return (
    <div
      className="group cursor-pointer overflow-hidden rounded-xl bg-[#1a1d27] ring-1 ring-white/5 shadow-md transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl"
      onClick={() => navigate(`/events/${event.id}`)}
    >
      {/* Poster */}
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

        {/* Rank badge – top-left */}
        {rank !== undefined && (
          <span className="absolute left-2 top-2 flex h-7 w-7 items-center justify-center rounded-md bg-black/70 text-sm font-semibold text-white backdrop-blur-sm">
            {rank}
          </span>
        )}

        {/* Category badge – top-right */}
        <span
          className="absolute right-2 top-2 flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[10px] font-semibold text-white shadow"
          style={{ backgroundColor: cat.color + 'cc' }}
        >
          {cat.emoji} {cat.label}
        </span>
      </div>

      {/* Info */}
      <div className="p-3">
        <h3 className="truncate text-sm font-semibold leading-snug text-white">{event.title}</h3>
        <p className="mt-1 truncate text-xs text-[#64748b]">{event.venue}</p>
        <p className="mt-0.5 text-xs text-[#64748b]">
          {new Date(event.eventDate).toLocaleString('ko-KR', {
            dateStyle: 'medium',
            timeStyle: 'short',
          })}
        </p>
        <span
          className="mt-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold"
          style={{ color: st.color, backgroundColor: st.color + '22' }}
        >
          {st.label}
        </span>
      </div>
    </div>
  );
}

/* ─── Skeleton Cards ─────────────────────────────────────── */
function CardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl bg-[#1a1d27] ring-1 ring-white/5">
      <Skeleton className="aspect-[3/4] w-full rounded-none" />
      <div className="space-y-2 p-3">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-3 w-2/3" />
      </div>
    </div>
  );
}

/* ─── Hero Banner ────────────────────────────────────────── */
function HeroBanner({ event }: { event: EventDto }) {
  const [imgFailed, setImgFailed] = useState(false);
  const navigate = useNavigate();
  const cat = categoryMeta(event.category);
  const showFallback = imgFailed || !event.posterUrl;

  return (
    <div
      className="relative w-full cursor-pointer overflow-hidden rounded-2xl h-60 sm:h-80 shadow-2xl"
      onClick={() => navigate(`/events/${event.id}`)}
    >
      {/* Background */}
      {showFallback ? (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(135deg, ${cat.color}66 0%, #0f1117 100%)`,
          }}
        />
      ) : (
        <img
          src={event.posterUrl ?? ''}
          alt={event.title}
          className="absolute inset-0 h-full w-full object-cover"
          onError={() => setImgFailed(true)}
        />
      )}

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

      {/* Content – bottom left */}
      <div className="absolute bottom-0 left-0 p-5 sm:p-7">
        {/* Category badge */}
        <span
          className="mb-2 inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold text-white shadow"
          style={{ backgroundColor: cat.color + 'cc' }}
        >
          {cat.emoji} {cat.label}
        </span>

        <h2 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-lg line-clamp-2">
          {event.title}
        </h2>

        <p className="mt-1 text-sm text-white/70">
          {event.venue} &middot;{' '}
          {new Date(event.eventDate).toLocaleString('ko-KR', {
            dateStyle: 'medium',
            timeStyle: 'short',
          })}
        </p>

        <button
          className="mt-4 rounded-lg bg-[#6c63ff] px-5 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-150 hover:bg-[#5a52e0] active:scale-95"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/events/${event.id}`);
          }}
        >
          예매하기
        </button>
      </div>
    </div>
  );
}

/* ─── Hero Skeleton ──────────────────────────────────────── */
function HeroSkeleton() {
  return <Skeleton className="w-full h-60 sm:h-80 rounded-2xl" />;
}

/* ─── Category Tabs ──────────────────────────────────────── */
interface CategoryTabsProps {
  available: string[];
  selected: CategoryKey;
  onSelect: (cat: CategoryKey) => void;
}

function CategoryTabs({ available, selected, onSelect }: CategoryTabsProps) {
  const pills: { key: CategoryKey; label: string; emoji?: string }[] = [
    { key: 'ALL', label: '전체' },
    ...CATEGORY_ORDER.filter((c) => available.includes(c)).map((c) => {
      const m = categoryMeta(c);
      return { key: c as CategoryKey, label: m.label, emoji: m.emoji };
    }),
  ];

  return (
    <div className="flex gap-2 overflow-x-auto py-1 pb-2 scrollbar-none">
      {pills.map((pill) => {
        const active = selected === pill.key;
        return (
          <button
            key={pill.key}
            onClick={() => onSelect(pill.key)}
            className={[
              'flex-shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-150',
              active
                ? 'bg-[#6c63ff] text-white shadow-md'
                : 'bg-[#1a1d27] text-[#94a3b8] ring-1 ring-white/5 hover:bg-[#22263a] hover:text-white',
            ].join(' ')}
          >
            {pill.emoji && <span className="mr-1">{pill.emoji}</span>}
            {pill.label}
          </button>
        );
      })}
    </div>
  );
}

/* ─── Category Section ───────────────────────────────────── */
interface CategorySectionProps {
  category: string;
  events: EventDto[];
  showRanks: boolean;
}

function CategorySection({ category, events, showRanks }: CategorySectionProps) {
  const cat = categoryMeta(category);

  return (
    <section className="space-y-4">
      {/* Section header */}
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-bold text-white">
          {cat.emoji} {cat.label}
        </h2>
        <span className="text-sm text-[#64748b]">{events.length}개</span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {events.map((event, idx) => (
          <EventCard
            key={event.id}
            event={event}
            rank={showRanks ? idx + 1 : undefined}
          />
        ))}
      </div>
    </section>
  );
}

/* ─── Main Page ──────────────────────────────────────────── */
export default function EventListPage() {
  const [selected, setSelected] = useState<CategoryKey>('ALL');

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['events', 0],
    queryFn: () => getEvents(0),
  });

  /* Group events by category */
  const grouped = (data?.content ?? []).reduce<Record<string, EventDto[]>>(
    (acc, ev) => {
      (acc[ev.category] ??= []).push(ev);
      return acc;
    },
    {},
  );

  /* Available categories in fixed order */
  const availableCategories = CATEGORY_ORDER.filter((c) => grouped[c]?.length);

  /* Featured event for hero */
  const allEvents = data?.content ?? [];
  const featured =
    allEvents.find((e) => e.status === 'ON_SALE') ?? allEvents[0] ?? null;

  /* Events to show in body */
  const bodyCategories =
    selected === 'ALL'
      ? availableCategories
      : availableCategories.filter((c) => c === selected);

  return (
    <div className="space-y-6 pb-12">
      {/* ── Hero ── */}
      {isLoading ? (
        <HeroSkeleton />
      ) : featured ? (
        <HeroBanner event={featured} />
      ) : null}

      {/* ── Category Tabs ── */}
      {!isLoading && !isError && availableCategories.length > 0 && (
        <CategoryTabs
          available={availableCategories}
          selected={selected}
          onSelect={setSelected}
        />
      )}

      {/* ── Body ── */}
      {isLoading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <CardSkeleton key={i} />
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
        <div className="space-y-10">
          {bodyCategories.map((cat) => (
            <CategorySection
              key={cat}
              category={cat}
              events={grouped[cat] ?? []}
              showRanks={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}
