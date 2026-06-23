import type { SeatDto, SeatStatus } from '../types/api';

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
    return (
      <div className="flex items-center justify-center py-16 text-muted text-sm">
        좌석 정보 없음
      </div>
    );
  }

  // Group seats by rowName
  const rowMap = new Map<string, SeatDto[]>();
  for (const seat of seats) {
    const existing = rowMap.get(seat.rowName);
    if (existing) {
      existing.push(seat);
    } else {
      rowMap.set(seat.rowName, [seat]);
    }
  }

  // Sort rows alphabetically
  const sortedRows = Array.from(rowMap.entries()).sort(([a], [b]) =>
    a.localeCompare(b)
  );

  // Sort seats within each row by seatNumber
  for (const [, rowSeats] of sortedRows) {
    rowSeats.sort((a, b) => a.seatNumber - b.seatNumber);
  }

  function getSeatStyle(status: SeatStatus, isSelected: boolean): string {
    if (isSelected) {
      return 'bg-accent text-white ring-2 ring-white ring-offset-1 ring-offset-bg cursor-pointer';
    }
    switch (status) {
      case 'AVAILABLE':
        return 'bg-accent2 text-bg hover:brightness-110 cursor-pointer';
      case 'HELD':
        return 'bg-warn text-bg cursor-not-allowed opacity-80';
      case 'SOLD':
        return 'bg-muted text-bg cursor-not-allowed opacity-60';
      default:
        return 'bg-muted text-bg cursor-not-allowed opacity-60';
    }
  }

  return (
    <div className="flex flex-col items-center gap-6 py-4">
      {/* Stage label */}
      <div className="w-full max-w-lg">
        <div className="rounded-md bg-surface border border-accent/40 text-center py-2 text-xs tracking-widest text-accent font-semibold uppercase">
          무대 / STAGE
        </div>
      </div>

      {/* Seat grid */}
      <div className="flex flex-col gap-2 w-full max-w-lg">
        {sortedRows.map(([rowName, rowSeats]) => (
          <div key={rowName} className="flex items-center gap-2">
            {/* Row label */}
            <span className="w-6 text-center text-xs font-bold text-muted flex-shrink-0">
              {rowName}
            </span>
            {/* Seat buttons */}
            <div className="flex flex-wrap gap-1">
              {rowSeats.map((seat) => {
                const isSelected = seat.id === selectedSeatId;
                const isAvailable = seat.status === 'AVAILABLE';
                const seatStyle = getSeatStyle(seat.status, isSelected);

                return (
                  <button
                    key={seat.id}
                    disabled={!isAvailable}
                    onClick={() => {
                      if (isAvailable) onSelect(seat.id);
                    }}
                    title={`${rowName}열 ${seat.seatNumber}번 (${seat.status})`}
                    className={`
                      w-8 h-8 rounded text-xs font-semibold
                      flex items-center justify-center
                      transition-all duration-100
                      border border-transparent
                      disabled:cursor-not-allowed
                      ${seatStyle}
                    `}
                  >
                    {seat.seatNumber}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-2 text-xs text-gray-300">
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-4 h-4 rounded bg-accent2" />
          <span>예약가능</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-4 h-4 rounded bg-warn" />
          <span>선점중</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-4 h-4 rounded bg-muted opacity-60" />
          <span>판매완료</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-4 h-4 rounded bg-accent ring-2 ring-white ring-offset-1 ring-offset-bg" />
          <span>선택됨</span>
        </div>
      </div>
    </div>
  );
}
