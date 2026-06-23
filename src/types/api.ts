export interface ApiResponse<T> { code: string; message: string; data: T; }
export interface Page<T> { content: T[]; totalElements: number; totalPages: number; number: number; size: number; }
export interface TokenResponse { accessToken: string; refreshToken: string; }
export interface User { id: number; email: string; name: string; role: string; }
export type EventStatus = 'UPCOMING'|'ON_SALE'|'SOLD_OUT'|'ENDED';
export interface EventDto { id: number; title: string; venue: string; eventDate: string; status: EventStatus; }
export type SeatStatus = 'AVAILABLE'|'HELD'|'SOLD';
export interface SeatDto { id: number; seatGradeId: number; rowName: string; seatNumber: number; status: SeatStatus; }
export type ReservationStatus = 'PENDING'|'CONFIRMED'|'CANCELLED'|'EXPIRED';
export interface ReservationDto { id: number; seatId: number; eventId: number; status: ReservationStatus; expiresAt: string; remainingSeconds: number; }
export interface HoldSeatResult { reservationId: number; expiresAt: string; }
export type PaymentStatus = 'PENDING'|'COMPLETED'|'FAILED'|'REFUNDED';
export interface PaymentDto { id: number; reservationId: number; amount: number; status: PaymentStatus; paidAt: string | null; }
export interface PaymentResult { paymentId: number; status: string; }
export interface QueueStatus { position: number; totalWaiting: number; }
export interface LoginRequest { email: string; password: string; }
export interface RegisterRequest { email: string; password: string; name: string; }
