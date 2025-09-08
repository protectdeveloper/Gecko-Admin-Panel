'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ThemeColor {
  name: string;
  value: string;
  primary: string;
  primaryForeground: string;
  primaryHover: string;
  primaryActive: string;
  preview: string;
}

export const themeColors: ThemeColor[] = [
  {
    name: 'color.blue',
    value: 'blue',
    primary: 'oklch(0.3892 0.0985 255.07)',
    primaryForeground: 'oklch(0.985 0 0)',
    primaryHover: 'oklch(0.4392 0.1185 255.07)',
    primaryActive: 'oklch(0.3392 0.0785 255.07)',
    preview: '#1b4578'
  },
  {
    name: 'color.green',
    value: 'green',
    primary: 'oklch(0.4892 0.1385 145.07)',
    primaryForeground: 'oklch(0.985 0 0)',
    primaryHover: 'oklch(0.5392 0.1585 145.07)',
    primaryActive: 'oklch(0.4392 0.1185 145.07)',
    preview: '#059669'
  },
  {
    name: 'color.purple',
    value: 'purple',
    primary: 'oklch(0.4292 0.1585 285.07)',
    primaryForeground: 'oklch(0.985 0 0)',
    primaryHover: 'oklch(0.4792 0.1785 285.07)',
    primaryActive: 'oklch(0.3792 0.1385 285.07)',
    preview: '#7C3AED'
  },
  {
    name: 'color.orange',
    value: 'orange',
    primary: 'oklch(0.5692 0.1985 45.07)',
    primaryForeground: 'oklch(0.985 0 0)',
    primaryHover: 'oklch(0.6192 0.2185 45.07)',
    primaryActive: 'oklch(0.5192 0.1785 45.07)',
    preview: '#EA580C'
  },
  {
    name: 'color.rose',
    value: 'rose',
    primary: 'oklch(0.4892 0.1985 15.07)',
    primaryForeground: 'oklch(0.985 0 0)',
    primaryHover: 'oklch(0.5392 0.2185 15.07)',
    primaryActive: 'oklch(0.4392 0.1785 15.07)',
    preview: '#E11D48'
  }
];

interface ThemeStore {
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  applyTheme: (color: string) => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      selectedColor: 'blue',
      setSelectedColor: (color: string) => {
        set({ selectedColor: color });
        get().applyTheme(color);
      },
      applyTheme: (color: string) => {
        const selectedTheme = themeColors.find((theme) => theme.value === color);
        if (!selectedTheme) return;

        const root = document.documentElement;
        const isDark = root.classList.contains('dark');

        if (isDark) {
          // Dark mode için primary renkleri
          const darkPrimary = selectedTheme.primary.replace(/oklch\(([0-9.]+)%?/, 'oklch(70.074%');
          root.style.setProperty('--primary', darkPrimary);
          root.style.setProperty('--primary-foreground', 'oklch(0.205 0 0)');
          root.style.setProperty('--sidebar-primary', selectedTheme.primary);
        } else {
          // Light mode için primary renkleri
          root.style.setProperty('--primary', selectedTheme.primary);
          root.style.setProperty('--primary-foreground', selectedTheme.primaryForeground);
          root.style.setProperty('--sidebar-primary', 'oklch(0.205 0 0)');
        }

        // Ring rengi için de primary rengini kullan (biraz daha açık)
        const ringColor = selectedTheme.primary.replace(/oklch\(([0-9.]+)%?/, 'oklch(0.708');
        root.style.setProperty('--ring', ringColor);
      }
    }),
    {
      name: 'theme-color-storage',
      onRehydrateStorage: () => (state) => {
        // Sayfa yüklendiğinde tema rengini uygula
        if (state?.selectedColor) {
          setTimeout(() => state.applyTheme(state.selectedColor), 100);
        }
      }
    }
  )
);
