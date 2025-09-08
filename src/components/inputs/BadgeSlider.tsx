'use client';

import * as React from 'react';
import { Badge } from '@/components/ui/badge';
import * as SliderPrimitive from '@radix-ui/react-slider';

interface BadgeSliderProps {
  value: number[];
  onValueChange: (value: number[]) => void;
  max: number;
  min?: number;
  step: number;
  bageText?: string;
}

const BadgeSlider = ({ value, onValueChange, max, min, step, bageText }: BadgeSliderProps) => {
  return (
    <div className="relative w-full flex flex-col items-center max-w-sm">
      <SliderPrimitive.Root
        value={value}
        max={max || 100}
        step={step || 1}
        min={min || 0}
        onValueChange={onValueChange}
        className="relative flex w-full touch-none select-none items-center"
      >
        <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-primary/20">
          <SliderPrimitive.Range className="absolute h-full bg-primary" />
        </SliderPrimitive.Track>

        <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
          <Badge className="absolute left-1/2 -translate-x-1/2 translate-y-1/2 top-4">
            <span>
              {value[0]} {bageText}
            </span>
          </Badge>
          <div className="absolute border-[8px] left-1/2 -translate-x-1/2 border-transparent border-b-primary -bottom-3 z-10" />
        </SliderPrimitive.Thumb>
      </SliderPrimitive.Root>
    </div>
  );
};

export default BadgeSlider;
