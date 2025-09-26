import { type Table as ReactTable } from '@tanstack/react-table';
import Link from 'next/link';
import { Button } from '../ui/button';
import { FunnelX, PlusCircleIcon, SlidersHorizontalIcon, TrashIcon, DownloadIcon } from 'lucide-react';
import { AlertButton } from '../ui/alert-button';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { DataTableMeta } from './DataTable';
import { toast } from 'sonner';
import { useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { saveAs } from 'file-saver';

export type DataTableToolbarFilterItem = {
  id: string;
  title: string;
};

type ColumnDefWithExport<T> = {
  exportValue?: (row: any, tableRow?: any) => any;
} & any;

export default function DataTableToolbar({
  table,
  handleExcelExportButton,
  renderBulkActions
}: {
  table: ReactTable<any>;
  handleExcelExportButton?: (rows: any[]) => void;
  renderBulkActions?: (selectedRows: any[]) => React.ReactNode;
}) {
  const { title, renderCreateButton, clearFiltersPress, isExcelButtonVisible = true } = table.options?.meta as DataTableMeta;
  const selectedRows = table.getFilteredSelectedRowModel().rows.map((row) => row.original);

  return (
    <div className="flex flex-wrap items-center gap-2 pt-4">
      {title && <span className=" text-lg font-bold">{title}</span>}

      <div className="flex-1" />

      {renderBulkActions && selectedRows.length > 0 && renderBulkActions(selectedRows)}

      {renderCreateButton ? (
        renderCreateButton({
          children: <ToolbarCreate table={table} disableLink={true} />
        })
      ) : (
        <ToolbarCreate table={table} />
      )}

      <ToolbarDeleteButton table={table} />
      <ToolbarView table={table} clearFiltersPress={clearFiltersPress} />
      {isExcelButtonVisible && <ToolbarExportExcelButton table={table} handleExcelExportButton={handleExcelExportButton} />}
    </div>
  );
}

function ToolbarCreate({ table, disableLink }: { table: ReactTable<any>; disableLink?: boolean }) {
  const { createHref, renderCreateButton } = table.options?.meta as DataTableMeta;

  if (table.getSelectedRowModel().rows?.length > 0) return null;
  if (!createHref && !renderCreateButton) return null;

  if (disableLink) {
    return (
      <Button size="sm" className="h-8 bg-green-500 hover:bg-green-500">
        <PlusCircleIcon size={15} />
        <span className=" hidden md:flex">Oluştur</span>
      </Button>
    );
  }

  return (
    <Link href={createHref!}>
      <Button size="sm" className="h-8 bg-green-500 hover:bg-green-500">
        <PlusCircleIcon size={15} />
        <span className=" hidden md:flex">Oluştur</span>
      </Button>
    </Link>
  );
}

function ToolbarDeleteButton({ table }: { table: ReactTable<any> }) {
  const { onDeleteRow } = table.options?.meta as DataTableMeta;

  if (!onDeleteRow) return null;
  if (!(table.getSelectedRowModel().rows?.length > 0)) return null;

  return (
    <AlertButton
      size="sm"
      variant="destructive"
      onClick={async (event) => {
        const selectedRows = table.getFilteredSelectedRowModel().rows?.map((row) => row.original);

        if (onDeleteRow) {
          await Promise.all(
            selectedRows.map(async (row) => {
              await onDeleteRow(row);
            })
          );
        }

        table.toggleAllPageRowsSelected(false);
      }}
    >
      <TrashIcon size={15} className="text-destructive-foreground" />
      <div className="flex flex-row gap-1">
        <span className="hidden md:flex">Sil</span>
        <span>({table.getFilteredSelectedRowModel().rows?.length})</span>
      </div>
    </AlertButton>
  );
}

function ToolbarView({ table, clearFiltersPress }: { table: ReactTable<any>; clearFiltersPress?: () => void }) {
  return (
    <div className="flex items-center gap-2">
      {clearFiltersPress && (
        <Button onClick={clearFiltersPress} variant="default" size="sm" className="bg-primary/40 hover:bg-primary/50">
          <FunnelX size={15} className="text-secondary-foreground" />
          <span className="text-secondary-foreground hidden md:flex">Filtreleri Temizle</span>
        </Button>
      )}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button aria-label="Toggle columns" variant="outline" size="sm">
            <SlidersHorizontalIcon size={15} className="text-secondary-foreground" />
            <span className="text-secondary-foreground hidden md:flex">Görünüm</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          {table
            .getAllColumns()
            .filter((column) => typeof column.accessorFn !== 'undefined' && column.getCanHide())
            .map((column: any) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value: any) => column.toggleVisibility(!!value)}
                  onSelect={(e) => e.preventDefault()}
                >
                  <span className="truncate">{column.columnDef?.label}</span>
                </DropdownMenuCheckboxItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function ToolbarExportExcelButton({
  table,
  handleExcelExportButton
}: {
  table: ReactTable<any>;
  handleExcelExportButton?: (rows: any[]) => void;
}) {
  const { title } = table.options?.meta as DataTableMeta;
  const searchParams = useSearchParams() || new URLSearchParams();

  const handleExport = async () => {
    const ExcelJS = await import('exceljs');

    try {
      const rows = table.getRowModel().rows;
      if (!rows.length) {
        toast.error('Sonuç bulunamadı');
        return;
      }

      const visibleColumns = table.getVisibleLeafColumns();
      const header = visibleColumns.map((col) => (col.columnDef as any).label || col.columnDef.header || col.id);

      const data = rows.map((row) =>
        visibleColumns.map((col) => {
          const colDef = col.columnDef as ColumnDefWithExport<any>;
          if (typeof colDef.exportValue === 'function') {
            return colDef.exportValue(row.original, row);
          }
          const value = row.getValue(col.id);
          return typeof value === 'object' && value !== null ? JSON.stringify(value) : value;
        })
      );

      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Tablo');

      // Header row
      worksheet.addRow(header);

      // Data rows
      data.forEach((row) => {
        worksheet.addRow(row);
      });

      // Sütun genişliklerini otomatik ayarla
      worksheet.columns.forEach((column) => {
        let maxLength = 10;
        column.eachCell?.({ includeEmpty: true }, (cell) => {
          const len = String(cell.value || '').length;
          if (len > maxLength) maxLength = len;
        });
        column.width = maxLength + 2;
      });

      // Dosya adı oluştur
      let fileName = title ? `${title}` : 'Tablo_Cikti';
      fileName = fileName.replace(/[^a-zA-Z0-9-_ğüşöçıİĞÜŞÖÇ ]/g, '').trim() || 'Tablo_Cikti';

      const startDate = searchParams.get('startDate');
      const endDate = searchParams.get('endDate');
      const datePart = startDate && endDate ? `_${startDate}_${endDate}` : `_${new Date().toISOString().split('T')[0]}`;

      fileName += datePart;

      // Blob olarak oluştur
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });

      saveAs(blob, `${fileName}.xlsx`);
      toast.success('Excel başarıyla oluşturuldu');
    } catch (error) {
      toast.error('Excel oluşturulurken bir hata oluştu');
    }
  };

  const handleClick = () => {
    if (handleExcelExportButton) {
      // Özel export handler varsa onu kullan (tüm veriyi çekmek için)
      handleExcelExportButton([]);
    } else {
      // Mevcut tablo verilerini export et
      handleExport();
    }
  };

  return (
    <Button size="sm" variant="outline" onClick={handleClick}>
      <DownloadIcon size={15} />
      <span className="hidden md:flex">Excel</span>
    </Button>
  );
}
