import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GetSupportAdminTicketsDTO } from '@/api/Support/Support.types';

interface SupportStoreState {
  customer: GetSupportAdminTicketsDTO['data'][0]['customer'] | null;
  user: GetSupportAdminTicketsDTO['data'][0]['user'] | null;
  role: GetSupportAdminTicketsDTO['data'][0]['role'] | null;

  setCustomer: (customer: GetSupportAdminTicketsDTO['data'][0]['customer']) => void;
  setUser: (user: GetSupportAdminTicketsDTO['data'][0]['user']) => void;
  setRole: (role: GetSupportAdminTicketsDTO['data'][0]['role']) => void;
  reset: () => void;
}

export const useSupportStore = create(
  persist<SupportStoreState>(
    (set) => ({
      customer: null,
      user: null,
      role: null,

      setCustomer: (customer) => set({ customer }),
      setUser: (user) => set({ user }),
      setRole: (role) => set({ role }),
      reset: () => set({ customer: null, user: null, role: null })
    }),
    {
      name: 'active-support-store',
      skipHydration: false
    }
  )
);
