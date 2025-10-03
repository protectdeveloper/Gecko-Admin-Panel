'use client';
import { AppAlert } from '@/components/AppAlert';
import { AppSheet } from '@/components/AppSheet';
import { DataTableToolbarFilterType, DataTableToolbarFilterItem } from '@/components/table/DataTable';
import { Button } from '@/components/ui/button';
import { formatDateWithTime } from '@/utils/formatTime';
import { ColumnDef } from '@tanstack/react-table';
import { Pencil, PlusCircle, Trash2 } from 'lucide-react';
import { useMemo } from 'react';
import { useDeletePackageContentByIdMutation } from '@/api/PackageContent/PackageContent.hook';
import PackagesContentCreateEditForm from '../form/PackagesContentCreateEditForm';
import { GetManagementPackageContentDTO } from '@/api/PackageContent/PackageContent.types';
import { useGetPackageQuery } from '@/api/Package/Package.hook';
import { useGetPackageTypeQuery } from '@/api/PackageType/PackageType.hook';

export const usePackagesContentTableColumns = () => {
  const { mutateAsync: deletePackageContentById } = useDeletePackageContentByIdMutation();
  const { data: packageData } = useGetPackageQuery({
    pageNumber: 1,
    pageSize: 1000
  });
  const { data: packageTypeData } = useGetPackageTypeQuery({
    pageNumber: 1,
    pageSize: 1000
  });
  const renderCreateButton = useMemo(
    () => () => {
      return (
        <AppSheet.Sheet>
          <AppSheet.Trigger asChild>
            <Button variant="outline" size="sm">
              <PlusCircle size={20} />
              Paket İçeriği Oluştur
            </Button>
          </AppSheet.Trigger>
          <AppSheet.Content title={'Paket İçeriği Oluştur'}>
            <PackagesContentCreateEditForm />
          </AppSheet.Content>
        </AppSheet.Sheet>
      );
    },
    []
  );

  const handleDeletePackageContentPress = async (packageContentId: string) => {
    const response = await deletePackageContentById(packageContentId);

    if (response.success) {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    }
  };

  const columns = useMemo<ColumnDef<GetManagementPackageContentDTO['data'][0], any>[]>(
    () => [
      {
        accessorKey: 'packageName',
        label: 'Paket Adı',
        sortingFn: 'text',
        cell: ({ row }) => <span>{row.original.packageName || '-'}</span>
      },
      {
        accessorKey: 'packageTypeName',
        label: 'Paket Tipi Adı',
        sortingFn: 'text',
        cell: ({ row }) => <span>{row.original.packageTypeName || '-'}</span>
      },
      {
        accessorKey: 'quantity',
        label: 'Miktar',
        cell: ({ row }) => <span>{row.original.quantity || '0'}</span>
      },
      {
        accessorKey: 'unitPrice',
        label: 'Birim Fiyatı',
        cell: ({ row }) => <span>{row.original.unitPrice || '0'}</span>
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
              <AppSheet.Content title={'Paket İçeriğini Düzenle'}>
                <PackagesContentCreateEditForm packageContentId={row?.original?.packageContentID} />
              </AppSheet.Content>
            </AppSheet.Sheet>

            <AppAlert.AlertDialog>
              <AppAlert.Trigger asChild>
                <Button variant="destructive" size="icon">
                  <Trash2 size={20} className="text-white" />
                </Button>
              </AppAlert.Trigger>
              <AppAlert.Content
                title={'Paket İçeriğini Sil'}
                description={` ${row?.original?.packageName} adlı paketin içeriğini silmek istediğinize emin misiniz ?`}
              >
                <AppAlert.Footer>
                  <AppAlert.Close asChild>
                    <Button variant="outline">{'İptal'}</Button>
                  </AppAlert.Close>

                  <Button
                    onClick={() => handleDeletePackageContentPress(row?.original?.packageContentID)}
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
      label: 'Paket',
      queryName: 'packageId',
      type: DataTableToolbarFilterType.SelectBox,
      options: packageData?.data?.map((item) => ({ label: item.packageName, value: item.packageID })) || []
    },
    {
      label: 'Paket Tipi',
      queryName: 'packageTypeId',
      type: DataTableToolbarFilterType.SelectBox,
      options: packageTypeData?.data?.map((item) => ({ label: item.typeName, value: item.packageTypeID })) || []
    }
  ];

  return {
    columns,
    filterColumns,
    renderCreateButton
  };
};
