'use client';

import { useState, useRef, useEffect } from 'react';
import { ArrowDown, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '../ui/input';
import { useTranslation } from 'react-i18next';

type Option = {
  label: string;
  value: string;
  disable?: boolean;
};

interface CustomUiMultiSelectBoxProps {
  value: string[];
  onChange: (val: string[]) => void;
  data: Option[];
  label: string;
  error?: string;
  disabled?: boolean;
  placeholder?: string;
  maxCount?: number;
  ref?: React.Ref<HTMLInputElement>;
}

export function CustomUiMultiSelectBox({
  value,
  onChange,
  data,
  label,
  error,
  disabled = false,
  placeholder = 'Select...',
  maxCount,
  ref
}: CustomUiMultiSelectBoxProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const shouldFloat = isFocused || value?.length > 0;

  const toggleValue = (val: string) => {
    if (value?.includes(val)) {
      onChange(value?.filter((v) => v !== val));
    } else {
      if (typeof maxCount === 'number') {
        if (value?.length < maxCount) {
          onChange([...value, val]);
        }
      } else {
        onChange([...value, val]);
      }
    }
  };

  const removeValue = (val: string) => {
    onChange(value.filter((v) => v !== val));
  };

  const selectedLabels = data && data?.filter((opt) => value?.includes(opt?.value))?.map((opt) => opt?.label);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const filtered = data?.filter((item) => item?.label?.toLowerCase()?.includes(searchTerm.toLowerCase()));
    setFilteredData(filtered);
  }, [searchTerm, data]);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <input
        type="text"
        readOnly
        value={value.join(',')}
        ref={ref}
        tabIndex={-1}
        style={{
          position: 'absolute',
          opacity: 0,
          height: 0,
          width: 0,
          pointerEvents: 'none',
          userSelect: 'none'
        }}
        aria-label={label}
      />

      <div
        className={cn(
          'flex items-center h-[55px] gap-2 px-2.5 rounded-xl border shadow-sm',
          'transition-all duration-200 ease-in-out',
          error ? 'border-red-500 bg-destructive/10' : 'bg-muted dark:bg-input/30',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <div className="flex flex-row overflow-x-auto gap-1.5">
          {selectedLabels?.length > 0 ? (
            selectedLabels?.map((label, i) => (
              <div key={i} className="flex items-center gap-1 mt-4.5 py-[1px] px-2 bg-input text-foreground rounded-md">
                <span className="truncate text-xs">{label}</span>
                <X
                  size={14}
                  className="cursor-pointer hover:text-red-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeValue(data.find((opt) => opt.label === label)?.value || '');
                  }}
                />
              </div>
            ))
          ) : (
            <span className="text-sm text-muted-foreground">{placeholder}</span>
          )}
        </div>

        <div
          className="ml-auto cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
        >
          <ArrowDown
            size={16}
            className={cn('text-muted-foreground transition-transform duration-200', isOpen && 'rotate-180')}
          />
        </div>
      </div>

      {(isFocused || value?.length > 0) && (
        <label
          htmlFor={`input-${label?.replace(/\s+/g, '-')?.toLowerCase()}`}
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

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white dark:bg-muted rounded-md shadow-lg border border-border">
          <div className="p-2 border-b border-border">
            <Input
              ref={searchInputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={'Ara...'}
              className="h-8"
              autoComplete="off"
            />
          </div>

          <div className="max-h-60 overflow-auto">
            {filteredData?.map((item, index) => (
              <div
                key={index}
                className={cn(
                  'flex flex-row justify-between py-1.5 px-2 text-sm cursor-pointer',
                  'hover:bg-accent',
                  value?.includes(item?.value) && 'bg-accent text-accent-foreground font-medium',
                  item?.disable && 'opacity-50 pointer-events-none'
                )}
                onClick={() => toggleValue(item?.value)}
              >
                {item?.label}

                {value?.includes(item?.value) && <Check size={14} className="ml-2 text-foreground" />}
              </div>
            ))}

            {filteredData?.length === 0 && <div className="text-center py-2 text-sm text-muted-foreground">Sonuç Bulunamadı</div>}
          </div>
        </div>
      )}
    </div>
  );
}
