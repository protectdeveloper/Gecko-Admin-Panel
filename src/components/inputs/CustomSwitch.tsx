import React from 'react';
import { cn } from '@/lib/utils';

interface CustomSwitchProps {
  value: boolean;
  onChange: (value: boolean) => void;
  trueIcon?: React.ReactNode;
  falseIcon?: React.ReactNode;
  className?: string;
  switchClassName?: string;
}

const CustomSwitch: React.FC<CustomSwitchProps> = ({ value, onChange, trueIcon, falseIcon, className, switchClassName }) => {
  return (
    <button
      onClick={() => onChange(!value)}
      className={cn(
        'relative inline-flex h-[32px] w-[65px] items-center rounded-full transition-colors',
        value ? 'bg-primary dark:bg-primary/35' : 'bg-input',
        className
      )}
      aria-label="Toggle switch"
    >
      <div
        className={cn(
          'absolute left-0 w-6.5 h-6.5 flex translate-x-[3px] items-center justify-center rounded-full bg-background shadow-md ring-0 transition-transform duration-200 ease-in-out',
          value && 'translate-x-9',
          switchClassName
        )}
      >
        {value ? trueIcon : falseIcon}
      </div>
    </button>
  );
};

export default CustomSwitch;
