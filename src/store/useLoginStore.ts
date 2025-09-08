// src/store/scheduleStore.ts
import { create } from 'zustand';

interface LoginStoreState {
  customerCode: string;
  userName: string;
  password: string;
  isRememberMe: boolean;

  setCustomerCode: (code: string) => void;
  setUserName: (name: string) => void;
  setPassword: (password: string) => void;
  setIsRememberMe: (isRemember: boolean) => void;
  reset: () => void;
}

export const useLoginStore = create<LoginStoreState>((set) => {
  return {
    customerCode: '',
    userName: '',
    password: '',
    isRememberMe: false,

    setCustomerCode: (code) => set({ customerCode: code }),
    setUserName: (name) => set({ userName: name }),
    setPassword: (password) => set({ password }),
    setIsRememberMe: (isRemember) => set({ isRememberMe: isRemember }),
    reset: () => set({ customerCode: '', userName: '', password: '' })
  };
});
