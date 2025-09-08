'use client';
import { ArrowDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Input } from '../ui/input';
import { useTranslation } from 'react-i18next';
import { Spinner } from '../ui/spinner';

type SelectItem = {
  id: string;
  label: string;
  disabled?: boolean;
};

interface CustomUiSelectBoxProps {
  value: string;
  onChange: (val: string) => void;
  data: SelectItem[];
  label: string;
  error?: string;
  disabled?: boolean;
  placeholder?: string;
  unit?: React.ReactNode;
  ref?: React.Ref<HTMLInputElement>;
  onSearchChange?: (search: string) => void;
  loading?: boolean;
}

export function CustomUiSelectBox({
  value,
  onChange,
  ref,
  data,
  error,
  disabled,
  placeholder,
  label,
  unit,
  onSearchChange,
  loading = false
}: CustomUiSelectBoxProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const shouldFloat = isFocused || value?.length > 0;
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleInputClick = () => {
    if (!disabled) {
      setIsOpen(true);
    }
  };

  const handleSelect = (id: string) => {
    // Reselecting the same item clears the selection
    if (id === value) {
      onChange('');
    } else {
      onChange(id);
    }
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const filtered = data.filter((item) => item?.label?.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredData(filtered);
  }, [searchTerm, data]);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div
        className={cn(
          'flex items-center px-3 py-2 rounded-xl border shadow-sm gap-2',
          'transition-all duration-200 ease-in-out',
          'focus-within:ring-2 focus-within:ring-primary/30 focus-within:border-primary',
          error ? 'border-red-500 bg-destructive/10' : 'bg-muted dark:bg-input/30',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      >
        <Input
          type={'text'}
          ref={ref}
          value={data?.find((item) => item?.id === value)?.label || ''}
          readOnly
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onClick={handleInputClick}
          disabled={disabled}
          className={cn(
            'w-full dark:bg-input/0 p-0 m-0 border-none shadow-none text-sm',
            'focus-visible:ring-0 focus-visible:ring-offset-0',
            (isFocused || value?.length > 0) && 'pt-4'
          )}
          id={`input-${label?.replace(/\s+/g, '-')?.toLowerCase()}`}
          placeholder={value?.length === 0 && !isFocused ? placeholder : ''}
        />

        {unit && <div>{unit}</div>}

        <div className="flex flex-row items-center cursor-pointer" onClick={() => !disabled && setIsOpen(!isOpen)}>
          <ArrowDown
            size={16}
            className={cn('text-muted-foreground transition-transform duration-200', isOpen && 'transform rotate-180')}
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
              placeholder={'Ara...'}
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                if (onSearchChange) {
                  onSearchChange(e.target.value);
                }
              }}
              className="w-full text-sm"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          <div className="max-h-60 overflow-auto p-1">
            {loading && (
              <div className="w-full flex flex-col items-center justify-center py-4 gap-2">
                <Spinner className="text-primary size-6" />
                <span className="text-sm text-muted-foreground">Yükleniyor...</span>
              </div>
            )}

            {!loading && (
              <div>
                {filteredData?.length > 0 ? (
                  filteredData?.map((item, index) => (
                    <div
                      key={index}
                      className={cn(
                        'py-1.5 px-2 text-sm rounded-sm',
                        !item.disabled ? 'cursor-pointer hover:bg-accent' : 'opacity-50 cursor-not-allowed',
                        value === item.id && 'bg-accent text-accent-foreground font-medium'
                      )}
                      onClick={() => {
                        if (!item.disabled) handleSelect(item.id);
                      }}
                      aria-disabled={item.disabled}
                    >
                      {item.label}
                    </div>
                  ))
                ) : (
                  <div className="py-1.5 px-2 text-sm text-muted-foreground text-center">Sonuç Bulunamadı</div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
