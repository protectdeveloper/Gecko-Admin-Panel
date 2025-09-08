'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Input } from '../ui/input';
import { ArrowDown, ChevronDown, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { CustomGroupedTreeMultiCheckboxData } from './CustomGroupedTreeMultiCheckbox';
import { Checkbox } from '../ui/checkbox';

interface Props {
  title?: string;
  value: string[];
  onValueChange: (value: string[]) => void;
  placeholder: string;
  data: CustomGroupedTreeMultiCheckboxData[];
  className?: string;
  disabled?: boolean;
  error?: string;
  ref?: React.Ref<HTMLInputElement>;
}

export default function CustomUiGroupedTreeMultiCheckbox({
  placeholder,
  title,
  value,
  onValueChange,
  data,
  disabled = false,
  error = '',
  className,
  ref
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set(value));
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const shouldFloat = isFocused || selected.size > 0;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setSelected(new Set(value));
  }, [value]);

  const toggleItem = (val: string, options: any[]) => {
    const next = new Set(selected);
    const isSelected = next.has(val);

    if (isSelected) {
      next.delete(val);
    } else {
      next.add(val);
    }

    const currentOption = options.find((opt) => opt.roleID === val);
    if (currentOption?.children?.length > 0) {
      const toggleChildren = (children: any[]) => {
        children.forEach((child) => {
          if (isSelected) {
            next.delete(child.roleID);
          } else {
            next.add(child.roleID);
          }
          if (child.children?.length > 0) {
            toggleChildren(child.children);
          }
        });
      };
      toggleChildren(currentOption.children);
    }

    setSelected(next);
    onValueChange(Array.from(next));
  };

  const toggleExpand = (value: string) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      next.has(value) ? next.delete(value) : next.add(value);
      return next;
    });
  };

  const renderOptions = (options: any[], level = 0) => {
    return options.map((opt) => {
      const isExpanded = expandedGroups.has(opt.roleID);
      const hasChildren = opt.children?.length > 0;
      const isChecked = selected.has(opt.roleID);

      return (
        <div key={opt.roleID}>
          <div
            style={{ paddingLeft: level * 16 }}
            className={cn(
              'flex items-center py-1.5 px-2 gap-1.5 text-sm rounded-sm',
              !opt.isEnabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-accent'
            )}
          >
            {hasChildren ? (
              <div
                className="flex items-center gap-1"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleExpand(opt.roleID);
                }}
              >
                {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </div>
            ) : (
              <div className="w-[16px]" />
            )}

            <Checkbox
              checked={isChecked}
              onCheckedChange={() => toggleItem(opt.roleID, options)}
              disabled={!opt.isEnabled}
              aria-label="Select option"
            />

            <span
              className={cn('flex-1', !opt.isEnabled && 'cursor-not-allowed')}
              onClick={() => opt.isEnabled && toggleItem(opt.roleID, options)}
            >
              {opt.roleName}
            </span>
          </div>

          {isExpanded && hasChildren && <div>{renderOptions(opt.children, level + 1)}</div>}
        </div>
      );
    });
  };

  return (
    <div className={cn('relative w-full', className)} ref={containerRef}>
      <div
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={cn(
          'flex items-center px-3 py-2 rounded-xl border shadow-sm',
          'transition-all duration-200 ease-in-out',
          'focus-within:ring-2 focus-within:ring-primary/30 focus-within:border-primary',
          error ? 'border-red-500 bg-destructive/10' : 'bg-muted dark:bg-input/30',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      >
        <Input
          type="text"
          ref={ref}
          value={selected.size > 0 ? `${selected.size} Seçim Yapıldı` : ''}
          readOnly
          placeholder={!isFocused && selected.size === 0 ? placeholder : ''}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          id={`input-${title?.replace(/\s+/g, '-')?.toLowerCase()}`}
          className={cn(
            'w-full dark:bg-input/0 p-0 m-0 border-none shadow-none text-sm',
            'focus-visible:ring-0 focus-visible:ring-offset-0',
            (isFocused || value?.length > 0) && 'pt-4'
          )}
        />
        <ArrowDown size={16} className={cn('text-muted-foreground transition-transform', isOpen && 'rotate-180')} />
      </div>

      {(isFocused || value?.length > 0) && (
        <label
          htmlFor={`input-${title?.replace(/\s+/g, '-')?.toLowerCase()}`}
          className={cn(
            'absolute left-2 px-1.5 text-sm bg-transparent transition-all',
            'pointer-events-none',
            shouldFloat ? 'text-xs top-2 text-muted-foreground' : 'text-sm top-2 text-muted-foreground',
            error && 'text-red-500'
          )}
        >
          {title}
        </label>
      )}

      {error && <p className="text-xs text-red-500 pl-1 pt-1">{error}</p>}

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full bg-white dark:bg-muted rounded-md shadow-lg border border-border max-h-60 overflow-auto p-1">
          {data?.map((group) => (
            <div key={group.groupValue} className="mb-2">
              <div className="text-sm font-semibold text-muted-foreground px-1.5">{group.groupLabel}</div>
              <div>{renderOptions(group.options)}</div>
            </div>
          ))}

          {data?.length === 0 && (
            <div className="text-center py-1 text-sm text-muted-foreground">
              <span className="text-sm text-muted-foreground">Sonuç Bulunamadı</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
