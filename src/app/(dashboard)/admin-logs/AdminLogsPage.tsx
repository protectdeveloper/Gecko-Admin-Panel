'use client';

import React from 'react';
import { DataTable } from '@/components/table/DataTable';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { DataTableName } from '@/components/table/DataTable.enum';
import { useAdminLogsTableColumns } from '@/features/AdminLogs/table/AdminLogsTable.columns';
import { useGetAdminLogQuery } from '@/api/AdminLog/AdminLog.hook';
import { getParsedDateParam } from '@/utils/formatTime';
import dayjs from 'dayjs';

export default function AdminLogsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams() || new URLSearchParams();

  const page = searchParams.get('page') || '1';
  const pageSize = searchParams.get('pageSize') || '20';
  const searchTerm = searchParams.get('searchTerm') || undefined;
  const requestMethod = searchParams.get('requestMethod') || undefined;
  const sortColumn = searchParams.get('sortColumn') || undefined;
  const sortDesc = searchParams.get('sortDesc') || undefined;
  const adminName = searchParams.get('adminName') || undefined;
  const startDate = getParsedDateParam(searchParams, 'startDate', dayjs().startOf('year'));
  const endDate = getParsedDateParam(searchParams, 'endDate', dayjs().endOf('year'));

  const {
    data: adminLogListData,
    isLoading,
    isError,
    isFetching,
    isRefetching
  } = useGetAdminLogQuery({
    pageNumber: Number(page) || 1,
    pageSize: Number(pageSize) || 20,
    searchTerm: searchTerm,
    requestMethod: requestMethod,
    sortBy: sortColumn,
    sortOrder: sortDesc === 'true' ? 'desc' : 'asc',
    adminName: adminName,
    startDate: startDate,
    endDate: endDate
  });

  const { columns, filterColumns } = useAdminLogsTableColumns();

  const handleClearFiltersPress = () => {
    router.push(`${pathname}`);
  };

  return (
    <div className="w-full overflow-auto">
      <DataTable
        title={'Admin Logları'}
        tableName={DataTableName.AdminLogsTable}
        data={adminLogListData?.data || []}
        columns={columns}
        filterColumns={filterColumns}
        isLoading={isLoading || isFetching || isRefetching}
        isError={isError}
        pageCount={adminLogListData?.pageSize || 0}
        totalCount={adminLogListData?.totalCount || 0}
        clearFiltersPress={handleClearFiltersPress}
      />
    </div>
  );
}
