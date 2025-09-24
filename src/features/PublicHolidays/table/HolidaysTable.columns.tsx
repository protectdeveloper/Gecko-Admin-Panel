'use client';
import { AppAlert } from '@/components/AppAlert';
import { AppSheet } from '@/components/AppSheet';
import { DataTableToolbarFilterType, DataTableToolbarFilterItem } from '@/components/table/DataTable';
import { Button } from '@/components/ui/button';
import { formatDateWithTime } from '@/utils/formatTime';
import { ColumnDef } from '@tanstack/react-table';
import { Pencil, PlusCircle, Trash2 } from 'lucide-react';
import { useMemo } from 'react';
import { useDeletePublicHolidayByIdMutation } from '@/api/PublicHoliday/PublicHoliday.hook';
import HolidayCreateEditForm from '../form/HolidayCreateEditForm';
import { GetManagementPublicHolidayDTO } from '@/api/PublicHoliday/PublicHoliday.types';

export const usePublicHolidaysTableColumns = () => {
  const { mutateAsync: deleteHolidayById } = useDeletePublicHolidayByIdMutation();

  const renderCreateButton = useMemo(
    () => () => {
      return (
        <AppSheet.Sheet>
          <AppSheet.Trigger asChild>
            <Button variant="outline" size="sm">
              <PlusCircle size={20} />
              Tatil Oluştur
            </Button>
          </AppSheet.Trigger>
          <AppSheet.Content title={'Tatil Oluştur'}>
            <HolidayCreateEditForm />
          </AppSheet.Content>
        </AppSheet.Sheet>
      );
    },
    []
  );

  const handleDeleteHolidayPress = async (holidayId: string) => {
    const response = await deleteHolidayById(holidayId);

    if (response.success) {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    }
  };

  const columns = useMemo<ColumnDef<GetManagementPublicHolidayDTO['data'][0], any>[]>(
    () => [
      {
        accessorKey: 'holidayName',
        label: 'Tatil Adı'
      },
      {
        accessorKey: 'startTime',
        label: 'Başlangıç Tarihi',
        cell: ({ row }) => <span>{formatDateWithTime(row.original.startTime)}</span>
      },
      {
        accessorKey: 'endTime',
        label: 'Bitiş Tarihi',
        cell: ({ row }) => <span>{formatDateWithTime(row.original.endTime)}</span>
      },
      {
        accessorKey: 'transactions',
        label: 'İşlemler',
        enableSorting: false,
        enableHiding: false,
        cell: ({ row }) => (
          <div className="flex gap-2">
            <AppSheet.Sheet>
              <AppSheet.Trigger asChild>
                <Button variant="outline" size="icon">
                  <Pencil size={20} />
                </Button>
              </AppSheet.Trigger>
              <AppSheet.Content title={'Tatil Düzenle'}>
                <HolidayCreateEditForm holidayId={row?.original?.holidayID} />
              </AppSheet.Content>
            </AppSheet.Sheet>

            <AppAlert.AlertDialog>
              <AppAlert.Trigger asChild>
                <Button variant="destructive" size="icon">
                  <Trash2 size={20} className="text-white" />
                </Button>
              </AppAlert.Trigger>
              <AppAlert.Content
                title={'Tatil Sil'}
                description={` ${row?.original?.holidayName} adlı tatili silmek istediğinize emin misiniz ?`}
              >
                <AppAlert.Footer>
                  <AppAlert.Close asChild>
                    <Button variant="outline">{'İptal'}</Button>
                  </AppAlert.Close>

                  <Button
                    onClick={() => handleDeleteHolidayPress(row?.original?.holidayID)}
                    variant="destructive"
                    className="text-white"
                  >
                    {'Sil'}
                  </Button>
                </AppAlert.Footer>
              </AppAlert.Content>
            </AppAlert.AlertDialog>
          </div>
        )
      }
    ],
    []
  );

  const filterColumns: DataTableToolbarFilterItem[] = [
    {
      label: 'Tüm Sonuçlarda Ara',
      queryName: 'searchTerm',
      type: DataTableToolbarFilterType.SearchInput
    },
    {
      label: 'Başlangıç Tarihi',
      queryName: 'startDate',
      type: DataTableToolbarFilterType.SingleDateTimePicker
    },
    {
      label: 'Bitiş Tarihi',
      queryName: 'endDate',
      type: DataTableToolbarFilterType.SingleDateTimePicker
    }
  ];

  return {
    columns,
    filterColumns,
    renderCreateButton
  };
};
