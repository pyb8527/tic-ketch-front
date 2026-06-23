import { api, unwrap } from './client';
import type { ApiResponse, QueueStatus } from '../types/api';

export const enterQueue = (eventId: number) =>
  unwrap<QueueStatus>(api.post<ApiResponse<QueueStatus>>(`/api/queue/${eventId}/enter`));

export const getQueueStatus = (eventId: number) =>
  unwrap<QueueStatus>(api.get<ApiResponse<QueueStatus>>(`/api/queue/${eventId}`));
