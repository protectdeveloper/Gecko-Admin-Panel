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
import MachinesCreateEditForm from '../form/MachinesCreateEditForm';
import { GetManagementMachinesDTO } from '@/api/Machine/Machine.types';
import { useGetMachineTypesQuery } from '@/api/MachineType/MachineType.hook';
import { useDeleteMachineByIdMutation } from '@/api/Machine/Machine.hook';

export const useMachinesTableColumns = () => {
  const { t } = useTranslation();
  const { data: machineTypesData } = useGetMachineTypesQuery({ pageNumber: 1, pageSize: 1000 });
  const { mutateAsync: deleteMachine } = useDeleteMachineByIdMutation();

  const renderCreateButton = useMemo(
    () => () => {
      return (
        <AppSheet.Sheet>
          <AppSheet.Trigger asChild>
            <Button variant="outline" size="sm">
              <PlusCircle size={20} />
              Makine Oluştur
            </Button>
          </AppSheet.Trigger>
          <AppSheet.Content title={'Makine Oluştur'}>
            <MachinesCreateEditForm />
          </AppSheet.Content>
        </AppSheet.Sheet>
      );
    },
    []
  );

  const handleDeleteMachinePress = async (machineId: string) => {
    const response = await deleteMachine(machineId);
    if (response?.success) {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    }
  };

  const columns = useMemo<ColumnDef<GetManagementMachinesDTO['data'][0], any>[]>(
    () => [
      {
        accessorKey: 'connectionName',
        label: 'Bağlantı Adı',
        sortingFn: 'text'
      },
      {
        accessorKey: 'serialNumber',
        label: 'Seri Numarası'
      },
      {
        accessorKey: 'ipAddress',
        label: 'IP Adresi'
      },
      {
        accessorKey: 'firmwareVersion',
        label: 'Firmware Versiyonu'
      },
      {
        accessorKey: 'antipassback',
        label: 'Antipassback',
        cell: ({ row }) => (
          <Badge variant={'outline'} className={'w-[85px] px-3 py-1 gap-2 '}>
            {row.original.antipassback ? 'Açık' : 'Kapalı'}
          </Badge>
        )
      },
      {
        accessorKey: 'isOnline',
        label: 'Online Durumu',
        cell: ({ row }) => <Badge className={'w-[85px] px-3 py-1 gap-2 '}>{row.original.isOnline ? 'Online' : 'Offline'}</Badge>
      },
      {
        accessorKey: 'passDelay',
        label: 'Pass Delay Var mı?',
        cell: ({ row }) => (
          <Badge variant={'outline'} className={'w-[85px] px-3 py-1 gap-2 '}>
            {row.original.passDelay ? 'Evet' : 'Hayır'}
          </Badge>
        )
      },
      {
        accessorKey: 'passDelayDuration',
        label: 'Pass Delay Süresi',
        cell: ({ row }) => <span>{row.original.passDelayDuration} sn</span>
      },
      {
        accessorKey: 'entryReadingEnabled',
        label: 'Giriş Okuma',
        cell: ({ row }) => (
          <Badge variant={'outline'} className={'w-[85px] px-3 py-1 gap-2 '}>
            {row.original.entryReadingEnabled ? 'Açık' : 'Kapalı'}
          </Badge>
        )
      },
      {
        accessorKey: 'exitReadingEnabled',
        label: 'Çıkış Okuma',
        cell: ({ row }) => (
          <Badge variant={'outline'} className={'w-[85px] px-3 py-1 gap-2 '}>
            {row.original.exitReadingEnabled ? 'Açık' : 'Kapalı'}
          </Badge>
        )
      },
      {
        accessorKey: 'relayTriggerDuration',
        label: 'Role Tetikleme Süresi',
        cell: ({ row }) => <span>{row.original.relayTriggerDuration} sn</span>
      },
      {
        accessorKey: 'timerInterval',
        label: 'Zamanlayıcı Aralığı'
      },
      {
        accessorKey: 'restartTime',
        label: 'Yeniden Başlatma Zamanı'
      },

      {
        accessorKey: 'hasSound',
        label: 'Ses Durumu',
        cell: ({ row }) => (
          <Badge variant={'outline'} className={'w-[85px] px-3 py-1 gap-2 -ml-1'}>
            {row.original.hasSound ? 'Açık' : 'Kapalı'}
          </Badge>
        )
      },
      {
        accessorKey: 'volumeLevel',
        label: 'Ses Seviyesi'
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
              <AppSheet.Content title={'Makine Düzenle'}>
                <MachinesCreateEditForm machineID={row?.original?.machineID} />
              </AppSheet.Content>
            </AppSheet.Sheet>

            <AppAlert.AlertDialog>
              <AppAlert.Trigger asChild>
                <Button variant="destructive" size="icon">
                  <Trash2 size={20} className="text-white" />
                </Button>
              </AppAlert.Trigger>
              <AppAlert.Content
                title={'Makine Sil'}
                description={` ${row?.original?.connectionName} adlı makineyi silmek istediğinize emin misiniz ?`}
              >
                <AppAlert.Footer>
                  <AppAlert.Close asChild>
                    <Button variant="outline">{'İptal'}</Button>
                  </AppAlert.Close>

                  <Button
                    onClick={() => handleDeleteMachinePress(row?.original?.machineID)}
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
      label: 'Makine Tipi',
      queryName: 'machineTypeId',
      type: DataTableToolbarFilterType.SelectBox,
      options: machineTypesData?.data.map((type) => ({ label: type.typeName, value: type.machineTypeID })) || []
    },
    {
      label: 'Seri Numarası Ara',
      queryName: 'serialNumber',
      type: DataTableToolbarFilterType.SearchInput
    },
    {
      label: 'IP Adresi Ara',
      queryName: 'ipAddress',
      type: DataTableToolbarFilterType.SearchInput
    },
    {
      label: 'Aktif Durum',
      queryName: 'isActive',
      type: DataTableToolbarFilterType.SelectBox,
      options: getStatusOptionsData(t)
    },
    {
      label: 'Online Durum',
      queryName: 'isOnline',
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
