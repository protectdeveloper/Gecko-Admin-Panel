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
import { DataTableToolbarFilterType, DataTableToolbarFilterItem } from '@/components/table/DataTable';
import ConnectionsCreateEditForm from '../form/ConnectionsCreateEditForm';
import { GetManagementConnectionDTO } from '@/api/Connection/Connection.types';
import { useDeleteConnectionByIdMutation } from '@/api/Connection/Connection.hook';
import { useGetCustomersQuery } from '@/api/Customer/Customer.hook';

export const useConnectionsTableColumns = ({
  isDisabledCustomerFilter = false,
  customerId
}: {
  isDisabledCustomerFilter?: boolean;
  customerId?: string;
}) => {
  const { t } = useTranslation();
  const { data: customersData } = useGetCustomersQuery({ pageNumber: 1, pageSize: 9999 });
  const { mutateAsync: deleteConnectionById } = useDeleteConnectionByIdMutation();

  const renderCreateButton = useMemo(
    () => () => {
      return (
        <AppSheet.Sheet>
          <AppSheet.Trigger asChild>
            <Button variant="outline" size="sm">
              <PlusCircle size={20} />
              Bağlantı Oluştur
            </Button>
          </AppSheet.Trigger>
          <AppSheet.Content title={'Bağlantı Oluştur'}>
            <ConnectionsCreateEditForm isDisabledCustomerSelect={isDisabledCustomerFilter} customerId={customerId} />
          </AppSheet.Content>
        </AppSheet.Sheet>
      );
    },
    []
  );

  const handleDeleteConnectionPress = async (connectionId: string) => {
    const response = await deleteConnectionById(connectionId);

    if (response.success) {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    }
  };

  const columns = useMemo<ColumnDef<GetManagementConnectionDTO['data'][0], any>[]>(
    () => [
      {
        accessorKey: 'customerName',
        label: 'Firma Adı',
        sortingFn: 'text',
        cell: ({ row }) => <span>{row.original?.customerName || '-'}</span>
      },
      {
        accessorKey: 'connectionType',
        label: 'Bağlantı Türü'
      },
      {
        accessorKey: 'connectionString',
        label: 'Bağlantı Dizesi',
        cell: ({ row }) => <span className="max-w-xs block truncate">{row.original?.connectionString}</span>
      },
      {
        accessorKey: 'isActive',
        label: 'Durum',
        cell: ({ row }) => (
          <Badge className={'w-[85px] px-3 py-1 gap-2 -ml-1'}>{row.original?.isActive ? 'Aktif' : 'Pasif'}</Badge>
        )
      },
      {
        accessorKey: 'createdAt',
        label: 'Oluşturulma Tarihi',
        cell: ({ row }) => <span>{formatDateWithTime(row.original?.createdAt)}</span>
      },
      {
        accessorKey: 'updatedAt',
        label: 'Güncellenme Tarihi',
        cell: ({ row }) => <span>{formatDateWithTime(row.original?.updatedAt)}</span>
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
              <AppSheet.Content title={'Bağlantı Düzenle'}>
                <ConnectionsCreateEditForm
                  isDisabledCustomerSelect={isDisabledCustomerFilter}
                  customerId={row?.original?.customerID}
                  connectionId={row?.original?.connectionID}
                />
              </AppSheet.Content>
            </AppSheet.Sheet>

            <AppAlert.AlertDialog>
              <AppAlert.Trigger asChild>
                <Button variant="destructive" size="icon">
                  <Trash2 size={20} className="text-white" />
                </Button>
              </AppAlert.Trigger>
              <AppAlert.Content
                title={'Bağlantı Sil'}
                description={` ${row?.original?.customerName} adlı firmanın bağlantısını silmek istediğinize emin misiniz ?`}
              >
                <AppAlert.Footer>
                  <AppAlert.Close asChild>
                    <Button variant="outline">{'İptal'}</Button>
                  </AppAlert.Close>

                  <Button
                    onClick={() => handleDeleteConnectionPress(row?.original?.connectionID)}
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
    ...(!isDisabledCustomerFilter
      ? [
          {
            label: 'Firma',
            queryName: 'customerId',
            type: DataTableToolbarFilterType.SelectBox,
            options: customersData?.data.map((customer) => ({ label: customer.customerName, value: customer.customerID })) || []
          } as DataTableToolbarFilterItem
        ]
      : []),

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
