'use client';

import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';

import { cn } from '@/lib/utils';

interface ProgressProps extends React.ComponentProps<typeof ProgressPrimitive.Root> {
  fill?: string; // fill color className, ör: "bg-green-500"
}

function Progress({ className, value, fill = 'bg-primary', max = 100, ...props }: ProgressProps) {
  const percentage = Math.min(100, Math.max(0, ((value || 0) / max) * 100));

  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn('relative h-2 w-full overflow-hidden rounded-full', className)}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={cn(fill, 'h-full transition-all')}
        style={{ width: `${percentage}%` }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
