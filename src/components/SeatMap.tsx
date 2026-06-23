import type { SeatDto, SeatStatus } from '../types/api';
import { gradeMeta } from '../lib/meta';
import { cn } from '../lib/cn';
import { EmptyState } from './ui/States';

/** 좌석 상태(우선) → 스타일. 등급 색은 별도로 좌측 인디케이터에 표시. */
function seatStyle(status: SeatStatus, isSelected: boolean): string {
  if (isSelected) {
    return 'bg-primary-600 text-white ring-2 ring-primary-300 ring-offset-1 ring-offset-surface dark:bg-primary-500 cursor-pointer';
  }
  switch (status) {
    case 'AVAILABLE':
      return 'bg-success-50 border border-success-500 text-success-700 hover:bg-success-100 cursor-pointer dark:bg-transparent dark:border-success-400 dark:text-success-300 dark:hover:bg-success-900/40';
    case 'HELD':
      return 'bg-warning-50 border border-warning-400 text-warning-700 cursor-not-allowed dark:bg-warning-900/40 dark:text-warning-300';
    case 'SOLD':
      return 'bg-neutral-100 border border-neutral-200 text-neutral-400 cursor-not-allowed dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-600';
    default:
      return 'bg-neutral-100 text-neutral-400 cursor-not-allowed';
  }
}

const STATUS_LABEL: Record<SeatStatus, string> = {
  AVAILABLE: '예약가능',
  HELD: '선점중',
  SOLD: '판매완료',
};

function LegendItem({ swatch, label }: { swatch: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className={cn('inline-block h-4 w-4 rounded-sm', swatch)} aria-hidden />
      <span className="text-fg-muted">{label}</span>
    </div>
  );
}

export default function SeatMap({
  seats,
  selectedSeatId,
  onSelect,
}: {
  seats: SeatDto[];
  selectedSeatId: number | null;
  onSelect: (seatId: number) => void;
}) {
  if (seats.length === 0) {
    return <EmptyState title="좌석 정보가 없습니다" message="잠시 후 다시 확인해주세요" />;
  }

  // 행(rowName)별 그룹 + 정렬
  const rowMap = new Map<string, SeatDto[]>();
  for (const seat of seats) {
    const arr = rowMap.get(seat.rowName);
    if (arr) arr.push(seat);
    else rowMap.set(seat.rowName, [seat]);
  }
  const sortedRows = Array.from(rowMap.entries()).sort(([a], [b]) => a.localeCompare(b));
  for (const [, rowSeats] of sortedRows) rowSeats.sort((a, b) => a.seatNumber - b.seatNumber);

  // 표시된 등급 모음(범례용)
  const gradeIds = Array.from(new Set(seats.map((s) => s.seatGradeId))).sort((a, b) => a - b);

  return (
    <div className="flex flex-col items-center gap-6">
      {/* 무대 */}
      <div className="w-full max-w-2xl">
        <div className="rounded-md border border-primary-200 bg-primary-50 py-2 text-center text-xs font-semibold uppercase tracking-[0.3em] text-primary-700 dark:border-primary-800 dark:bg-primary-950 dark:text-primary-300">
          무대 · STAGE
        </div>
      </div>

      {/* 좌석 그리드 (가로 넘침 스크롤) */}
      <div className="w-full max-w-2xl overflow-x-auto pb-2">
        <div className="flex min-w-min flex-col gap-2">
          {sortedRows.map(([rowName, rowSeats]) => (
            <div key={rowName} className="flex items-center gap-2">
              <span className="w-6 shrink-0 text-center text-xs font-bold text-fg-subtle">
                {rowName}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {rowSeats.map((seat) => {
                  const isSelected = seat.id === selectedSeatId;
                  const isAvailable = seat.status === 'AVAILABLE';
                  const grade = gradeMeta(seat.seatGradeId);
                  return (
                    <button
                      key={seat.id}
                      type="button"
                      disabled={!isAvailable}
                      aria-pressed={isSelected}
                      aria-label={`${rowName}열 ${seat.seatNumber}번, ${grade.key}석, ${STATUS_LABEL[seat.status]}`}
                      onClick={() => isAvailable && onSelect(seat.id)}
                      className={cn(
                        'relative flex h-9 w-9 items-center justify-center rounded-sm text-xs font-semibold transition-all duration-fast',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-1 focus-visible:ring-offset-surface',
                        seatStyle(seat.status, isSelected),
                      )}
                    >
                      {/* 등급 인디케이터(상단 바) */}
                      {!isSelected && (
                        <span
                          className={cn('absolute inset-x-1 top-0.5 h-0.5 rounded-full', grade.dot)}
                          aria-hidden
                        />
                      )}
                      {seat.seatNumber}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 범례 */}
      <div className="flex w-full max-w-2xl flex-col gap-3 border-t border-border pt-4 text-xs">
        <div className="flex flex-wrap gap-4">
          <LegendItem swatch="bg-success-50 border border-success-500 dark:bg-success-900/40 dark:border-success-400" label="예약가능" />
          <LegendItem swatch="bg-warning-50 border border-warning-400 dark:bg-warning-900/40" label="선점중" />
          <LegendItem swatch="bg-neutral-100 border border-neutral-200 dark:bg-neutral-900 dark:border-neutral-700" label="판매완료" />
          <LegendItem swatch="bg-primary-600 dark:bg-primary-500" label="선택됨" />
        </div>
        {gradeIds.length > 1 && (
          <div className="flex flex-wrap gap-4">
            {gradeIds.map((gid) => {
              const g = gradeMeta(gid);
              return <LegendItem key={gid} swatch={g.dot} label={`${g.key}석`} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
}
