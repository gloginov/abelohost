import { create } from 'zustand';
import { User } from '@/types/auth';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  setUser: (user: User | null) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

type SetAuthState = (state: Partial<AuthState>) => void;

export const useAuthStore = create<AuthState>((set: SetAuthState) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: (user: User, token: string) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('authUser', JSON.stringify(user));
    set({ user, token, isAuthenticated: true, error: null });
  },

  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
    set({ user: null, token: null, isAuthenticated: false, error: null });
  },

  setUser: (user: User | null) => {
    set({ user });
  },

  setError: (error: string | null) => {
    set({ error });
  },

  clearError: () => {
    set({ error: null });
  },
}));

// Загрузка состояния из localStorage при инициализации
const savedToken = typeof window !== 'undefined' ? localStorage?.getItem('authToken') : null;
const savedUser = typeof window !== 'undefined' ? localStorage?.getItem('authUser') : null;

if (savedToken && savedUser) {
  try {
    const user = JSON.parse(savedUser);
    useAuthStore.getState().login(user, savedToken);
  } catch (e) {

    if (e instanceof Error) {
      console.error(e.message);
    } else {
      console.error('Failed to login user. Please try again.');
    }

    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
  }
}