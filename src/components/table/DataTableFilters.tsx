import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import CustomSearchInput from '../inputs/CustomSearchInput';
import { CustomSelectBox } from '../inputs/CustomSelectBox';
import CustomUiTextInput from '../inputs/CustomUiTextInput';
import { CustomRangeDateTimePicker } from '../inputs/CustonRangeDateTimePicker';
import { CustomUiSingleDateTimePicker } from '../inputs/CustomUiSingleDateTimePicker';
import { DataTableToolbarFilterItem, DataTableToolbarFilterType } from './DataTable';
import { CustonRangeDatePicker } from '../inputs/CustonRangeDatePicker';
import { DateRange } from 'react-day-picker';
import { CustomGroupedSelectBox } from '../inputs/CustomGroupedSelectBox';
import CustomMonthRangeDatePicker from '../inputs/CustomMonthRangeDatePicker';
import { formatDatePathname } from '@/utils/formatTime';
import { format } from 'date-fns';
import CustomGroupedTreeMultiCheckbox from '../inputs/CustomGroupedTreeMultiCheckbox';
import CustomMultiSelectBox from '../inputs/CustomMultiSelectBox';

export const DataTableFilters = ({ filterColumns }: { filterColumns?: DataTableToolbarFilterItem[] }) => {
  const baseSearchParams = useSearchParams() || new URLSearchParams();
  const searchParams = Object.fromEntries(baseSearchParams.entries());
  const router = useRouter();
  const pathname = usePathname() || '';

  if (!filterColumns) return;

  const onChangeHandler = (value: string, queryName: string) => {
    const newSearchParams = new URLSearchParams(baseSearchParams.toString());
    if (value) {
      newSearchParams.set(queryName, value);
    } else {
      newSearchParams.delete(queryName);
    }
    if (newSearchParams.toString() && baseSearchParams.get('page')) {
      newSearchParams.set('page', '1');
    } else {
      newSearchParams.delete('page');
    }
    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  const onMultiCheckboxChangeHandler = (values: string[], queryName: string) => {
    const newSearchParams = new URLSearchParams(baseSearchParams.toString());

    if (values.length > 0) {
      newSearchParams.set(queryName, values.join('.'));
    } else {
      newSearchParams.delete(queryName);
    }
    if (newSearchParams.toString() && baseSearchParams.get('page')) {
      newSearchParams.set('page', '1');
    } else {
      newSearchParams.delete('page');
    }
    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  const handleDateRangeChange = (range: DateRange | undefined) => {
    const startDate = range?.from ? formatDatePathname(range.from) : undefined;
    const endDate = range?.to ? formatDatePathname(range.to) : undefined;

    const newSearchParams = new URLSearchParams(baseSearchParams.toString());
    if (startDate) {
      newSearchParams.set('startDate', startDate);
    } else {
      newSearchParams.delete('startDate');
    }

    if (endDate) {
      newSearchParams.set('endDate', endDate);
    } else {
      newSearchParams.delete('endDate');
    }
    if (newSearchParams.toString() && baseSearchParams.get('page')) {
      newSearchParams.set('page', '1');
    } else {
      newSearchParams.delete('page');
    }
    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  const handleDateRangeTimeChange = (range: DateRange | undefined) => {
    const newSearchParams = new URLSearchParams(baseSearchParams.toString());

    if (range?.from) {
      const from = format(range.from, "yyyy-MM-dd'T'HH:mm");
      newSearchParams.set('startDate', encodeURIComponent(from));
    } else {
      newSearchParams.delete('startDate');
    }

    if (range?.to) {
      const to = format(range.to, "yyyy-MM-dd'T'HH:mm");
      newSearchParams.set('endDate', encodeURIComponent(to));
    } else {
      newSearchParams.delete('endDate');
    }

    if (newSearchParams.toString() && baseSearchParams.get('page')) {
      newSearchParams.set('page', '1');
    } else {
      newSearchParams.delete('page');
    }
    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  const handleMonthRangeChange = (range: DateRange | undefined) => {
    const newSearchParams = new URLSearchParams(baseSearchParams.toString());

    if (range?.from) {
      const from = formatDatePathname(range.from);
      newSearchParams.set('startDate', from);
    } else {
      newSearchParams.delete('startDate');
    }

    if (range?.to) {
      const to = formatDatePathname(range.to);
      newSearchParams.set('endDate', to);
    } else {
      newSearchParams.delete('endDate');
    }

    if (newSearchParams.toString() && baseSearchParams.get('page')) {
      newSearchParams.set('page', '1');
    } else {
      newSearchParams.delete('page');
    }
    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  return (
    <div className="flex gap-2 flex-wrap">
      {filterColumns?.map((item, index) => {
        if (item.type == DataTableToolbarFilterType.GroupedTreeMultiCheckbox) {
          const selectedValues = searchParams?.[item?.queryName]?.split('.') ?? [];
          return (
            <CustomGroupedTreeMultiCheckbox
              key={index}
              value={selectedValues}
              onValueChange={(value) => onMultiCheckboxChangeHandler(value, item.queryName)}
              data={item.options}
              placeholder={item.label}
            />
          );
        }

        if (item.type == DataTableToolbarFilterType.GroupedSelectBox) {
          return (
            <CustomGroupedSelectBox
              key={index}
              value={searchParams?.[item?.queryName] ?? ''}
              onChange={(value) => onChangeHandler(value, item.queryName)}
              placeholder={item?.label}
              options={item?.options}
            />
          );
        }

        if (item.type == DataTableToolbarFilterType.SearchInput) {
          return (
            <CustomSearchInput
              key={index}
              value={searchParams?.[item?.queryName] ?? ''}
              onChange={(value) => onChangeHandler(value, item.queryName)}
              placeholder={item.label}
            />
          );
        }

        if (item.type == DataTableToolbarFilterType.SelectBox) {
          return (
            <CustomSelectBox
              key={index}
              value={searchParams?.[item?.queryName] ?? ''}
              onValueChange={(value) => onChangeHandler(value, item.queryName)}
              data={item.options!}
              placeholder={item?.label}
            />
          );
        }

        if (item.type == DataTableToolbarFilterType.MultiSelectBox) {
          const selectedValues = searchParams?.[item?.queryName]?.split('.') ?? [];
          return (
            <CustomMultiSelectBox
              key={index}
              value={selectedValues}
              onChange={(value) => onChangeHandler(value.join('.'), item.queryName)}
              option={item.options!}
              placeholder={item?.label}
              maxVisibleCount={1}
            />
          );
        }

        if (item.type == DataTableToolbarFilterType.TextInput) {
          return (
            <CustomUiTextInput
              key={index}
              value={searchParams?.[item?.queryName] ?? ''}
              onChange={(value) => onChangeHandler(value, item.queryName)}
              placeholder={item.label}
              label={item.label}
            />
          );
        }

        if (item.type == DataTableToolbarFilterType.RangeDateTimePicker) {
          return (
            <CustomRangeDateTimePicker
              key={index}
              title={item.label}
              value={{
                from: searchParams?.startDate ? new Date(decodeURIComponent(searchParams.startDate)) : undefined,
                to: searchParams?.endDate ? new Date(decodeURIComponent(searchParams.endDate)) : undefined
              }}
              onChange={handleDateRangeTimeChange}
            />
          );
        }

        if (item.type == DataTableToolbarFilterType.SingleDateTimePicker) {
          return <CustomUiSingleDateTimePicker key={index} value={new Date()} onChange={() => {}} placeholder={item.label} />;
        }

        if (item.type == DataTableToolbarFilterType.RangeDatePicker) {
          return (
            <CustonRangeDatePicker
              key={index}
              title={item.label}
              value={{
                from: searchParams?.startDate ? new Date(searchParams.startDate) : undefined,
                to: searchParams?.endDate ? new Date(searchParams.endDate) : undefined
              }}
              onChange={handleDateRangeChange}
            />
          );
        }

        if (item.type == DataTableToolbarFilterType.MonthDatePicker) {
          return (
            <CustomMonthRangeDatePicker
              key={index}
              title={item.label}
              value={{
                from: searchParams?.startDate ? new Date(searchParams.startDate) : undefined,
                to: searchParams?.endDate ? new Date(searchParams.endDate) : undefined
              }}
              onChange={handleMonthRangeChange}
            />
          );
        }
      })}
    </div>
  );
};
