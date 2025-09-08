'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { useThemeStore } from '@/store/useThemeStore';

function ThemeColorInitializer() {
  const { selectedColor, applyTheme } = useThemeStore();

  React.useEffect(() => {
    // Component mount olduğunda tema rengini uygula
    applyTheme(selectedColor);

    // Dark/Light mode değişikliklerini dinle
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          // Class değişikliği olduğunda tema rengini yeniden uygula
          setTimeout(() => applyTheme(selectedColor), 50);
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, [selectedColor, applyTheme]);

  return null;
}

export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      <ThemeColorInitializer />
      {children}
    </NextThemesProvider>
  );
}
