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
import PackagesCreateEditForm from '../form/PackagesCreateEditForm';
import { GetManagementPackageDTO } from '@/api/Package/Package.types';
import { useDeletePackageByIdMutation } from '@/api/Package/Package.hook';

export const usePackagesTableColumns = () => {
  const { t } = useTranslation();
  const { mutateAsync: deletePackageById } = useDeletePackageByIdMutation();

  const renderCreateButton = useMemo(
    () => () => {
      return (
        <AppSheet.Sheet>
          <AppSheet.Trigger asChild>
            <Button variant="outline" size="sm">
              <PlusCircle size={20} />
              Paket Oluştur
            </Button>
          </AppSheet.Trigger>
          <AppSheet.Content title={'Paket Oluştur'}>
            <PackagesCreateEditForm />
          </AppSheet.Content>
        </AppSheet.Sheet>
      );
    },
    []
  );

  const handleDeletePackagePress = async (packageId: string) => {
    const response = await deletePackageById(packageId);

    if (response.success) {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    }
  };

  const columns = useMemo<ColumnDef<GetManagementPackageDTO['data'][0], any>[]>(
    () => [
      {
        accessorKey: 'packageName',
        label: 'Paket Adı',
        sortingFn: 'text'
      },
      {
        accessorKey: 'description',
        label: 'Açıklama'
      },
      {
        accessorKey: 'totalPrice',
        label: 'Toplam Fiyat'
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
              <AppSheet.Content title={'Paketi Düzenle'}>
                <PackagesCreateEditForm packageId={row?.original?.packageID} />
              </AppSheet.Content>
            </AppSheet.Sheet>

            <AppAlert.AlertDialog>
              <AppAlert.Trigger asChild>
                <Button variant="destructive" size="icon">
                  <Trash2 size={20} className="text-white" />
                </Button>
              </AppAlert.Trigger>
              <AppAlert.Content
                title={'Paket Sil'}
                description={` ${row?.original?.packageName} adlı paketi silmek istediğinize emin misiniz ?`}
              >
                <AppAlert.Footer>
                  <AppAlert.Close asChild>
                    <Button variant="outline">{'İptal'}</Button>
                  </AppAlert.Close>

                  <Button
                    onClick={() => handleDeletePackagePress(row?.original?.packageID)}
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
      label: 'Minimum Fiyat',
      queryName: 'minPrice',
      type: DataTableToolbarFilterType.SearchInput
    },
    {
      label: 'Maksimum Fiyat',
      queryName: 'maxPrice',
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
