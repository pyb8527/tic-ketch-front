import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getMyReservations, cancelReservation } from '../api/reservations';
import { reservationStatusMeta, formatDateTime } from '../lib/meta';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import { useToast } from '../components/ui/toast';
import { ErrorState, EmptyState, LoadingState } from '../components/ui/States';

export default function MyReservationsPage() {
  const qc = useQueryClient();
  const toast = useToast();
  const [cancelTarget, setCancelTarget] = useState<number | null>(null);

  const { data: reservations, isLoading, isError, refetch } = useQuery({
    queryKey: ['myReservations'],
    queryFn: getMyReservations,
  });

  const cancelMutation = useMutation({
    mutationFn: (rid: number) => cancelReservation(rid),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['myReservations'] });
      toast.success('예매를 취소했습니다');
      setCancelTarget(null);
    },
    onError: (err) => {
      toast.error('취소 실패', err instanceof Error ? err.message : undefined);
      setCancelTarget(null);
    },
  });

  if (isLoading) return <LoadingState label="예매 내역을 불러오는 중…" />;
  if (isError) {
    return <ErrorState title="예매 내역을 불러오지 못했습니다" onRetry={() => refetch()} />;
  }
  if (!reservations || reservations.length === 0) {
    return (
      <EmptyState
        title="예매 내역이 없습니다"
        message="마음에 드는 공연을 찾아 예매해보세요"
        action={
          <Link to="/">
            <Button>공연 둘러보기</Button>
          </Link>
        }
      />
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 font-display text-2xl font-bold text-fg">내 예매 내역</h1>

      <ul className="flex flex-col gap-4">
        {reservations.map((res) => {
          const meta = reservationStatusMeta(res.status);
          return (
            <Card as="li" key={res.id} className="flex flex-col gap-4 p-5">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="tabular font-display font-semibold text-fg">
                    예매 #{res.id}
                  </span>
                  <Badge tone={meta.tone}>{meta.label}</Badge>
                </div>
                {res.status === 'PENDING' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-error-600 hover:bg-error-50 dark:text-error-400 dark:hover:bg-error-900/40"
                    onClick={() => setCancelTarget(res.id)}
                  >
                    취소
                  </Button>
                )}
              </div>

              <dl className="grid grid-cols-2 gap-y-2 text-sm">
                <div className="flex gap-1.5">
                  <dt className="text-fg-muted">좌석</dt>
                  <dd className="tabular font-medium text-fg">#{res.seatId}</dd>
                </div>
                <div className="flex gap-1.5">
                  <dt className="text-fg-muted">공연</dt>
                  <dd className="tabular font-medium text-fg">#{res.eventId}</dd>
                </div>
                <div className="col-span-2 flex gap-1.5">
                  <dt className="text-fg-muted">만료 시각</dt>
                  <dd className="tabular text-fg">{formatDateTime(res.expiresAt)}</dd>
                </div>
              </dl>
            </Card>
          );
        })}
      </ul>

      <ConfirmDialog
        open={cancelTarget !== null}
        title="예매를 취소할까요?"
        description="취소 후에는 되돌릴 수 없으며, 좌석은 다시 판매됩니다."
        confirmLabel="예매 취소"
        cancelLabel="유지"
        tone="danger"
        loading={cancelMutation.isPending}
        onConfirm={() => cancelTarget !== null && cancelMutation.mutate(cancelTarget)}
        onCancel={() => !cancelMutation.isPending && setCancelTarget(null)}
      />
    </div>
  );
}
