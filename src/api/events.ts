import { api, unwrap } from './client';
import type { ApiResponse, Page, EventDto, SeatDto } from '../types/api';

export const getEvents = (page = 0) =>
  unwrap<Page<EventDto>>(api.get<ApiResponse<Page<EventDto>>>('/api/events', { params: { page, size: 20 } }));

export const getEvent = (id: number) =>
  unwrap<EventDto>(api.get<ApiResponse<EventDto>>(`/api/events/${id}`));

export const getSeats = (eventId: number) =>
  unwrap<SeatDto[]>(api.get<ApiResponse<SeatDto[]>>(`/api/events/${eventId}/seats`));
