import { cn } from '@/lib/utils';
import React from 'react';
import { Input } from '../ui/input';

interface PriceInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  label?: string;
  placeholder: string;
  className?: string;
}

export const formatPrice = (price: number) => {
  return price
    ?.toFixed(2)
    ?.replace('.', ',')
    ?.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

const PriceInput: React.FC<PriceInputProps> = ({ value, onChange, error, label, placeholder, className }) => {
  const [isFocused, setIsFocused] = React.useState(false);

  // Sadece rakam ve virgül girilmesine izin ver
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/[^\d,]/g, '');
    // Sadece ilk virgül kalsın, diğerlerini sil
    const firstComma = val.indexOf(',');
    if (firstComma !== -1) {
      val = val.slice(0, firstComma + 1) + val.slice(firstComma + 1).replace(/,/g, '');
      // Lira kısmı 9 hane, kuruş kısmı 2 hane ile sınırla
      let [lira, kurus] = val.split(',');
      if (lira.length > 9) lira = lira.slice(0, 9);
      if (kurus && kurus.length > 2) kurus = kurus.slice(0, 2);
      val = kurus !== undefined ? `${lira},${kurus}` : `${lira},`;
    } else {
      // Sadece rakam girildiyse 9 hane ile sınırla
      if (val.length > 9) val = val.slice(0, 9);
    }
    onChange(val);
  };

  // Formatlanmamış değeri sayıya çevir
  const getNumberValue = (val: string) => {
    if (!val) return 0;
    if (val.includes(',')) {
      const [lira, kurus] = val.split(',');
      return Number(lira || '0') + Number(('0.' + (kurus || '0')).slice(0, 4));
    }
    return Number(val);
  };

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      {label && (
        <label
          htmlFor={`input-${placeholder.replace(/\s+/g, '-').toLowerCase()}`}
          className={cn('pl-0.5 text-sm font-medium text-muted-foreground', error && 'text-red-500')}
        >
          {label}
        </label>
      )}

      <div
        className={cn(
          'w-full flex items-center px-3 py-0 rounded-xl border shadow-sm gap-0 dark:bg-input/30',
          'transition-all duration-200 ease-in-out',
          'focus-within:ring-2 focus-within:ring-primary/30 focus-within:border-primary',
          error ? 'border-red-500 bg-destructive/10 text-red-500' : 'border-input'
        )}
      >
        <Input
          type="text"
          inputMode="numeric"
          pattern="[0-9,]*"
          value={isFocused ? value : value ? formatPrice(getNumberValue(value)) : ''}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={cn(
            'w-full dark:bg-input/0 p-0 m-0 border-none shadow-none text-sm',
            'focus-visible:ring-0 focus-visible:ring-offset-0'
          )}
        />
      </div>

      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};

export default PriceInput;
