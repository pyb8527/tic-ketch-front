import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getMyReservations, cancelReservation } from '../api/reservations';
import type { ReservationStatus } from '../types/api';

function StatusBadge({ status }: { status: ReservationStatus }) {
  const styles: Record<ReservationStatus, string> = {
    PENDING: 'bg-accent/20 text-accent border border-accent/40',
    CONFIRMED: 'bg-accent2/20 text-accent2 border border-accent2/40',
    CANCELLED: 'bg-danger/20 text-danger border border-danger/40',
    EXPIRED: 'bg-gray-700 text-muted border border-gray-600',
  };

  const labels: Record<ReservationStatus, string> = {
    PENDING: '대기중',
    CONFIRMED: '확정',
    CANCELLED: '취소됨',
    EXPIRED: '만료됨',
  };

  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}

export default function MyReservationsPage() {
  const qc = useQueryClient();

  const { data: reservations, isLoading, isError } = useQuery({
    queryKey: ['myReservations'],
    queryFn: getMyReservations,
  });

  const cancelMutation = useMutation({
    mutationFn: (rid: number) => cancelReservation(rid),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['myReservations'] });
    },
    onError: (err) => {
      alert(err instanceof Error ? err.message : '취소에 실패했습니다.');
    },
  });

  const handleCancel = (id: number) => {
    if (window.confirm('예매를 취소하시겠습니까?')) {
      cancelMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-24">
        <p className="text-muted text-lg animate-pulse">불러오는 중...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center py-24">
        <p className="text-danger">예매 내역을 불러오지 못했습니다.</p>
      </div>
    );
  }

  if (!reservations || reservations.length === 0) {
    return (
      <div className="flex justify-center items-center py-24">
        <p className="text-muted text-lg">예매 내역이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h1 className="text-2xl font-bold text-gray-200 mb-6">내 예매 내역</h1>

      <ul className="flex flex-col gap-4">
        {reservations.map((res) => (
          <li
            key={res.id}
            className="bg-surface rounded-xl p-5 flex flex-col gap-3 shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-gray-200 font-semibold">
                  예매 #{res.id}
                </span>
                <StatusBadge status={res.status} />
              </div>
              {res.status === 'PENDING' && (
                <button
                  onClick={() => handleCancel(res.id)}
                  disabled={cancelMutation.isPending}
                  className="px-4 py-1.5 bg-danger/20 hover:bg-danger/40 text-danger border border-danger/40 text-sm font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  취소
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm text-muted">
              <div>
                <span className="text-gray-400">좌석</span>{' '}
                <span className="text-gray-200 font-medium">#{res.seatId}</span>
              </div>
              <div>
                <span className="text-gray-400">공연</span>{' '}
                <span className="text-gray-200 font-medium">#{res.eventId}</span>
              </div>
              <div className="col-span-2">
                <span className="text-gray-400">만료 시각</span>{' '}
                <span className="text-gray-200">
                  {new Date(res.expiresAt).toLocaleString('ko-KR')}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
