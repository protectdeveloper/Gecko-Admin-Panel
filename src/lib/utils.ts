import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { colorOptions } from '@/components/calendar/calendar-tailwind-classes';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const EVENT_COLORS = colorOptions.map((color) => color.value);
