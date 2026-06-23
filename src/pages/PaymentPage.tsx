import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import ReservationTimer from '../components/ReservationTimer';
import { getReservation } from '../api/reservations';
import { requestPayment } from '../api/payments';
import { useToast } from '../components/ui/toast';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { ErrorState, LoadingState } from '../components/ui/States';

// 실제 가격은 좌석 등급(SeatGrade)에서 가져와야 하나, 현재 미연동이므로 임시 고정값 사용
const AMOUNT = 50000;

export default function PaymentPage() {
  const { reservationId } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const resId = Number(reservationId);

  const { data: reservation, isLoading } = useQuery({
    queryKey: ['reservation', resId],
    queryFn: () => getReservation(resId),
    enabled: !isNaN(resId),
  });

  const payMutation = useMutation({
    mutationFn: () => requestPayment({ reservationId: resId, amount: AMOUNT }),
    onSuccess: (res) => {
      if (res.status === 'COMPLETED') toast.success('결제가 완료되었습니다');
      else toast.error('결제 실패', `상태: ${res.status}`);
    },
    onError: (e) =>
      toast.error('결제 오류', e instanceof Error ? e.message : undefined),
  });

  const completed = payMutation.isSuccess && payMutation.data?.status === 'COMPLETED';

  // 결제 성공 시 타이머가 만료돼도 리다이렉트되지 않도록 가드
  const handleExpire = () => {
    if (completed) return;
    toast.warning('예약이 만료되었습니다', '좌석 선택부터 다시 진행해주세요');
    navigate('/');
  };

  if (isNaN(resId)) {
    return <ErrorState title="잘못된 접근" message="잘못된 예약 ID입니다." />;
  }
  if (isLoading) return <LoadingState label="예약 정보를 불러오는 중…" />;
  if (!reservation) {
    return <ErrorState title="예약을 찾을 수 없습니다" message="예약 정보가 만료되었거나 존재하지 않습니다." />;
  }

  return (
    <div className="mx-auto max-w-lg animate-fade-in py-4">
      <h1 className="mb-6 font-display text-3xl font-bold text-fg">결제</h1>

      {/* 남은 시간 (sticky 강조) */}
      <div className="sticky top-20 z-10 mb-4 flex items-center justify-between rounded-lg border border-border bg-surface px-5 py-4 shadow-sm dark:shadow-none">
        <div>
          <p className="text-xs text-fg-muted">결제 마감까지</p>
          <p className="text-xs text-fg-subtle">시간 내 미결제 시 좌석이 해제됩니다</p>
        </div>
        <ReservationTimer expiresAt={reservation.expiresAt} onExpire={handleExpire} />
      </div>

      <Card elevated className="mb-6 p-6">
        <dl className="space-y-4">
          <div className="flex items-center justify-between">
            <dt className="text-fg-muted">좌석</dt>
            <dd className="tabular font-semibold text-fg">#{reservation.seatId}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-fg-muted">공연</dt>
            <dd className="tabular font-semibold text-fg">#{reservation.eventId}</dd>
          </div>
          <div className="flex items-center justify-between border-t border-border pt-4">
            <dt className="font-medium text-fg">결제 금액</dt>
            <dd className="tabular font-mono text-2xl font-bold text-primary-600 dark:text-primary-400">
              {AMOUNT.toLocaleString('ko-KR')}
              <span className="ml-0.5 text-base font-sans">원</span>
            </dd>
          </div>
        </dl>
      </Card>

      {completed ? (
        <Card className="p-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-success-50 text-2xl text-success-600 dark:bg-success-900/40 dark:text-success-300">
            ✓
          </div>
          <p className="font-display text-xl font-bold text-fg">결제 완료</p>
          <p className="mt-1 text-sm text-fg-muted">예매가 정상적으로 확정되었습니다</p>
          <Link to="/me" className="mt-6 inline-block">
            <Button size="lg">내 예매 보기</Button>
          </Link>
        </Card>
      ) : (
        <Button
          size="lg"
          variant="success"
          fullWidth
          onClick={() => payMutation.mutate()}
          loading={payMutation.isPending}
        >
          {AMOUNT.toLocaleString('ko-KR')}원 결제하기
        </Button>
      )}
    </div>
  );
}
