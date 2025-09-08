'use client';

import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks/useDebounce';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';

interface CustomSearchInputProps {
  value: string;
  onChange: (val: string) => void;
  disabled?: boolean;
  placeholder?: string;
  width?: number;
}

const CustomSearchInput = ({ onChange, width, disabled = false, placeholder = '', ...props }: CustomSearchInputProps) => {
  const [value, setValue] = useState(props.value || '');
  const debounceValue = useDebounce(value, 700);

  useEffect(() => {
    onChange(debounceValue as string);
  }, [debounceValue]);

  useEffect(() => {
    setValue(props.value || '');
  }, [props.value]);

  return (
    <div
      className={cn(
        'flex items-center px-3 gap-2 h-9 rounded-xl dark:bg-input/30 border shadow-sm',
        'transition-all duration-200 ease-in-out',
        'focus-within:ring-2 focus-within:ring-primary/30 focus-within:border-primary',
        width ? `w-[${width}px]` : 'w-auto'
      )}
    >
      <Search size={20} />

      <Input
        type={'text'}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={disabled}
        className={cn(
          'w-full dark:bg-input/0 p-0 m-0 border-none shadow-none text-sm',
          'focus-visible:ring-0 focus-visible:ring-offset-0'
        )}
        id={`input-${placeholder.replace(/\s+/g, '-').toLowerCase()}`}
        placeholder={placeholder}
      />
    </div>
  );
};

export default CustomSearchInput;
