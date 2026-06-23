import { api, unwrap } from './client';
import type { ApiResponse, HoldSeatResult, ReservationDto } from '../types/api';

export const holdSeat = (body: { seatId: number; eventId: number }) =>
  unwrap<HoldSeatResult>(api.post<ApiResponse<HoldSeatResult>>('/api/reservations', body));

export const getReservation = (id: number) =>
  unwrap<ReservationDto>(api.get<ApiResponse<ReservationDto>>(`/api/reservations/${id}`));

export const getMyReservations = () =>
  unwrap<ReservationDto[]>(api.get<ApiResponse<ReservationDto[]>>('/api/reservations/me'));

export const cancelReservation = (id: number) =>
  unwrap<null>(api.delete<ApiResponse<null>>(`/api/reservations/${id}`));
