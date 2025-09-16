'use client';
import { cn } from '@/lib/utils';
import { Textarea } from '../ui/textarea';
import React from 'react';

interface CustomTextAreaInputProps {
  autoFocus?: boolean;
  value: string;
  onChange: (val: string) => void;
  disabled?: boolean;
  placeholder?: string;
  label?: string;
  error?: string;
  unit?: string;
  className?: string;
  type?: 'text' | 'password' | 'email' | 'number';
  maxLength?: number;
  minLength?: number;
  maxHeight?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  onFocusCapture?: () => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}
const CustomTextAreaInput = React.forwardRef<HTMLTextAreaElement, CustomTextAreaInputProps>(
  (
    {
      className,
      error,
      label,
      value,
      onChange,
      onKeyDown,
      disabled = false,
      placeholder = '',
      minLength,
      maxLength,
      onFocus,
      onBlur,
      onFocusCapture,
      autoFocus = false
    },
    ref
  ) => {
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange(e.target.value);
    };

    return (
      <div className={cn('flex flex-col gap-1', className)}>
        {label && (
          <label
            htmlFor={`input-${placeholder.replace(/\s+/g, '-').toLowerCase()}`}
            className={cn('pl-0.5 text-sm font-medium text-muted-foreground', error && 'text-red-500')}
          >
            {label}
          </label>
        )}

        <div
          className={cn(
            'w-full flex items-center px-3 py-0 rounded-xl border shadow-sm gap-0 dark:bg-input/30 overflow-hidden',
            'transition-all duration-200 ease-in-out',
            'focus-within:ring-2 focus-within:ring-primary/30 focus-within:border-primary',
            error ? 'border-red-500 bg-destructive/10 text-red-500' : 'border-input'
          )}
        >
          <Textarea
            ref={ref}
            value={value}
            autoFocus={autoFocus}
            onChange={handleChange}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            onFocus={onFocus}
            onFocusCapture={onFocusCapture}
            onBlur={onBlur}
            className={cn(
              'w-full max-w-full resize-none dark:bg-input/0 p-0 py-1.5 m-0 border-none shadow-none text-sm',
              'focus-visible:ring-0 focus-visible:ring-offset-0',
              'overflow-y-auto overflow-x-hidden max-h-32 min-h-[38px]',
              'break-all whitespace-pre-wrap'
            )}
            id={`input-${placeholder.replace(/\s+/g, '-').toLowerCase()}`}
            maxLength={maxLength}
            minLength={minLength}
          />
        </div>

        {error && <p className="text-xs text-red-500 pl-1 pt-1">{error}</p>}
      </div>
    );
  }
);

CustomTextAreaInput.displayName = 'CustomTextAreaInput';

export default CustomTextAreaInput;
