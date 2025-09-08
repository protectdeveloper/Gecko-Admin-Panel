'use client';

import * as React from 'react';
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

export interface PatternSelectBoxProps {
  value: string;
  onValueChange: (value: string) => void;
  data: any[];
  groupKeyName: string;
  groupLabelName: string;
  groupDetailsName: string;
  detailKeyName: string;
  detailValueFields: string[];
  detailLabelFields: string[];
  placeholder?: string;
  title?: string;
  className?: string;
  error?: string;
  disabled?: boolean;
}

export function CustomFlexiSelectBox({
  value,
  onValueChange,
  data,
  groupKeyName,
  groupDetailsName,
  detailKeyName,
  detailValueFields,
  detailLabelFields,
  placeholder = 'Select...',
  title,
  className = '',
  error = '',
  disabled = false
}: PatternSelectBoxProps) {
  const selectedLabel = React.useMemo(() => {
    for (const group of data) {
      const details = group[groupDetailsName];
      if (!details) continue;

      for (const detail of details) {
        // detailValue = detailValueFields içindeki alanları _ ile birleştiriyoruz
        const detailValue = detailValueFields
          .map((field) => (field === groupKeyName ? group[groupKeyName] : detail[field]))
          .join('_');

        if (detailValue === value) {
          // label için detailLabelFields ile örnek gösterim:
          // ilk alan kod, sonra startTime - endTime gibi dizgeler varsa özel yapabilirsin
          const labelParts = detailLabelFields.map((field) => detail[field]);
          return labelParts.join(' ');
        }
      }
    }
    return '';
  }, [value, data, groupDetailsName, detailValueFields, detailLabelFields, groupKeyName]);

  return (
    <div className="flex flex-col gap-1">
      {title && (
        <label className={cn('pl-0.5 text-sm font-medium text-muted-foreground', error && 'text-red-500')}>{title}</label>
      )}

      <Select value={value} onValueChange={onValueChange} disabled={disabled}>
        <SelectTrigger
          className={cn(
            'bg-background border shadow-sm rounded-xl',
            error ? 'border-red-500 bg-destructive/10 text-red-500' : 'border-input',
            className
          )}
        >
          <span className={cn('text-sm', value ? '' : 'text-muted-foreground')}>{selectedLabel || placeholder}</span>
        </SelectTrigger>

        {error && <p className="text-xs text-red-500 pl-1 pt-1">{error}</p>}

        <SelectContent className={cn('w-auto max-h-64 overflow-auto rounded-xl', className)}>
          {data?.length === 0 && (
            <div className="text-center py-1 text-sm text-muted-foreground">
              <span className="text-sm text-muted-foreground">Sonuç Bulunamadı</span>
            </div>
          )}

          {data?.map((group) => {
            const groupKey = group[groupKeyName];
            const groupLabel = `${group.patternName} - ${group.roleName}`;
            const details = group[groupDetailsName] ?? [];

            return (
              <div key={groupKey} className="w-full max-h-64 overflow-auto">
                <div className="px-2 py-1 text-sm  font-normal">- {groupLabel}</div>

                {details?.map((detail: any, index: number) => {
                  const detailKey = detail[detailKeyName];
                  const uniqueKey = `${groupKey}_${detailKey}_${detail.startTime}_${detail.endTime}_${index}`;
                  const detailValue = detailValueFields
                    .map((field) => (field === groupKeyName ? group[groupKeyName] : detail[field]))
                    .join('_');
                  const detailLabel = detailLabelFields.map((field) => detail[field]).join(' ');

                  return (
                    <SelectItem className="pl-4 text-muted-foreground" key={uniqueKey} value={detailValue}>
                      {detailLabel}
                    </SelectItem>
                  );
                })}
              </div>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}
