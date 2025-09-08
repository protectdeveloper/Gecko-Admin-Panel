// store/useModuleStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ModuleStore = {
  activeModule: 'gecis' | 'event' | 'pdks' | 'shop';
  setActiveModule: (module: 'gecis' | 'event' | 'pdks' | 'shop') => void;
};

export const useActiveModuleStore = create<ModuleStore>()(
  persist(
    (set) => ({
      activeModule: 'gecis',
      setActiveModule: (module: 'gecis' | 'event' | 'pdks' | 'shop') => set({ activeModule: module })
    }),
    {
      name: 'active-module-storage' // localStorage key
    }
  )
);
