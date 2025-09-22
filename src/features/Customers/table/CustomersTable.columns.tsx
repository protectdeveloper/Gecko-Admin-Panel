import { GetManagementCustomersDTO } from '@/api/Customer/Customer.types';
import { AppAlert } from '@/components/AppAlert';
import { AppSheet } from '@/components/AppSheet';
import { DataTableToolbarFilterType, DataTableToolbarFilterItem } from '@/components/table/DataTable';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getStatusOptionsData } from '@/utils/data';
import { formatAvatarFallback } from '@/utils/formatAvatarFallback';
import { formatDateWithTime } from '@/utils/formatTime';
import { ColumnDef } from '@tanstack/react-table';
import { Pencil, PlusCircle, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import CustomerCreateEditForm from '../form/CustomerCreateEditForm';

export const useCustomersTableColumns = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const renderCreateButton = useMemo(
    () => () => {
      return (
        <AppSheet.Sheet>
          <AppSheet.Trigger asChild>
            <Button variant="outline" size="sm">
              <PlusCircle size={20} />
              Firma Oluştur
            </Button>
          </AppSheet.Trigger>
          <AppSheet.Content title={'Firma Oluştur'}>
            <CustomerCreateEditForm />
          </AppSheet.Content>
        </AppSheet.Sheet>
      );
    },
    []
  );

  const columns = useMemo<ColumnDef<GetManagementCustomersDTO['data'][0], any>[]>(
    () => [
      {
        accessorKey: 'customerName',
        label: 'Firma Adı',
        cell: ({ row }) => (
          <div
            className="flex items-center gap-3 cursor-pointer hover:underline"
            onClick={() => router.push(`/customers/detail/${row?.original?.customerID}`)}
          >
            <Avatar className="h-10 w-10">
              <AvatarImage src={row?.original?.logo || undefined} alt="User Avatar" />
              <AvatarFallback>
                {formatAvatarFallback(row?.original?.customerName?.split(' ')[0], row?.original?.customerName?.split(' ')[1])}
              </AvatarFallback>
            </Avatar>
            <span className="font-medium">{row?.original?.customerName}</span>
          </div>
        ),
        exportValue: (row: any) => row.customerName
      },
      {
        accessorKey: 'customerCode',
        label: 'Firma Kodu'
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
              <AppSheet.Content title={'Firma Düzenle'}>
                <CustomerCreateEditForm customerId={row?.original?.customerID} />
              </AppSheet.Content>
            </AppSheet.Sheet>

            <AppAlert.AlertDialog>
              <AppAlert.Trigger asChild>
                <Button variant="destructive" size="icon">
                  <Trash2 size={20} className="text-white" />
                </Button>
              </AppAlert.Trigger>
              <AppAlert.Content title={'Firma Sil'} description={'Bu firmayı silmek istediğinize emin misiniz?'}>
                <AppAlert.Footer>
                  <AppAlert.Close asChild>
                    <Button variant="outline">{'İptal'}</Button>
                  </AppAlert.Close>

                  <Button variant="destructive">{'Sil'}</Button>
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
      label: 'Firma Adı',
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
