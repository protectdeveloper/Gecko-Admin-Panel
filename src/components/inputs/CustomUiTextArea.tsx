'use client';

import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { Info } from 'lucide-react';
import { useState } from 'react';

interface CustomTextAreaProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  error?: string;
  disabled?: boolean;
  placeholder?: string;
  rows?: number;
}

const CustomUiTextArea = ({
  label,
  value,
  onChange,
  error,
  disabled = false,
  placeholder = '',
  rows = 3
}: CustomTextAreaProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const shouldFloat = isFocused || value?.length > 0;

  return (
    <div className="relative w-full">
      <div
        className={cn(
          'flex items-start px-3 py-2 rounded-xl border shadow-sm',
          'transition-all duration-200 ease-in-out',
          'focus-within:ring-2 focus-within:ring-primary/30 focus-within:border-primary',
          error ? 'border-red-500 bg-destructive/10' : 'bg-muted dark:bg-input/30'
        )}
      >
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          rows={rows}
          className={cn(
            'w-full dark:bg-input/0 p-0 m-0 border-none shadow-none text-sm resize-none',
            'focus-visible:ring-0 focus-visible:ring-offset-0',
            (isFocused || value?.length > 0) && 'pt-4'
          )}
          id={`textarea-${label.replace(/\s+/g, '-').toLowerCase()}`}
          placeholder={value?.length === 0 && !isFocused ? placeholder : ''}
        />

        <div className="flex flex-row items-start pt-2">{error && <Info size={16} className="text-red-500" />}</div>
      </div>

      {(isFocused || value?.length > 0) && (
        <label
          htmlFor={`textarea-${label.replace(/\s+/g, '-').toLowerCase()}`}
          className={cn(
            'absolute left-2 px-1.5 text-sm bg-transparent transition-all',
            'pointer-events-none',
            shouldFloat ? 'text-xs top-2 text-muted-foreground' : 'text-sm top-2 text-muted-foreground',
            error && 'text-red-500'
          )}
        >
          {label}
        </label>
      )}

      {error && <p className="text-xs text-red-500 pl-1 pt-1">{error}</p>}
    </div>
  );
};

export default CustomUiTextArea;
