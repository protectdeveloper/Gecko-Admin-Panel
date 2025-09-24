'use client';
import { useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { AppAlert } from '@/components/AppAlert';
import { AppSheet } from '@/components/AppSheet';
import { ColumnDef } from '@tanstack/react-table';
import { getStatusOptionsData } from '@/utils/data';
import { formatDateWithTime } from '@/utils/formatTime';
import { Pencil, PlusCircle, Trash2 } from 'lucide-react';
import AccessMethodsCreateEditForm from '../form/AccessMethodsCreateEditForm';
import { GetManagementAccessMethodDTO } from '@/api/AccessMethod/AccessMethod.types';
import { useDeleteAccessMethodByIdMutation } from '@/api/AccessMethod/AccessMethod.hook';
import { DataTableToolbarFilterType, DataTableToolbarFilterItem } from '@/components/table/DataTable';

export const useAccessMethodsTableColumns = () => {
  const { t } = useTranslation();
  const { mutateAsync: deleteAccessMethodById } = useDeleteAccessMethodByIdMutation();

  const renderCreateButton = useMemo(
    () => () => {
      return (
        <AppSheet.Sheet>
          <AppSheet.Trigger asChild>
            <Button variant="outline" size="sm">
              <PlusCircle size={20} />
              Geçiş Yöntemi Oluştur
            </Button>
          </AppSheet.Trigger>
          <AppSheet.Content title={'Geçiş Yöntemi Oluştur'}>
            <AccessMethodsCreateEditForm />
          </AppSheet.Content>
        </AppSheet.Sheet>
      );
    },
    []
  );

  const handleDeleteAccessMethodPress = async (accessMethodId: string) => {
    const response = await deleteAccessMethodById(accessMethodId);

    if (response.success) {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    }
  };

  const columns = useMemo<ColumnDef<GetManagementAccessMethodDTO['data'][0], any>[]>(
    () => [
      {
        accessorKey: 'methodName',
        label: 'Geçiş Yöntemi Adı'
      },
      {
        accessorKey: 'description',
        label: 'Açıklama'
      },
      {
        accessorKey: 'systemName',
        label: 'Sistem Adı'
      },
      {
        accessorKey: 'identifierCode',
        label: 'Tanımlayıcı Kod'
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
              <AppSheet.Content title={'Geçiş Yöntemi Düzenle'}>
                <AccessMethodsCreateEditForm accessMethodId={row?.original?.accessMethodID} />
              </AppSheet.Content>
            </AppSheet.Sheet>

            <AppAlert.AlertDialog>
              <AppAlert.Trigger asChild>
                <Button variant="destructive" size="icon">
                  <Trash2 size={20} className="text-white" />
                </Button>
              </AppAlert.Trigger>
              <AppAlert.Content
                title={'Geçiş Yöntemi Sil'}
                description={` ${row?.original?.methodName} adlı geçiş yöntemini silmek istediğinize emin misiniz ?`}
              >
                <AppAlert.Footer>
                  <AppAlert.Close asChild>
                    <Button variant="outline">{'İptal'}</Button>
                  </AppAlert.Close>

                  <Button
                    onClick={() => handleDeleteAccessMethodPress(row?.original?.accessMethodID)}
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
