'use client';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  OnChangeFn,
  PaginationState,
  SortingState,
  useReactTable,
  VisibilityState,
  type Table as ReactTable
} from '@tanstack/react-table';
import ColumnHeader from './DataTableColumnHeader';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { DataTableSkeleton } from './DataTableSkeleton';
import DataTableToolbar from './DataTableToolbar';
import ErrorView from '../ui/error-view';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from 'lucide-react';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { DataTableFilters } from './DataTableFilters';
import { CustomGroupedSelectBoxOption } from '../inputs/CustomGroupedSelectBox';
import { CustomGroupedTreeMultiCheckboxData } from '../inputs/CustomGroupedTreeMultiCheckbox';
import { DataTableName } from './DataTable.enum';
import { useTableStore } from '@/store/useTableStore';
import { CustomMultiSelectBoxOption } from '../inputs/CustomMultiSelectBox';
import { Skeleton } from '../ui/skeleton';
import DataTableHeaderSkeleton from './DataTableHeaderSkeleton';

export type DataTableMeta = {
  pageSizeOptions?: number[];
  createHref?: string;
  isLoading?: boolean;
  isError?: boolean;
  filterColumns?: DataTableToolbarFilterItem[];
  totalCount?: number;
  onDeleteRow?: (row: any) => Promise<void>;
  onEditRow?: (row: any) => Promise<void>;
  renderExtraRightContent?: () => React.ReactNode;
  onRowClick?: (row: any) => void;
  className?: string;
  renderCreateButton?: ({ children }: { children: React.ReactNode }) => React.ReactNode;
  title?: string;
  clearFiltersPress?: () => void;
  isExcelButtonVisible?: boolean;
  expandedRowColumns?: ColumnDef<any>[];
  expandedRowData?: (row: any) => any[];
};

export enum DataTableToolbarFilterType {
  TextInput,
  SearchInput,
  SelectBox,
  GroupedMultiCheckbox,
  GroupedTreeMultiCheckbox,
  GroupedSelectBox,
  SingleDateTimePicker,
  RangeDateTimePicker,
  RangeDatePicker,
  MonthDatePicker,
  MultiSelectBox
}

export type DataTableToolbarFilterItem = {
  queryName: string;
  label: string;
} & (
  | {
      type: DataTableToolbarFilterType.TextInput;
    }
  | {
      type: DataTableToolbarFilterType.SearchInput;
    }
  | {
      type: DataTableToolbarFilterType.SelectBox;
      options: {
        label: string;
        value: string;
      }[];
    }
  | {
      type: DataTableToolbarFilterType.GroupedTreeMultiCheckbox;
      options: CustomGroupedTreeMultiCheckboxData[];
    }
  | {
      type: DataTableToolbarFilterType.GroupedSelectBox;
      options: CustomGroupedSelectBoxOption[];
      placeholder?: string;
    }
  | {
      type: DataTableToolbarFilterType.SingleDateTimePicker;
    }
  | {
      type: DataTableToolbarFilterType.RangeDateTimePicker;
    }
  | {
      type: DataTableToolbarFilterType.RangeDatePicker;
    }
  | {
      type: DataTableToolbarFilterType.MonthDatePicker;
    }
  | {
      type: DataTableToolbarFilterType.MultiSelectBox;
      options: CustomMultiSelectBoxOption[];
    }
);

export type DataTableProps = {
  columns: ColumnDef<any>[];
  data: any[] | undefined;
  pageCount?: number;
  error?: any;
  onRowSelectionChange?: (rowSelection: any[]) => void;
  handleExcelExportButton?: (rows: any[]) => void;
  tableName: DataTableName;
  renderBulkActions?: (selectedRows: any[]) => React.ReactNode;
} & DataTableMeta;

export enum BasePaginationQueryParams {
  PageIndex = 'page',
  PageSize = 'pageSize',
  SortColumn = 'sortColumn',
  SortDesc = 'sortDesc'
}

export enum BasePaginationDefaultValues {
  PageIndex = 1,
  PageSize = 20,
  SortColumn = 'CreatedDate',
  SortDesc = 'true'
}

