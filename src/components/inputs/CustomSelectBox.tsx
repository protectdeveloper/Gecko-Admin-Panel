'use client';

import * as React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { Input } from '../ui/input';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

type Option = {
  label: string;
  value: string;
  disabled?: boolean;
};

interface CustomSelectBoxProps {
  title?: string;
  placeholder?: string;
  value: string;
  onValueChange: (value: string) => void;
  data: Option[];
  disabled?: boolean;
  className?: string;
  height?: string;
  error?: string;
}

export function CustomSelectBox({
  title,
  placeholder = 'Select...',
  value,
  onValueChange,
  data,
  disabled = false,
  className = '',
  height,
  error = ''
}: CustomSelectBoxProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const filtered = data.filter((item) => item?.label.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredData(filtered);
  }, [searchTerm, data]);

  // Seçili olan veriyi tekrar seçerse sil
  const handleValueChange = (newValue: string) => {
    if (newValue === value) {
      onValueChange('');
    } else {
      onValueChange(newValue);
    }
  };

  return (
    <div className="flex flex-col gap-1">
      {title && (
        <label
          htmlFor={`input-${title?.replace(/\s+/g, '-').toLowerCase()}`}
          className={cn('pl-0.5 text-sm font-medium text-muted-foreground', error && 'text-red-500')}
        >
          {title}
        </label>
      )}

      <Select value={value} onValueChange={handleValueChange} disabled={disabled} open={open} onOpenChange={setOpen}>
        <SelectTrigger
          className={cn(
            'bg-background border shadow-sm rounded-xl dark:bg-input/30 ',
            error ? 'border-red-500 bg-destructive/10 text-red-500' : 'border-input',
            className
          )}
          style={{ height: height }}
        >
          <span className={cn('text-sm', !value && 'text-muted-foreground')}>
            {data?.find((item) => item.value === value)?.label || placeholder}
          </span>
        </SelectTrigger>

        {error && <p className="text-xs text-red-500 pl-1 pt-1">{error}</p>}

        <SelectContent className={cn('max-h-64 overflow-auto p-1 rounded-xl min-w-[160px]')}>
          <div className="sticky bg-popover pb-1.5 border-b border-border">
            <Input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={'Ara...'}
              className="h-8"
              autoComplete="off"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          <div className="py-1">
            {filteredData?.map((item, index) => (
              <SelectItem
                key={index}
                value={item.value}
                disabled={item.disabled}
                onMouseDown={(e) => {
                  if (item.value === value) {
                    e.preventDefault();
                    e.stopPropagation();
                    onValueChange('');
                    setOpen(false);
                  }
                }}
              >
                {item.label}
              </SelectItem>
            ))}

            {filteredData?.length === 0 && <div className="text-center py-2 text-sm text-muted-foreground">Sonuç Bulunamadı</div>}
          </div>
        </SelectContent>
      </Select>
    </div>
  );
}
