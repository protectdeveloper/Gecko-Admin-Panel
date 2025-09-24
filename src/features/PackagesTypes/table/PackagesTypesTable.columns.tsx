'use client';
import { AppAlert } from '@/components/AppAlert';
import { AppSheet } from '@/components/AppSheet';
import { DataTableToolbarFilterType, DataTableToolbarFilterItem } from '@/components/table/DataTable';
import { Button } from '@/components/ui/button';
import { getStatusOptionsData } from '@/utils/data';
import { formatDateWithTime } from '@/utils/formatTime';
import { ColumnDef } from '@tanstack/react-table';
import { Pencil, PlusCircle, Trash2 } from 'lucide-react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import PackagesTypesCreateEditForm from '../form/PackagesTypesCreateEditForm';
import { GetManagementPackageTypeDTO } from '@/api/PackageType/PackageType.types';
import { useDeletePackageTypeByIdMutation } from '@/api/PackageType/PackageType.hook';
import { Badge } from '@/components/ui/badge';

export const usePackagesTypesTableColumns = () => {
  const { t } = useTranslation();
  const { mutateAsync: deletePackageTypeById } = useDeletePackageTypeByIdMutation();

  const renderCreateButton = useMemo(
    () => () => {
      return (
        <AppSheet.Sheet>
          <AppSheet.Trigger asChild>
            <Button variant="outline" size="sm">
              <PlusCircle size={20} />
              Paket Tipi Oluştur
            </Button>
          </AppSheet.Trigger>
          <AppSheet.Content title={'Paket Tipi Oluştur'}>
            <PackagesTypesCreateEditForm />
          </AppSheet.Content>
        </AppSheet.Sheet>
      );
    },
    []
  );

  const handleDeletePackageTypePress = async (packageId: string) => {
    const response = await deletePackageTypeById(packageId);

    if (response.success) {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    }
  };

  const columns = useMemo<ColumnDef<GetManagementPackageTypeDTO['data'][0], any>[]>(
    () => [
      {
        accessorKey: 'typeName',
        label: 'Paket Tipi Adı',
        cell: ({ row }) => <span>{row.original.typeName || '-'}</span>
      },
      {
        accessorKey: 'systemName',
        label: 'Sistem Adı',
        cell: ({ row }) => <span>{row.original.systemName || '-'}</span>
      },
      {
        accessorKey: 'description',
        label: 'Açıklama',
        cell: ({ row }) => <span>{row.original.description || '-'}</span>
      },
      {
        accessorKey: 'categoryName',
        label: 'Kategori Adı',
        cell: ({ row }) => <span>{row.original.categoryName || '-'}</span>
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
              <AppSheet.Content title={'Paket Tipi Düzenle'}>
                <PackagesTypesCreateEditForm packageTypeId={row?.original?.packageTypeID} />
              </AppSheet.Content>
            </AppSheet.Sheet>

            <AppAlert.AlertDialog>
              <AppAlert.Trigger asChild>
                <Button variant="destructive" size="icon">
                  <Trash2 size={20} className="text-white" />
                </Button>
              </AppAlert.Trigger>
              <AppAlert.Content
                title={'Paket Tipi Sil'}
                description={` ${row?.original?.typeName} adlı paket tipini silmek istediğinize emin misiniz ?`}
              >
                <AppAlert.Footer>
                  <AppAlert.Close asChild>
                    <Button variant="outline">{'İptal'}</Button>
                  </AppAlert.Close>

                  <Button
                    onClick={() => handleDeletePackageTypePress(row?.original?.packageTypeID)}
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
      label: 'Paket Tipi Ara',
      queryName: 'searchTerm',
      type: DataTableToolbarFilterType.SearchInput
    },
    {
      label: 'Kategori Ara',
      queryName: 'categoryName',
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
