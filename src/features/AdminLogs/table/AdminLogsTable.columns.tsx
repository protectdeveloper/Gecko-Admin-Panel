'use client';

import { useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';
import { ColumnDef } from '@tanstack/react-table';
import { formatDateWithTime } from '@/utils/formatTime';
import { GetManagementAdminLogDTO } from '@/api/AdminLog/AdminLog.types';
import { getIsAuthorizedOptionsData, getRequestTypeData } from '@/utils/data';
import { DataTableToolbarFilterItem, DataTableToolbarFilterType } from '@/components/table/DataTable';

export const useAdminLogsTableColumns = () => {
  const { t } = useTranslation();

  const columns = useMemo<ColumnDef<GetManagementAdminLogDTO['data'][0], any>[]>(
    () => [
      {
        accessorKey: 'adminName',
        label: 'Admin Adı',
        sortingFn: 'text'
      },
      {
        accessorKey: 'ipAddress',
        label: 'IP Adresi'
      },
      {
        accessorKey: 'requestMethod',
        label: 'İstek Metodu'
      },
      {
        accessorKey: 'controller',
        label: 'Kontrol'
      },
      {
        accessorKey: 'action',
        label: 'Aksiyon'
      },
      {
        accessorKey: 'actionType',
        label: 'Aksiyon Türü'
      },
      {
        accessorKey: 'isAuthorized',
        label: 'Yetki Durumu',
        cell: ({ row }) =>
          row.original.isAuthorized ? (
            <Badge variant="default" className="px-2">
              İzinli
            </Badge>
          ) : (
            <Badge variant="destructive" className="px-2">
              İzinli Değil
            </Badge>
          ),
        exportValue: (row: any) => (row.isAuthorized ? 'İzinli' : 'İzinli Değil')
      },
      {
        accessorKey: 'createdAt',
        label: 'Oluşturulma Tarihi',
        cell: ({ row }) => <span>{formatDateWithTime(row.original.createdAt)}</span>,
        exportValue: (row: any) => formatDateWithTime(row.createdAt)
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
      label: 'Admin Ara',
      queryName: 'adminName',
      type: DataTableToolbarFilterType.SearchInput
    },
    {
      label: 'Yetki Durumu',
      queryName: 'isAuthorized',
      type: DataTableToolbarFilterType.SelectBox,
      options: getIsAuthorizedOptionsData(t)
    },
    {
      label: 'İstek Metodu',
      queryName: 'requestMethod',
      type: DataTableToolbarFilterType.SelectBox,
      options: getRequestTypeData(t)
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
    filterColumns
  };
};