export const DataTable = (props: DataTableProps) => {
  const tableName = props?.tableName;
  const { columnVisibility: tableColumnVisibility, setColumnVisibility: tableSetColumnVisibility } = useTableStore(
    (state) => state
  );
  const tableStoreColumnVisibility = tableColumnVisibility?.[tableName] || {};

  const router = useRouter();
  const pathname = usePathname() || '';

  const baseSearchParams = useSearchParams() || new URLSearchParams();
  const searchParams = Object.fromEntries(baseSearchParams.entries());

  //!Pagination States - Start
  const pageIndex = React.useMemo(() => {
    return searchParams?.[BasePaginationQueryParams.PageIndex]
      ? Number(searchParams?.[BasePaginationQueryParams.PageIndex]) - 1
      : BasePaginationDefaultValues.PageIndex - 1;
  }, [searchParams?.[BasePaginationQueryParams.PageIndex]]);

  const pageSize = React.useMemo(() => {
    return searchParams?.[BasePaginationQueryParams.PageSize]
      ? Number(searchParams?.[BasePaginationQueryParams.PageSize])
      : BasePaginationDefaultValues.PageSize;
  }, [searchParams?.[BasePaginationQueryParams.PageSize]]);

  const pagination: PaginationState = React.useMemo(
    () => ({
      pageIndex,
      pageSize
    }),
    [pageIndex, pageSize]
  );

  const onPaginationChange: OnChangeFn<PaginationState> = (updaterOrValue) => {
    if (!props?.pageCount) {
      return;
    }

    const updatedState =
      typeof updaterOrValue === 'function'
        ? (updaterOrValue as (prevState: PaginationState) => PaginationState)(pagination)
        : updaterOrValue;

    // setPaginationState(updatedState); // Removed as per edit hint

    const newSearchParams = new URLSearchParams();
    baseSearchParams.forEach((value, key) => {
      newSearchParams.set(key, value);
    });

    newSearchParams.set('page', String(updatedState.pageIndex + 1));
    newSearchParams.set('pageSize', String(updatedState.pageSize));

    router.replace(`${pathname}?${newSearchParams.toString()}`);
  };

  //!Pagination States - End

  //*Sorting States - start
  const sortColumn = searchParams?.[BasePaginationQueryParams.SortColumn] as string;
  const sortDesc = searchParams?.[BasePaginationQueryParams.SortDesc];
  const [sorting, setSortingState] = React.useState<SortingState>(
    sortColumn
      ? [
          {
            id: sortColumn,
            desc: sortDesc === 'true' ? true : false
          }
        ]
      : []
  );

  const onSortingChange: OnChangeFn<SortingState> = (updaterOrValue) => {
    const updatedState =
      typeof updaterOrValue === 'function'
        ? (updaterOrValue as (prevState: SortingState) => SortingState)(sorting)
        : updaterOrValue;

    setSortingState(updatedState);

    if (updatedState.length > 0) {
      const newSearchParams = new URLSearchParams();
      baseSearchParams.forEach((value, key) => {
        newSearchParams.set(key, value);
      });

      newSearchParams.set('sortColumn', updatedState[0].id);
      newSearchParams.set('sortDesc', String(updatedState[0].desc));

      router.replace(`${pathname}?${newSearchParams.toString()}`);
    }
  };
  //*Sorting States - end

  //!Row Selection, Column Visibility - start
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>(tableStoreColumnVisibility);
  //!Row Selection, Column Visibility - end

  // Doğru pageCount hesaplaması - totalCount'tan sayfa sayısını hesapla
  const calculatedPageCount = React.useMemo(() => {
    if (props?.totalCount && pagination.pageSize > 0) {
      return Math.max(1, Math.ceil(props.totalCount / pagination.pageSize));
    }
    return 1;
  }, [props?.totalCount, pagination.pageSize]);

  const onColumnVisibilityChange: OnChangeFn<VisibilityState> = (updaterOrValue) => {
    const updatedState =
      typeof updaterOrValue === 'function'
        ? (updaterOrValue as (prevState: VisibilityState) => VisibilityState)(columnVisibility)
        : updaterOrValue;

    setColumnVisibility(updatedState);
    tableSetColumnVisibility(tableName, updatedState);
  };

  const tableInstance = useReactTable({
    data: props?.data ?? [],
    columns: props?.columns ?? [],
    state: {
      sorting,
      pagination,
      columnVisibility,
      rowSelection
    },
    meta: {
      pageSizeOptions: [10, 20, 30, 40, 50],
      ...props
    },
    enableRowSelection: true,
    ...(props?.pageCount || props?.totalCount
      ? {
          pageCount: calculatedPageCount,
          manualPagination: true,
          manualSorting: true,
          manualFiltering: true
        }
      : {}),

    onRowSelectionChange: (updater) => {
      setRowSelection(updater);
      if (props?.onRowSelectionChange) {
        const newSelection = typeof updater === 'function' ? updater(rowSelection) : updater;
        const selectedRows = tableInstance
          .getRowModel()
          .rows.filter((row) => newSelection[row.id])
          .map((row) => row.original);
        props.onRowSelectionChange(selectedRows);
      }
    },
    onColumnVisibilityChange,
    onSortingChange,
    onPaginationChange,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getRowId: (row: any) => row?.id
  });

  if (props?.isError) {
    return (
      <div className="w-full p-5 gap-3 grid bg-background shadow-sm rounded-xl border border-border">
        <DataTableFilters filterColumns={props?.filterColumns} />
        <ErrorView error={props?.error} />
      </div>
    );
  }

  if (props?.isLoading) {
    return (
      <div className="w-full p-5 gap-3 grid bg-background shadow-sm rounded-xl border border-border">
        <DataTableHeaderSkeleton />
        <DataTableFilters filterColumns={props?.filterColumns} />
        <DataTableSkeleton columnCount={tableInstance.getAllColumns().length} />
      </div>
    );
  }

  return (
    <div className="w-full px-5 gap-3 grid shadow-sm rounded-lg border bg-background border-border">
      <DataTableToolbar
        table={tableInstance}
        handleExcelExportButton={props.handleExcelExportButton}
        renderBulkActions={props.renderBulkActions}
      />
      <DataTableFilters filterColumns={props?.filterColumns} />
      <DataTableView table={tableInstance} />
      <Pagination table={tableInstance} />
    </div>
  );
};

