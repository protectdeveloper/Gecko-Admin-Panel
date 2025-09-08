'use client';
import { ArrowDown, ChevronDown, ChevronRight } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Input } from '../ui/input';
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

interface CustomUiGroupedSelectBoxProps {
  value: string;
  onChange: (val: string) => void;
  options: CustomGroupedSelectBoxOption[];
  label: string;
  error?: string;
  disabled?: boolean;
  placeholder?: string;
}

export function CustomUiGroupedSelectBox({
  value,
  onChange,
  options,
  error,
  disabled,
  placeholder,
  label
}: CustomUiGroupedSelectBoxProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const shouldFloat = isFocused || value?.length > 0;
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleGroup = (roleID: string) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(roleID)) {
        next.delete(roleID);
      } else {
        next.add(roleID);
      }
      return next;
    });
  };

  const handleInputClick = () => {
    if (!disabled) {
      setIsOpen(true);
    }
  };

  const handleSelect = (roleID: string) => {
    // Reselecting the same item clears the selection
    if (roleID === value) {
      onChange('');
    } else {
      onChange(roleID);
    }
    setIsOpen(false);
  };

  const findRoleName = (roleID: string, roles: CustomGroupedSelectBoxOption[]): string => {
    for (const role of roles) {
      if (role.roleID === roleID) {
        return role.roleName;
      }
      if (role?.children?.length > 0) {
        const found = findRoleName(roleID, role?.children);
        if (found) return found;
      }
    }
    return '';
  };

  const selectedRoleName = findRoleName(value, options);

  const renderRoleGroup = (role: CustomGroupedSelectBoxOption, level: number = 0) => {
    const isExpanded = expandedGroups?.has(role.roleID);
    const hasChildren = role?.children?.length > 0;
    const paddingLeft = level > 0 ? 10 + level * 15 : 5;

    return (
      <div key={role.roleID}>
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
                if (role.isEnabled) {
                  toggleGroup(role.roleID);
                } else {
                  toggleGroup(role.roleID);
                }
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
              {role?.roleName}
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
            onClick={() => role.isEnabled && handleSelect(role?.roleID)}
          >
            {role?.roleName}
          </div>
        )}

        {isExpanded && role?.children?.map((child) => renderRoleGroup(child, level + 1))}
      </div>
    );
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div
        className={cn(
          'flex items-center px-3 py-2 rounded-xl border shadow-sm',
          'transition-all duration-200 ease-in-out',
          'focus-within:ring-2 focus-within:ring-primary/30 focus-within:border-primary',
          error ? 'border-red-500 bg-destructive/10' : 'bg-muted dark:bg-input/30',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      >
        <Input
          type={'text'}
          value={selectedRoleName}
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
          <div className="max-h-60 overflow-auto p-1">
            {options?.map((item) => renderRoleGroup(item))}

            {options?.length === 0 && (
              <div className="text-center py-1 text-sm text-muted-foreground">
                <span className="text-sm text-muted-foreground">Sonuç Bulunamadı</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
