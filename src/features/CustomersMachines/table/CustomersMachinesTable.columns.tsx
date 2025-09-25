'use client';
import { AppAlert } from '@/components/AppAlert';
import { AppSheet } from '@/components/AppSheet';
import { DataTableToolbarFilterType, DataTableToolbarFilterItem } from '@/components/table/DataTable';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getIsOnlineOptionsData, getStatusOptionsData } from '@/utils/data';
import { formatDateWithTime } from '@/utils/formatTime';
import { ColumnDef } from '@tanstack/react-table';
import { Pencil, PlusCircle, Trash2 } from 'lucide-react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import CustomersMachinesCreateEditForm from '../form/CustomersMachinesCreateEditForm';
import { useDeleteCustomerMachineByIdMutation } from '@/api/CustomerMachine/CustomerMachine.hook';
import { GetManagementCustomerMachineDTO } from '@/api/CustomerMachine/CustomerMachine.types';
import { useGetCustomersQuery } from '@/api/Customer/Customer.hook';

export const useCustomersMachinesTableColumns = () => {
  const { t } = useTranslation();
  const { data: customersData } = useGetCustomersQuery({ pageNumber: 1, pageSize: 1000 });
  const { mutateAsync: deleteCustomerMachine } = useDeleteCustomerMachineByIdMutation();

  const renderCreateButton = useMemo(
    () => () => {
      return (
        <AppSheet.Sheet>
          <AppSheet.Trigger asChild>
            <Button variant="outline" size="sm">
              <PlusCircle size={20} />
              Firma Makinesi Oluştur
            </Button>
          </AppSheet.Trigger>
          <AppSheet.Content title={'Firma Makinesi Oluştur'}>
            <CustomersMachinesCreateEditForm />
          </AppSheet.Content>
        </AppSheet.Sheet>
      );
    },
    []
  );

  const handleDeleteCustomerMachinePress = async (customerMachineId: string) => {
    const response = await deleteCustomerMachine(customerMachineId);
    if (response?.success) {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    }
  };

  const columns = useMemo<ColumnDef<GetManagementCustomerMachineDTO['data'][0], any>[]>(
    () => [
      {
        accessorKey: 'machineName',
        label: 'Makine Adı'
      },
      {
        accessorKey: 'description',
        label: 'Açıklama'
      },
      {
        accessorKey: 'assemblyName',
        label: 'Montaj Adı'
      },
      {
        accessorKey: 'tolerance',
        label: 'Tolerance (metre)'
      },
      {
        accessorKey: 'latitude',
        label: 'Latitude (derece)'
      },
      {
        accessorKey: 'longitude',
        label: 'Longitude (derece)'
      },
      {
        accessorKey: 'isOnline',
        label: 'Online Durumu',
        cell: ({ row }) => (
          <Badge variant={'outline'} className={'w-[85px] px-3 py-1 gap-2'}>
            {row.original.isOnline ? 'Online' : 'Offline'}
          </Badge>
        )
      },
      {
        accessorKey: 'isTasEnabled',
        label: 'TAS Durumu',
        cell: ({ row }) => (
          <Badge variant={'outline'} className={'w-[85px] px-3 py-1 gap-2'}>
            {row.original.isTasEnabled ? 'Enabled' : 'Disabled'}
          </Badge>
        )
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
              <AppSheet.Content title={'Firma Makinesi Düzenle'}>
                <CustomersMachinesCreateEditForm customerMachineId={row?.original?.customerMachineID} />
              </AppSheet.Content>
            </AppSheet.Sheet>

            <AppAlert.AlertDialog>
              <AppAlert.Trigger asChild>
                <Button variant="destructive" size="icon">
                  <Trash2 size={20} className="text-white" />
                </Button>
              </AppAlert.Trigger>
              <AppAlert.Content
                title={'Firma Makinesi Sil'}
                description={` ${row?.original?.machineName} adlı makineyi silmek istediğinize emin misiniz ?`}
              >
                <AppAlert.Footer>
                  <AppAlert.Close asChild>
                    <Button variant="outline">{'İptal'}</Button>
                  </AppAlert.Close>

                  <Button
                    onClick={() => handleDeleteCustomerMachinePress(row?.original?.customerMachineID)}
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
      label: 'Makine Ara',
      queryName: 'machineName',
      type: DataTableToolbarFilterType.SearchInput
    },
    {
      label: 'Montaj Ara',
      queryName: 'assemblyName',
      type: DataTableToolbarFilterType.SearchInput
    },
    {
      label: 'Firma',
      queryName: 'customerId',
      type: DataTableToolbarFilterType.SelectBox,
      options: customersData?.data.map((customer) => ({ label: customer.customerName, value: customer.customerID })) || []
    },
    {
      label: 'Online Durumu',
      queryName: 'isOnline',
      type: DataTableToolbarFilterType.SelectBox,
      options: getIsOnlineOptionsData(t)
    },

    {
      label: 'Aktif Durum',
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
