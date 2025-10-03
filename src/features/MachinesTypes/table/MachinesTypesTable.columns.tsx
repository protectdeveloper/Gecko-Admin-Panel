'use client';
import { AppAlert } from '@/components/AppAlert';
import { AppSheet } from '@/components/AppSheet';
import { DataTableToolbarFilterType, DataTableToolbarFilterItem } from '@/components/table/DataTable';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getStatusOptionsData } from '@/utils/data';
import { formatDateWithTime } from '@/utils/formatTime';
import { ColumnDef } from '@tanstack/react-table';
import { Pencil, PlusCircle, Trash2 } from 'lucide-react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDeleteMachineTypeByIdMutation } from '@/api/MachineType/MachineType.hook';
import { GetManagementMachineTypesDTO } from '@/api/MachineType/MachineType.types';
import MachinesTypesCreateEditForm from '../form/MachinesTypesCreateEditForm';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatAvatarFallback } from '@/utils/formatAvatarFallback';

export const useMachinesTypesTableColumns = () => {
  const { t } = useTranslation();
  const { mutateAsync: deleteMachineType } = useDeleteMachineTypeByIdMutation();

  const renderCreateButton = useMemo(
    () => () => {
      return (
        <AppSheet.Sheet>
          <AppSheet.Trigger asChild>
            <Button variant="outline" size="sm">
              <PlusCircle size={20} />
              Makine Tipi Oluştur
            </Button>
          </AppSheet.Trigger>
          <AppSheet.Content title={'Makine Tipi Oluştur'}>
            <MachinesTypesCreateEditForm />
          </AppSheet.Content>
        </AppSheet.Sheet>
      );
    },
    []
  );

  const handleDeleteMachineTypePress = async (machineTypeId: string) => {
    const response = await deleteMachineType(machineTypeId);
    if (response?.success) {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    }
  };

  const columns = useMemo<ColumnDef<GetManagementMachineTypesDTO['data'][0], any>[]>(
    () => [
      {
        accessorKey: 'typeName',
        label: 'Makine Tipi Adı',
        sortingFn: 'text',
        cell: ({ row }) => (
          <div className="flex items-center gap-3 cursor-pointer hover:underline">
            <Avatar className="h-10 w-10">
              <AvatarImage src={row?.original?.thumbnailImage || undefined} alt="User Avatar" />
              <AvatarFallback>
                {formatAvatarFallback(row?.original?.typeName?.split(' ')[0], row?.original?.typeName?.split(' ')[1])}
              </AvatarFallback>
            </Avatar>
            <span className="font-medium">{row?.original?.typeName}</span>
          </div>
        ),
        exportValue: (row: any) => row.typeName
      },
      {
        accessorKey: 'systemName',
        label: 'Sistem Adı',
        sortingFn: 'text'
      },
      {
        accessorKey: 'description',
        label: 'Açıklama',
        cell: ({ row }) => <span className="max-w-xs block truncate">{row.original.description || '-'}</span>
      },
      {
        accessorKey: 'isActive',
        label: 'Durum',
        cell: ({ row }) => <Badge className={'w-[85px] px-3 py-1 gap-2 -ml-1'}>{row.original.isActive ? 'Aktif' : 'Pasif'}</Badge>
      },
      {
        accessorKey: 'createdAt',
        label: 'Oluşturulma Tarihi',
        cell: ({ row }) => <span>{formatDateWithTime(row.original.createdAt)}</span>
      },
      {
        accessorKey: 'updatedAt',
        label: 'Güncellenme Tarihi',
        cell: ({ row }) => <span>{formatDateWithTime(row.original.updatedAt)}</span>
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
              <AppSheet.Content title={'Makine Tipi Düzenle'}>
                <MachinesTypesCreateEditForm machineTypeId={row?.original?.machineTypeID} />
              </AppSheet.Content>
            </AppSheet.Sheet>

            <AppAlert.AlertDialog>
              <AppAlert.Trigger asChild>
                <Button variant="destructive" size="icon">
                  <Trash2 size={20} className="text-white" />
                </Button>
              </AppAlert.Trigger>
              <AppAlert.Content
                title={'Makine Tipi Sil'}
                description={` ${row?.original?.typeName} adlı makine tipini silmek istediğinize emin misiniz ?`}
              >
                <AppAlert.Footer>
                  <AppAlert.Close asChild>
                    <Button variant="outline">{'İptal'}</Button>
                  </AppAlert.Close>

                  <Button
                    onClick={() => handleDeleteMachineTypePress(row?.original?.machineTypeID)}
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
      label: 'Durum',
      queryName: 'isActive',
      type: DataTableToolbarFilterType.SelectBox,
      options: getStatusOptionsData(t)
    }
  ];

  return {
    columns,
    filterColumns,
    renderCreateButton
  };
};
