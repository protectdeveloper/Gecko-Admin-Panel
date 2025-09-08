'use client';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Eye, EyeOff, Info } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '../ui/button';

interface CustomTextInputProps {
  label?: string;
  type?: 'text' | 'password' | 'email' | 'number';
  value: string;
  onChange: (val: string) => void;
  error?: string;
  disabled?: boolean;
  placeholder?: string;
  maxLength?: number;
  minLength?: number;
  className?: string;
  unit?: React.ReactNode;
  ref?: React.Ref<HTMLInputElement>;
}

const CustomUiTextInput = ({
  label,
  type = 'text',
  value,
  onChange,
  error,
  disabled = false,
  placeholder = '',
  className = '',
  maxLength,
  minLength,
  unit = null,
  ref
}: CustomTextInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const isPassword = type === 'password';
  const isNumber = type === 'number';
  const shouldFloat = isFocused || value?.length > 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isNumber) {
      const val = e.target.value;
      if (/^\d*$/.test(val) && (val === '' || !/^0\d+/.test(val))) {
        onChange(val);
      }
    } else {
      onChange(e.target.value);
    }
  };

  return (
    <div className={cn('relative w-full')}>
      <div
        className={cn(
          'flex items-center px-3 py-2 rounded-xl border shadow-sm gap-2',
          'transition-all duration-200 ease-in-out',
          'focus-within:ring-2 focus-within:ring-primary/30 focus-within:border-primary',
          error ? 'border-red-500 bg-destructive/10' : 'bg-muted dark:bg-input/30',
          className
        )}
      >
        <Input
          type={isPassword && !showPassword ? 'password' : 'text'}
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          maxLength={maxLength}
          minLength={minLength}
          disabled={disabled}
          ref={ref}
          className={cn(
            'w-full dark:bg-input/0 p-0 m-0 border-none shadow-none text-sm',
            'focus-visible:ring-0 focus-visible:ring-offset-0',
            (isFocused || value?.length > 0) && 'pt-4'
          )}
          id={`input-${label?.replace(/\s+/g, '-').toLowerCase()}`}
          placeholder={value?.length === 0 && !isFocused ? placeholder : ''}
        />

        {unit && <div>{unit}</div>}

        <div className="flex flex-row items-center">
          {error && <Info size={16} className="text-red-500" />}

          {isPassword && (
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="text-muted-foreground hover:bg-transparent p-0"
              onClick={() => setShowPassword((prev) => !prev)}
              tabIndex={-1}
            >
              {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
            </Button>
          )}
        </div>
      </div>

      {(isFocused || value?.length > 0) && (
        <label
          htmlFor={`input-${label?.replace(/\s+/g, '-').toLowerCase()}`}
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

export default CustomUiTextInput;
