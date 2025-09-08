'use client';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Eye, EyeOff } from 'lucide-react';

interface CustomTextInput {
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
}

const CustomTextInput = ({
  className,
  error,
  label,
  value,
  onChange,
  disabled = false,
  placeholder = '',
  unit,
  type = 'text',
  maxLength,
  minLength
}: CustomTextInput) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const isNumber = type === 'number';

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
          'w-full flex items-center px-3 py-0 rounded-xl border shadow-sm gap-0 dark:bg-input/30',
          'transition-all duration-200 ease-in-out',
          'focus-within:ring-2 focus-within:ring-primary/30 focus-within:border-primary',
          error ? 'border-red-500 bg-destructive/10 text-red-500' : 'border-input'
        )}
      >
        <Input
          type={isPassword && !showPassword ? 'password' : 'text'}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          className={cn(
            'w-full dark:bg-input/0 p-0 m-0 border-none shadow-none text-sm',
            'focus-visible:ring-0 focus-visible:ring-offset-0'
          )}
          id={`input-${placeholder.replace(/\s+/g, '-').toLowerCase()}`}
          placeholder={placeholder}
          maxLength={maxLength}
          minLength={minLength}
        />

        {unit && <span className="text-sm text-muted-foreground">{unit}</span>}

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

      {error && <p className="text-xs text-red-500 pl-1 pt-1">{error}</p>}
    </div>
  );
};

export default CustomTextInput;
