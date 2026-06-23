import { api, unwrap } from './client';
import type { ApiResponse, PaymentResult, PaymentDto } from '../types/api';

export const requestPayment = (body: { reservationId: number; amount: number }) =>
  unwrap<PaymentResult>(api.post<ApiResponse<PaymentResult>>('/api/payments', body));

export const getPayment = (id: number) =>
  unwrap<PaymentDto>(api.get<ApiResponse<PaymentDto>>(`/api/payments/${id}`));
