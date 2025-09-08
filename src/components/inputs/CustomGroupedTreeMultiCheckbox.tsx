'use client';

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

type Option = {
  roleID: string;
  roleName: string;
  roleTypeID: string;
  parentRoleID: string | null;
  isActive: boolean;
  isDefault: boolean;
  identifierCode: string;
  description: string;
  isEnabled: boolean;
  children: Option[];
};

export type CustomGroupedTreeMultiCheckboxData = {
  groupLabel: string;
  groupValue: string;
  options: Option[];
};

interface Props {
  title?: string;
  value: string[];
  onValueChange: (value: string[]) => void;
  placeholder?: string;
  data: CustomGroupedTreeMultiCheckboxData[];
  className?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  width?: number;
  error?: string;
}

export default function CustomGroupedTreeMultiCheckbox({
  placeholder = 'Select...',
  title,
  value,
  onValueChange,
  data,
  disabled = false,
  error = '',
  icon,
  width
}: Props) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set(value));
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const toggleItem = (val: string, options: Option[]) => {
    const next = new Set(selected);
    const isSelected = next.has(val);

    if (isSelected) {
      next.delete(val);
    } else {
      next.add(val);
    }

    const currentOption = options.find((opt) => opt.roleID === val);
    if (currentOption) {
      if (currentOption.children && currentOption.children.length > 0) {
        const toggleChildren = (children: Option[]) => {
          children.forEach((child) => {
            if (isSelected) {
              next.delete(child.roleID);
            } else {
              next.add(child.roleID);
            }
            if (child.children && child.children.length > 0) {
              toggleChildren(child.children);
            }
          });
        };
        toggleChildren(currentOption.children);
      }
    }

    setSelected(next);
    onValueChange(Array.from(next));
  };

  const toggleExpand = (value: string) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(value)) {
        next.delete(value);
      } else {
        next.add(value);
      }
      return next;
    });
  };

  const isGroupChecked = (options: Option[]) => options?.length > 0 && options.every((opt) => selected.has(opt.roleID));

  const isGroupIndeterminate = (options: Option[]) => {
    const selectedCount = options.filter((opt) => selected.has(opt.roleID)).length;
    return selectedCount > 0 && selectedCount < options.length;
  };

  const renderOptions = (options: Option[], level: number = 0) => {
    return options.map((opt) => (
      <div key={opt.roleID} className={cn('flex flex-col gap-1.5', level === 0 && 'mt-2')}>
        <div className={cn('flex items-center space-x-2', level > 0 && 'pl-3', !opt.isEnabled && 'cursor-not-allowed')}>
          {opt.children && opt.children.length > 0 ? (
            <div className="flex items-center space-x-2">
              <div className="cursor-pointer" onClick={() => toggleExpand(opt.roleID)}>
                {expandedGroups.has(opt.roleID) ? (
                  <ChevronDown size={16} className="text-muted-foreground" />
                ) : (
                  <ChevronRight size={16} className="text-muted-foreground" />
                )}
              </div>
              <Checkbox
                checked={isGroupChecked(opt.children) || (isGroupIndeterminate(opt.children) && 'indeterminate')}
                onCheckedChange={() => opt.isEnabled && toggleItem(opt.roleID, options)}
                disabled={!opt.isEnabled}
                aria-label="Select all"
                id={opt.roleID}
              />
              <label
                htmlFor={opt.roleID}
                className={cn('text-sm font-semibold text-muted-foreground', !opt.isEnabled && 'cursor-not-allowed opacity-50 ')}
              >
                {opt.roleName}
              </label>
            </div>
          ) : (
            <>
              <div className="w-4" />
              <Checkbox
                id={opt.roleID}
                checked={selected.has(opt.roleID)}
                onCheckedChange={() => opt.isEnabled && toggleItem(opt.roleID, options)}
                disabled={!opt.isEnabled}
              />
              <label htmlFor={opt.roleID} className={cn('text-sm text-muted-foreground', !opt.isEnabled && 'cursor-not-allowed')}>
                {opt.roleName}
              </label>
            </>
          )}
        </div>
        {opt.children && expandedGroups.has(opt.roleID) && (
          <div className="flex flex-col gap-1.5 pl-3">{renderOptions(opt.children, level + 1)}</div>
        )}
      </div>
    ));
  };

  useEffect(() => {
    setSelected(new Set(value));
  }, [value]);

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

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            ref={triggerRef}
            variant="outline"
            disabled={disabled}
            className={cn('border shadow-sm justify-between rounded-xl', width && `w-[${width}px]`, error && 'bg-destructive/10')}
          >
            <span className={cn('font-medium', { 'text-muted-foreground': selected?.size === 0, '': selected?.size > 0 })}>
              {selected?.size > 0 ? selected?.size + ` Seçim Yapıldı` : placeholder}
            </span>
            {icon ?? <ChevronDown size={20} className="text-muted-foreground" />}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="start"
          className={cn('max-h-64 overflow-auto px-3 pb-3', width ? `w-[${width}px]` : 'min-w-[160px]')}
        >
          {data?.map((group, index) => (
            <div key={index}>
              <span className="text-sm font-semibold text-muted-foreground">{group?.groupLabel}</span>

              <div className="mt-1">{renderOptions(group?.options)}</div>
            </div>
          ))}

          {data?.length === 0 && (
            <div className="text-center py-1 text-sm text-muted-foreground">
              <span className="text-sm text-muted-foreground">Sonuç Bulunamadı</span>
            </div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
