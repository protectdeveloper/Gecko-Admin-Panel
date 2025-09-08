// components/ui/status-badge.tsx
import { cn } from '@/lib/utils';
import { Card } from '../ui/card';

interface StatusBadgeProps {
  label: string;
  color: string; // Tailwind renk sınıfı örn: "bg-blue-500"
  className?: string; // Opsiyonel ek sınıflar
}

export function StatusBadge({ label, color, className }: StatusBadgeProps) {
  return (
    <Card
      className={cn(
        'flex-row inline-flex w-auto items-center border border-input gap-2 rounded-lg px-3 py-1 text-sm font-medium',
        className
      )}
    >
      <span className={cn('w-2.5 h-2.5 rounded-full', color)} />
      <span>{label}</span>
    </Card>
  );
}