function ExpandedTable({ data, columns }: { data: any[]; columns: ColumnDef<any>[] }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <Table>
      <TableHeader className="z-0 bg-transparent">
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id} className="pl-3.5">
                <ColumnHeader column={header.column} header={header} />
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map((expandedRow) => (
          <TableRow key={expandedRow.id}>
            {expandedRow.getVisibleCells().map((cell) => (
              <TableCell key={cell.id} className="px-4">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function DataTableView({ table }: { table: ReactTable<any> }) {
  const { onRowClick, expandedRowColumns, expandedRowData } = table.options?.meta as DataTableMeta;
  const [expandedRows, setExpandedRows] = React.useState<Record<string, boolean>>({});
  const [expandedRowDataMap, setExpandedRowDataMap] = React.useState<Record<string, any[]>>({});

  const toggleRow = (rowId: string, rowData: any) => {
    setExpandedRows((prev) => {
      const newState = {
        ...prev,
        [rowId]: !prev[rowId]
      };

      if (newState[rowId] && expandedRowData) {
        const data = expandedRowData(rowData);
        setExpandedRowDataMap((prev) => ({
          ...prev,
          [rowId]: data
        }));
      } else {
        setExpandedRowDataMap((prev) => {
          const newMap = { ...prev };
          delete newMap[rowId];
          return newMap;
        });
      }

      return newState;
    });
  };

  return (
    <div className="rounded-xl border grid overflow-hidden">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="pl-3.5">
                  <ColumnHeader column={header.column} header={header} />
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows?.length > 0 ? (
            table.getRowModel().rows.map((row, index) => {
              const expandedData = expandedRowDataMap[row.id];

              return (
                <React.Fragment key={row.id}>
                  <TableRow
                    data-state={row.getIsSelected() && 'selected'}
                    className={cn('whitespace-nowrap', index % 2 === 1 ? 'bg-muted' : '')}
                  >
                    {row.getVisibleCells().map((cell, index) => (
                      <TableCell
                        key={cell.id}
                        className="whitespace-nowrap px-4"
                        onClick={() => {
                          if (onRowClick) {
                            onRowClick(row.original);
                          }
                          row.toggleSelected(!row.getIsSelected());
                        }}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                    {expandedRowColumns && expandedRowData && (
                      <TableCell className="px-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleRow(row.id, row.original);
                          }}
                        >
                          {expandedRows[row.id] ? <ChevronUpIcon className="h-4 w-4" /> : <ChevronDownIcon className="h-4 w-4" />}
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                  {expandedRows[row.id] && expandedData && expandedRowColumns && (
                    <TableRow className={cn('whitespace-nowrap', index % 2 === 1 ? 'bg-muted' : '')}>
                      <TableCell colSpan={row.getVisibleCells().length + 1} className="px-4">
                        <div className="py-2">
                          <ExpandedTable data={expandedData} columns={expandedRowColumns} />
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              );
            })
          ) : (
            <TableRow>
              <TableCell
                colSpan={table.getAllColumns()?.length + (expandedRowColumns && expandedRowData ? 1 : 0)}
                className="h-24 text-center"
              >
                <div className="items-center mb-5 gap-5">
                  <span className="text-muted-foreground">Sonuç Bulunamadı</span>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

function Pagination({ table }: { table: ReactTable<any> }) {
  const { pageSizeOptions, totalCount } = table?.options?.meta as DataTableMeta;

  // Gerçek toplam satır sayısını göster (sadece mevcut sayfadaki değil)
  const actualTotalCount = totalCount || table.getFilteredRowModel().rows?.length;

  // calculatedPageCount'ı DataTable'dan prop olarak al
  const calculatedPageCount = React.useMemo(() => {
    if (totalCount && table.getState().pagination.pageSize > 0) {
      return Math.max(1, Math.ceil(totalCount / table.getState().pagination.pageSize));
    }
    return 1;
  }, [totalCount, table.getState().pagination.pageSize]);

  return (
    <div
      className={cn(
        'flex w-full flex-col-reverse items-center justify-between gap-4 overflow-auto px-2 py-3 sm:flex-row sm:gap-8'
      )}
    >
      <div className="flex-1 whitespace-nowrap text-sm text-muted-foreground">
        <span className="text-muted-foreground">
          {table.getAllColumns().some((item) => item.id === 'select')
            ? `Seçilen Satır Sayısı: ${
                table.getFilteredSelectedRowModel().rows?.length
              } / Toplam Veri Sayısı: ${actualTotalCount}`
            : `Toplam Veri Sayısı: ${actualTotalCount}`}
        </span>
      </div>

      <div className="flex flex-col-reverse items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
        <div className="flex flex-row items-center space-x-2">
          <span className="whitespace-nowrap text-sm font-medium">Satır Sayısı</span>
          <Select
            value={table.getState().pagination.pageSize?.toString()}
            onValueChange={(value) => {
              table.setPagination((state) => ({
                pageIndex: 0,
                pageSize: Number(value)
              }));
            }}
          >
            <SelectTrigger className="h-8 w-[4.5rem]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent side="top">
              {pageSizeOptions?.map((pageSize) => (
                <SelectItem key={pageSize} value={pageSize?.toString()}>
                  {pageSize?.toString()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-row items-center justify-center text-sm font-medium">
          <span>{`Sayfa ${table.getState().pagination.pageIndex + 1} / ${calculatedPageCount}`}</span>
        </div>

        <div className="flex flex-row items-center gap-2">
          <Button
            aria-label="İlk Sayfaya Git"
            variant="outline"
            size="icon"
            className="size-8 p-0"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeftIcon size={15} className="text-foreground" />
          </Button>
          <Button
            aria-label="Önceki Sayfaya Git"
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeftIcon size={15} className="text-foreground" />
          </Button>
          <Button
            aria-label="Sonraki Sayfaya Git"
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRightIcon size={15} className="text-foreground" />
          </Button>
          <Button
            aria-label="Sonraki Sayfaya Git"
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => table.setPageIndex(calculatedPageCount - 1)}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRightIcon size={15} className="text-foreground" />
          </Button>
        </div>
      </div>
    </div>
  );
}
