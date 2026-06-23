import type { EventStatus, ReservationStatus } from '../types/api';
import type { ToastTone } from '../components/ui/toast';

type BadgeTone = 'neutral' | 'primary' | 'success' | 'warning' | 'error' | 'info';

/** 공연 상태 → 라벨 + 배지 톤. */
export function eventStatusMeta(status: EventStatus): { label: string; tone: BadgeTone } {
  switch (status) {
    case 'ON_SALE':
      return { label: '판매 중', tone: 'success' };
    case 'UPCOMING':
      return { label: '예정', tone: 'primary' };
    case 'SOLD_OUT':
      return { label: '매진', tone: 'error' };
    case 'ENDED':
      return { label: '종료', tone: 'neutral' };
    default:
      return { label: status, tone: 'neutral' };
  }
}

/** 예매 상태 → 라벨 + 배지 톤. */
export function reservationStatusMeta(
  status: ReservationStatus,
): { label: string; tone: BadgeTone } {
  switch (status) {
    case 'PENDING':
      return { label: '결제 대기', tone: 'warning' };
    case 'CONFIRMED':
      return { label: '확정', tone: 'success' };
    case 'CANCELLED':
      return { label: '취소됨', tone: 'error' };
    case 'EXPIRED':
      return { label: '만료됨', tone: 'neutral' };
    default:
      return { label: status, tone: 'neutral' };
  }
}

// 좌석 등급: 백엔드가 등급명을 주지 않으므로 seatGradeId로 색을 결정론적으로 매핑.
const GRADE_PALETTE = [
  { key: 'VIP', dot: 'bg-grade-vip', text: 'text-grade-vip' },
  { key: 'R', dot: 'bg-grade-r', text: 'text-grade-r' },
  { key: 'S', dot: 'bg-grade-s', text: 'text-grade-s' },
  { key: 'A', dot: 'bg-grade-a', text: 'text-grade-a' },
] as const;

/** seatGradeId → 등급 라벨/색(결정론적, 순환). */
export function gradeMeta(seatGradeId: number) {
  const idx = ((seatGradeId - 1) % GRADE_PALETTE.length + GRADE_PALETTE.length) % GRADE_PALETTE.length;
  return GRADE_PALETTE[idx];
}

/** 결제 응답 상태 → 토스트 톤. */
export function paymentToastTone(status: string): ToastTone {
  return status === 'COMPLETED' ? 'success' : 'error';
}

/** 한국어 로컬 일시 포맷. */
export function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
