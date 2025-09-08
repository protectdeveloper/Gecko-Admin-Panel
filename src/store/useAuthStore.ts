import { GetMeUserDetailDTO } from '@/api/Auth/Auth.types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  user: GetMeUserDetailDTO['data'] | null;
  setUser: (user: GetMeUserDetailDTO['data'] | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null })
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user })
    }
  )
);
