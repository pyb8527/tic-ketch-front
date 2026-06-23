import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import ReservationTimer from '../components/ReservationTimer';
import { getReservation } from '../api/reservations';
import { requestPayment } from '../api/payments';

// 실제 가격은 좌석 등급(SeatGrade)에서 가져와야 하나, 현재 미연동이므로 임시 고정값 사용
const AMOUNT = 50000;

export default function PaymentPage() {
  const { reservationId } = useParams();
  const navigate = useNavigate();

  const resId = Number(reservationId);

  if (isNaN(resId)) {
    return (
      <div className="text-center py-20 text-danger">
        잘못된 예약 ID입니다.
      </div>
    );
  }

  const { data: reservation, isLoading } = useQuery({
    queryKey: ['reservation', resId],
    queryFn: () => getReservation(resId),
  });

  const payMutation = useMutation({
    mutationFn: () => requestPayment({ reservationId: resId, amount: AMOUNT }),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <span className="text-muted text-lg">불러오는 중...</span>
      </div>
    );
  }

  if (!reservation) {
    return (
      <div className="text-center py-20 text-danger">
        예약 정보를 찾을 수 없습니다.
      </div>
    );
  }

  const handleExpire = () => {
    alert('예약이 만료되었습니다.');
    navigate('/');
  };

  const handlePay = () => {
    payMutation.mutate();
  };

  const isPayDisabled = payMutation.isPending || payMutation.isSuccess;

  return (
    <div className="max-w-lg mx-auto py-10">
      <h1 className="text-3xl font-bold text-gray-100 mb-8">결제</h1>

      <div className="bg-surface rounded-xl p-6 mb-6 space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-muted">좌석</span>
          <span className="text-gray-100 font-semibold">#{reservation.seatId}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-muted">공연</span>
          <span className="text-gray-100 font-semibold">#{reservation.eventId}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-muted">금액</span>
          <span className="text-accent2 font-bold text-xl">
            {AMOUNT.toLocaleString('ko-KR')}원
          </span>
        </div>
        <div className="border-t border-gray-700 pt-4">
          <div className="flex justify-between items-center">
            <span className="text-muted">남은 시간</span>
            <ReservationTimer
              expiresAt={reservation.expiresAt}
              onExpire={handleExpire}
            />
          </div>
        </div>
      </div>

      {!payMutation.isSuccess && !payMutation.isError && (
        <button
          onClick={handlePay}
          disabled={isPayDisabled}
          className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
            isPayDisabled
              ? 'bg-gray-700 text-muted cursor-not-allowed'
              : 'bg-accent hover:bg-purple-600 text-white cursor-pointer'
          }`}
        >
          {payMutation.isPending ? '결제 중...' : '결제하기'}
        </button>
      )}

      {payMutation.isSuccess && payMutation.data && (
        <div className="mt-6 p-6 bg-surface rounded-xl text-center space-y-4">
          {payMutation.data.status === 'COMPLETED' ? (
            <>
              <p className="text-2xl font-bold text-accent2">✅ 결제 완료</p>
              <Link
                to="/me"
                className="inline-block mt-2 px-6 py-3 bg-accent2 text-bg font-bold rounded-lg hover:opacity-90 transition-opacity"
              >
                내 예매 보기
              </Link>
            </>
          ) : (
            <p className="text-xl font-bold text-danger">
              ❌ 결제 실패: {payMutation.data.status}
            </p>
          )}
        </div>
      )}

      {payMutation.isError && (
        <div className="mt-6 p-4 bg-surface border border-danger rounded-xl">
          <p className="text-danger font-semibold">
            오류: {(payMutation.error as Error).message}
          </p>
        </div>
      )}
    </div>
  );
}
