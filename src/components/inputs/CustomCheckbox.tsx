import React from 'react';
import { Checkbox } from '../ui/checkbox';
import { cn } from '@/lib/utils';

interface CustomCheckboxProps {
  value: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
  label?: string;
  secondaryLabel?: string;
  labelPressable?: () => void;
  disabled?: boolean;
  labelClassName?: string;
}

const CustomCheckbox = ({
  value,
  onChange,
  error,
  label,
  secondaryLabel,
  labelPressable,
  labelClassName,
  disabled
}: CustomCheckboxProps) => {
  return (
    <div className="flex flex-row items-center gap-2 cursor-pointer">
      <Checkbox
        checked={value}
        onCheckedChange={onChange}
        disabled={disabled}
        className={cn('border-border disabled:cursor-not-allowed', error && 'border-red-500')}
        aria-label={label}
      />
      <span className={cn('transition-all text-sm', error && 'text-red-500', disabled && 'opacity-50 cursor-not-allowed')}>
        <span
          className={cn(disabled && 'cursor-not-allowed pointer-events-none', labelPressable && 'underline', labelClassName)}
          onClick={(event) => {
            if (labelPressable) {
              event.stopPropagation();
              labelPressable();
            } else {
              onChange(!value);
            }
          }}
        >
          {label}
        </span>{' '}
        {secondaryLabel}
      </span>
    </div>
  );
};

export default CustomCheckbox;
