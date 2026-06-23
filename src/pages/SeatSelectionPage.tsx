import { useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import SeatMap from '../components/SeatMap';
import { useSeatSSE } from '../hooks/useSeatSSE';
import { getSeats } from '../api/events';
import { holdSeat } from '../api/reservations';

export default function SeatSelectionPage() {
  const { id } = useParams();
  const eventId = Number(id);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [selectedSeatId, setSelectedSeatId] = useState<number | null>(null);

  const { data: seats, isLoading } = useQuery({
    queryKey: ['seats', eventId],
    queryFn: () => getSeats(eventId),
    enabled: !isNaN(eventId),
  });

  const onSeatUpdate = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ['seats', eventId] });
  }, [queryClient, eventId]);

  useSeatSSE(eventId, onSeatUpdate);

  const holdMutation = useMutation({
    mutationFn: () => holdSeat({ seatId: selectedSeatId!, eventId }),
    onSuccess: (res) => navigate(`/payment/${res.reservationId}`),
    onError: (e) => alert((e as Error).message),
  });

  if (isNaN(eventId)) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <p className="text-danger text-lg">유효하지 않은 이벤트 ID입니다.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-200">좌석 선택</h1>
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-accent2 animate-pulse" />
          <span className="text-sm text-accent2 font-medium">실시간 연결됨</span>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center min-h-64">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
            <p className="text-muted text-sm">좌석 정보를 불러오는 중...</p>
          </div>
        </div>
      ) : (
        <SeatMap
          seats={seats ?? []}
          selectedSeatId={selectedSeatId}
          onSelect={setSelectedSeatId}
        />
      )}

      <div className="flex justify-end pt-4 border-t border-surface">
        <button
          onClick={() => holdMutation.mutate()}
          disabled={!selectedSeatId || holdMutation.isPending}
          className="
            px-8 py-3 rounded-lg font-semibold text-white transition-all
            bg-accent hover:bg-accent/90
            disabled:opacity-40 disabled:cursor-not-allowed
            flex items-center gap-2
          "
        >
          {holdMutation.isPending && (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          )}
          선점하기
        </button>
      </div>
    </div>
  );
}
