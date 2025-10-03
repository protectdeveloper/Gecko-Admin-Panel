import { GetManagementAnalyticsAdminLogsDTO } from '@/api/Analytics/Analytics.types';
import { DataTableToolbarFilterType, DataTableToolbarFilterItem } from '@/components/table/DataTable';
import { Badge } from '@/components/ui/badge';
import { getRequestTypeData } from '@/utils/data';
import { formatDateWithTime } from '@/utils/formatTime';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export const useDashboardAdminLogsTableColumns = () => {
  const { t } = useTranslation();

  const columns = useMemo<ColumnDef<GetManagementAnalyticsAdminLogsDTO['data'][0], any>[]>(
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
      label: 'İstek Metodu',
      queryName: 'requestMethod',
      type: DataTableToolbarFilterType.SelectBox,
      options: getRequestTypeData(t)
    }
  ];

  return {
    columns,
    filterColumns
  };
};
