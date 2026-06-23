import { create } from 'zustand';
import type { User } from '../types/api';
const TOKEN_KEY = 'ticketch_token';
interface AuthState {
  accessToken: string | null;
  user: User | null;
  setToken: (token: string) => void;
  setUser: (user: User | null) => void;
  logout: () => void;
}
export const useAuthStore = create<AuthState>((set) => ({
  accessToken: localStorage.getItem(TOKEN_KEY),
  user: null,
  setToken: (token) => { localStorage.setItem(TOKEN_KEY, token); set({ accessToken: token }); },
  setUser: (user) => set({ user }),
  logout: () => { localStorage.removeItem(TOKEN_KEY); set({ accessToken: null, user: null }); },
}));
