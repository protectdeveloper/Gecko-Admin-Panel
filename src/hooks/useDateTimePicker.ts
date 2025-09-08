import * as React from 'react';

interface UseDateTimePickerProps {
  value?: Date | null;
  onChange?: (value: Date | undefined) => void;
  minDate?: Date;
  maxDate?: Date;
}

export const useDateTimePicker = ({ value, onChange, minDate, maxDate }: UseDateTimePickerProps) => {
  const getLocalDate = (date: Date | null | undefined) => {
    if (!date) return undefined;
    const localDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
    return localDate;
  };

  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(getLocalDate(value));

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i); // 🔄 Tüm dakikalar (0-59)

  const updateTime = (unit: 'hour' | 'minute', val: number) => {
    if (!selectedDate) return;
    const updated = new Date(selectedDate);

    const localMinDate = minDate ? getLocalDate(minDate) : undefined;
    const localMaxDate = maxDate ? getLocalDate(maxDate) : undefined;

    const isSameDayAsMinDate =
      localMinDate &&
      updated.getFullYear() === localMinDate.getFullYear() &&
      updated.getMonth() === localMinDate.getMonth() &&
      updated.getDate() === localMinDate.getDate();

    const isSameDayAsMaxDate =
      localMaxDate &&
      updated.getFullYear() === localMaxDate.getFullYear() &&
      updated.getMonth() === localMaxDate.getMonth() &&
      updated.getDate() === localMaxDate.getDate();

    if (unit === 'hour') {
      if (isSameDayAsMinDate && val < localMinDate.getHours()) return;
      if (isSameDayAsMaxDate && val > localMaxDate.getHours()) return;
      updated.setHours(val);
    } else {
      if (isSameDayAsMinDate && updated.getHours() === localMinDate.getHours() && val < localMinDate.getMinutes()) return;
      if (isSameDayAsMaxDate && updated.getHours() === localMaxDate.getHours() && val > localMaxDate.getMinutes()) return;
      updated.setMinutes(val);
    }

    setSelectedDate(updated);
    const utcDate = new Date(updated.getTime() - updated.getTimezoneOffset() * 60000);
    onChange?.(utcDate);
  };

  const isTimeDisabled = (unit: 'hour' | 'minute', val: number) => {
    if (!selectedDate) return false;

    const localMinDate = minDate ? getLocalDate(minDate) : undefined;
    const localMaxDate = maxDate ? getLocalDate(maxDate) : undefined;

    const isSameDayAsMinDate =
      localMinDate &&
      selectedDate.getFullYear() === localMinDate.getFullYear() &&
      selectedDate.getMonth() === localMinDate.getMonth() &&
      selectedDate.getDate() === localMinDate.getDate();

    const isSameDayAsMaxDate =
      localMaxDate &&
      selectedDate.getFullYear() === localMaxDate.getFullYear() &&
      selectedDate.getMonth() === localMaxDate.getMonth() &&
      selectedDate.getDate() === localMaxDate.getDate();

    if (unit === 'hour') {
      if (isSameDayAsMinDate && val < localMinDate.getHours()) return true;
      if (isSameDayAsMaxDate && val > localMaxDate.getHours()) return true;
    } else {
      if (
        isSameDayAsMinDate &&
        selectedDate.getHours() === localMinDate.getHours() &&
        val <= localMinDate.getMinutes() // ⬅️ eşitlik eklendi
      )
        return true;
      if (isSameDayAsMaxDate && selectedDate.getHours() === localMaxDate.getHours() && val > localMaxDate.getMinutes())
        return true;
    }

    return false;
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      const newDate = new Date(date);
      const localMinDate = minDate ? getLocalDate(minDate) : undefined;

      if (selectedDate) {
        newDate.setHours(selectedDate.getHours());
        newDate.setMinutes(selectedDate.getMinutes());
      } else if (localMinDate) {
        if (
          newDate.getFullYear() === localMinDate.getFullYear() &&
          newDate.getMonth() === localMinDate.getMonth() &&
          newDate.getDate() === localMinDate.getDate()
        ) {
          newDate.setHours(localMinDate.getHours());

          // 🔄 5'in katı değil, sadece 1 artır
          const nextMinute = localMinDate.getMinutes() + 1;
          newDate.setMinutes(nextMinute);
        } else {
          newDate.setHours(0);
          newDate.setMinutes(0);
        }
      } else {
        newDate.setHours(0);
        newDate.setMinutes(0);
      }

      setSelectedDate(newDate);
      const utcDate = new Date(newDate.getTime() - newDate.getTimezoneOffset() * 60000);
      onChange?.(utcDate);
    }
  };

  React.useEffect(() => {
    setSelectedDate(getLocalDate(value));
  }, [value]);

  return {
    selectedDate,
    hours,
    minutes,
    updateTime,
    isTimeDisabled,
    handleDateChange
  };
};
