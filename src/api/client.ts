import axios, { AxiosResponse } from 'axios';
import { useAuthStore } from '../store/authStore';
import type { ApiResponse } from '../types/api';
const baseURL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080';
export const api = axios.create({ baseURL });
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) useAuthStore.getState().logout();
    const msg = err?.response?.data?.message ?? err.message ?? '요청 실패';
    return Promise.reject(new Error(msg));
  }
);
// 공통 언래퍼: {code,message,data} → data, code≠SUCCESS면 throw
export async function unwrap<T>(p: Promise<AxiosResponse<ApiResponse<T>>>): Promise<T> {
  const res = await p;
  if (res.data.code !== 'SUCCESS') throw new Error(res.data.message);
  return res.data.data;
}
