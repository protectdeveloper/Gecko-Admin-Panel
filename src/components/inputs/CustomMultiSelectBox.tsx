import React from 'react';
import { MultiSelect } from '../ui/multi-select';
import { cn } from '@/lib/utils';

export type CustomMultiSelectBoxOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

interface CustomMultiSelectBoxProps {
  title?: string;
  placeholder?: string;
  value: string[];
  onChange: (value: string[]) => void;
  option: CustomMultiSelectBoxOption[];
  disabled?: boolean;
  error?: string;
  variant?: 'default' | 'secondary' | 'destructive' | 'inverted';
  maxVisibleCount?: number;
}

const CustomMultiSelectBox = ({
  title,
  placeholder = 'Select...',
  variant,
  value,
  onChange,
  option,
  disabled = false,
  error = '',
  maxVisibleCount = 5
}: CustomMultiSelectBoxProps) => {
  return (
    <div className={cn('flex flex-col gap-1')}>
      {title && (
        <label
          htmlFor={`input-${title.replace(/\s+/g, '-').toLowerCase()}`}
          className="pl-0.5 text-sm font-medium text-muted-foreground"
        >
          {title}
        </label>
      )}

      <MultiSelect
        options={option}
        value={value}
        onValueChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        variant={variant || 'default'}
        maxCount={maxVisibleCount}
        className={cn('w-full dark:bg-input/30 overflow-auto', error ? 'border-red-500 bg-destructive/10' : 'border-border')}
      />

      {error && <p className="text-xs text-red-500 pl-1 pt-1">{error}</p>}
    </div>
  );
};

export default CustomMultiSelectBox;
