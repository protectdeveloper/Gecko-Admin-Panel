import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GetSupportAdminTicketsDTO } from '@/api/Support/Support.types';

interface SupportStoreState {
  customer: GetSupportAdminTicketsDTO['data'][0]['customer'] | null;
  user: GetSupportAdminTicketsDTO['data'][0]['user'] | null;
  role: GetSupportAdminTicketsDTO['data'][0]['role'] | null;
  isActive: GetSupportAdminTicketsDTO['data'][0]['isActive'] | null;
  status: GetSupportAdminTicketsDTO['data'][0]['status'] | null;

  setCustomer: (customer: GetSupportAdminTicketsDTO['data'][0]['customer']) => void;
  setUser: (user: GetSupportAdminTicketsDTO['data'][0]['user']) => void;
  setRole: (role: GetSupportAdminTicketsDTO['data'][0]['role']) => void;
  setIsActive: (isActive: GetSupportAdminTicketsDTO['data'][0]['isActive']) => void;
  setStatus: (status: GetSupportAdminTicketsDTO['data'][0]['status']) => void;
  reset: () => void;
}

export const useSupportStore = create(
  persist<SupportStoreState>(
    (set) => ({
      customer: null,
      user: null,
      role: null,
      isActive: null,
      status: null,

      setIsActive: (isActive) => set({ isActive }),
      setStatus: (status) => set({ status }),
      setCustomer: (customer) => set({ customer }),
      setUser: (user) => set({ user }),
      setRole: (role) => set({ role }),
      reset: () => set({ customer: null, user: null, role: null, isActive: null, status: null })
    }),
    {
      name: 'active-support-store',
      skipHydration: false
    }
  )
);
