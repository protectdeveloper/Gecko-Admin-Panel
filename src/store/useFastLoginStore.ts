import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserFasrLoginStoreState {
  customerCode: string;
  username: string;
  avatar: string;
}

interface FastLoginStoreState {
  fastLogin: UserFasrLoginStoreState | null;
  setFastLogin: (fastLogin: UserFasrLoginStoreState | null) => void;
  clearFastLoginValues: () => void;
}

export const useFastLoginStore = create<FastLoginStoreState>()(
  persist(
    (set) => ({
      fastLogin: null,
      setFastLogin: (fastLogin) => set({ fastLogin }),
      clearFastLoginValues: () => set({ fastLogin: null })
    }),
    {
      name: 'fast-login-storage',
      partialize: (state) => ({ fastLogin: state.fastLogin })
    }
  )
);
