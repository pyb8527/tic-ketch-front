import { api, unwrap } from './client';
import type { ApiResponse, RegisterRequest, LoginRequest, TokenResponse, User } from '../types/api';

export const register = (body: RegisterRequest) =>
  unwrap<number>(api.post<ApiResponse<number>>('/api/auth/register', body));

export const login = (body: LoginRequest) =>
  unwrap<TokenResponse>(api.post<ApiResponse<TokenResponse>>('/api/auth/login', body));

export const getMe = () =>
  unwrap<User>(api.get<ApiResponse<User>>('/api/users/me'));
