'use client';

import * as React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useThemeStore, themeColors, type ThemeColor } from '@/store/useThemeStore';
import { useTranslation } from '@/hooks/useTranslation';

interface ThemeColorPickerProps {
  className?: string;
}

export function ThemeColorPicker({ className }: ThemeColorPickerProps) {
  const { selectedColor, setSelectedColor } = useThemeStore();

  const handleColorSelect = (color: ThemeColor) => {
    setSelectedColor(color.value);
  };

  return (
    <div className={cn('space-y-3', className)}>
      <div className="text-sm font-medium text-foreground">Birincil Renk</div>
      <div className="grid grid-cols-5 gap-2">
        {themeColors.map((color) => (
          <button
            key={color.value}
            onClick={() => handleColorSelect(color)}
            className={cn(
              'relative h-8 w-8 rounded-full border-2 transition-all duration-200 hover:scale-110',
              selectedColor === color.value ? 'border-foreground shadow-lg' : 'border-border hover:border-foreground/50'
            )}
            style={{ backgroundColor: color.preview }}
            title={color.name}
          >
            {selectedColor === color.value && <Check className="absolute inset-0 m-auto h-4 w-4 text-white drop-shadow-sm" />}
          </button>
        ))}
      </div>
      <div className="text-xs text-muted-foreground">
        Mevcut Renk: {themeColors.find((c) => c.value === selectedColor)?.name || 'theme.default'}
      </div>
    </div>
  );
}
