import { useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import SeatMap from '../components/SeatMap';
import { useSeatSSE } from '../hooks/useSeatSSE';
import { getSeats } from '../api/events';
import { holdSeat } from '../api/reservations';
import { useToast } from '../components/ui/toast';
import Button from '../components/ui/Button';
import { ErrorState, LoadingState } from '../components/ui/States';

export default function SeatSelectionPage() {
  const { id } = useParams();
  const eventId = Number(id);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const toast = useToast();

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
    onSuccess: (res) => {
      toast.success('좌석을 선점했어요', '제한 시간 안에 결제를 완료해주세요');
      navigate(`/payment/${res.reservationId}`);
    },
    onError: (e) =>
      toast.error('선점에 실패했어요', e instanceof Error ? e.message : undefined),
  });

  if (isNaN(eventId)) {
    return <ErrorState title="잘못된 접근" message="유효하지 않은 이벤트 ID입니다." />;
  }

  return (
    <div className="space-y-6 pb-24">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-fg">좌석 선택</h1>
          <p className="mt-1 text-sm text-fg-muted">원하는 좌석을 선택한 뒤 선점하세요</p>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-success-50 px-3 py-1.5 dark:bg-success-900/40">
          <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-success-500" aria-hidden />
          <span className="text-xs font-medium text-success-700 dark:text-success-300">
            실시간 연결됨
          </span>
        </div>
      </div>

      {isLoading ? (
        <LoadingState label="좌석 정보를 불러오는 중…" />
      ) : (
        <SeatMap
          seats={seats ?? []}
          selectedSeatId={selectedSeatId}
          onSelect={setSelectedSeatId}
        />
      )}

      {/* 하단 고정 액션 바 */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-surface/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <span className="text-sm text-fg-muted">
            {selectedSeatId ? (
              <span className="font-medium text-fg">좌석 선택됨</span>
            ) : (
              '좌석을 선택해주세요'
            )}
          </span>
          <Button
            size="lg"
            variant="success"
            onClick={() => holdMutation.mutate()}
            disabled={!selectedSeatId}
            loading={holdMutation.isPending}
          >
            선점하기
          </Button>
        </div>
      </div>
    </div>
  );
}
