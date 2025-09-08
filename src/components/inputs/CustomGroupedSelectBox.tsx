'use client';

import { ChevronDown, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Input } from '../ui/input';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'; // Shadcn popover bileşenleri
import { useTranslation } from 'react-i18next';

export type CustomGroupedSelectBoxOption = {
  roleID: string;
  roleName: string;
  roleTypeID: string;
  parentRoleID: string | null;
  isActive: boolean;
  isDefault: boolean;
  identifierCode: string;
  description: string;
  isEnabled: boolean;
  children: CustomGroupedSelectBoxOption[];
};

interface CustomGroupedSelectBoxProps {
  value: string;
  onChange: (val: string) => void;
  options: CustomGroupedSelectBoxOption[];
  label?: string;
  error?: string;
  disabled?: boolean;
  placeholder?: string;
}

export function CustomGroupedSelectBox({
  value,
  onChange,
  options,
  error,
  disabled,
  placeholder,
  label
}: CustomGroupedSelectBoxProps) {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLButtonElement>(null); // Input container ref
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const [popoverWidth, setPopoverWidth] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (inputRef.current) {
      setPopoverWidth(inputRef.current.offsetWidth);
    }
  }, [open, options]); // open ve options değiştiğinde genişlik güncellenir

  const toggleGroup = (roleID: string) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      next.has(roleID) ? next.delete(roleID) : next.add(roleID);
      return next;
    });
  };

  const handleSelect = (roleID: string) => {
    // Reselecting the same item clears the selection
    if (roleID === value) {
      onChange('');
    } else {
      onChange(roleID);
    }
    setOpen(false);
  };

  const findRoleName = (roleID: string, roles: CustomGroupedSelectBoxOption[]): string => {
    for (const role of roles) {
      if (role.roleID === roleID) return role.roleName;
      if (role.children.length > 0) {
        const found = findRoleName(roleID, role.children);
        if (found) return found;
      }
    }
    return '';
  };

  const selectedRoleName = findRoleName(value, options);

  const renderRoleGroup = (role: CustomGroupedSelectBoxOption, level: number = 0) => {
    const isExpanded = expandedGroups.has(role.roleID);
    const hasChildren = role.children.length > 0;
    const paddingLeft = level > 0 ? 10 + level * 15 : 5;

    return (
      <div key={role.roleID} className="w-auto">
        {hasChildren ? (
          <div
            style={{ paddingLeft }}
            className={cn(
              'flex items-center py-1.5 px-2 gap-1 text-sm rounded-sm',
              !role.isEnabled ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-accent'
            )}
          >
            <div
              className={cn('flex items-center cursor-pointer')}
              onClick={(e) => {
                e.stopPropagation();
                toggleGroup(role.roleID);
              }}
            >
              {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </div>
            <span
              className={cn('font-medium flex-1', role.isEnabled ? 'cursor-pointer' : 'cursor-not-allowed opacity-50')}
              onClick={() => {
                if (role.isEnabled) {
                  handleSelect(role.roleID);
                } else {
                  toggleGroup(role.roleID);
                }
              }}
            >
              {role.roleName}
            </span>
          </div>
        ) : (
          <div
            style={{ paddingLeft: paddingLeft + 14 }}
            className={cn(
              'py-1.5 px-2 text-sm cursor-pointer hover:bg-accent rounded-sm',
              value === role.roleID && 'bg-accent text-accent-foreground font-medium',
              !role.isEnabled ? 'opacity-50 cursor-not-allowed' : ''
            )}
            onClick={() => role.isEnabled && handleSelect(role.roleID)}
          >
            {role.roleName}
          </div>
        )}

        {isExpanded && role.children.map((child) => renderRoleGroup(child, level + 1))}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          htmlFor={`input-${label.replace(/\s+/g, '-').toLowerCase()}`}
          className={cn('pl-0.5 text-sm font-medium', error && 'text-red-500')}
        >
          {label}
        </label>
      )}

      <Popover
        open={disabled ? false : open}
        onOpenChange={(val) => {
          if (!disabled) setOpen(val);
        }}
      >
        <PopoverTrigger asChild className={cn(disabled && ' bg-accent')}>
          <button
            ref={inputRef}
            className={cn(
              'flex items-center px-3 py-0 gap-2 rounded-xl border shadow-sm relative w-full dark:bg-input/30',
              'transition-all duration-200 ease-in-out',
              'focus-within:ring-2 focus-within:ring-primary/30 focus-within:border-primary',
              error ? 'border-red-500 bg-destructive/10 text-red-500' : 'border-input'
            )}
            aria-label="Select"
          >
            <Input
              type="text"
              readOnly
              disabled={disabled}
              value={selectedRoleName}
              className={cn(
                'w-full dark:bg-input/0  p-0 m-0 border-none shadow-none text-sm cursor-pointer',
                'focus-visible:ring-0 focus-visible:ring-offset-0'
              )}
              placeholder={placeholder}
              id={`input-${value?.replace(/\s+/g, '-').toLowerCase()}`}
            />

            <ChevronDown
              size={16}
              className={cn('text-muted-foreground transition-transform duration-200', open && 'transform rotate-180')}
            />
          </button>
        </PopoverTrigger>

        <PopoverContent align="start" side="bottom" className="p-1.5" style={{ width: popoverWidth }}>
          {options?.map((item) => renderRoleGroup(item))}

          {options?.length === 0 && (
            <div className="text-center py-1 text-sm text-muted-foreground">
              <span className="text-sm text-muted-foreground">Sonuç Bulunamadı</span>
            </div>
          )}
        </PopoverContent>
      </Popover>

      {error && <p className="text-xs text-red-500 pl-1 pt-1">{error}</p>}
    </div>
  );
}
