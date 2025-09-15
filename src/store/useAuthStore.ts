import { GetMeSystemAdminDetailDTO } from '@/api/Auth/Auth.types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  user: GetMeSystemAdminDetailDTO['data'] | null;
  setUser: (user: GetMeSystemAdminDetailDTO['data'] | null) => void;
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
