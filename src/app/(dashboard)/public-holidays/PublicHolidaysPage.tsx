'use client';

import React from 'react';
import { toast } from 'sonner';
import { DataTable } from '@/components/table/DataTable';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { DataTableName } from '@/components/table/DataTable.enum';
import { exportPublicHolidaysExcel } from '@/utils/excelExport';
import { usePublicHolidaysTableColumns } from '@/features/PublicHolidays/table/HolidaysTable.columns';
import { useGetPublicHolidayQuery } from '@/api/PublicHoliday/PublicHoliday.hook';
import { getParsedDateParam } from '@/utils/formatTime';
import dayjs from 'dayjs';
import { PublicHolidayApi } from '@/api/PublicHoliday/PublicHoliday.api';

export default function PublicHolidaysPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams() || new URLSearchParams();

  const page = searchParams.get('page') || '1';
  const pageSize = searchParams.get('pageSize') || '20';
  const searchTerm = searchParams.get('searchTerm') || undefined;
  const startDate = getParsedDateParam(searchParams, 'startDate', dayjs().startOf('year'));
  const endDate = getParsedDateParam(searchParams, 'endDate', dayjs().endOf('year'));

  const {
    data: publicHolidaysListData,
    isLoading,
    isFetching,
    isError
  } = useGetPublicHolidayQuery({
    pageNumber: Number(page) || 1,
    pageSize: Number(pageSize) || 20,
    searchTerm: searchTerm,
    startDate: startDate,
    endDate: endDate
  });

  const { columns, filterColumns, renderCreateButton } = usePublicHolidaysTableColumns();

  const handleClearFiltersPress = () => {
    router.push(`${pathname}`);
  };

  const handleExcelExportButton = async () => {
    const loadingToast = toast.loading('Excel dosyası hazırlanıyor...');
    try {
      const allData = await PublicHolidayApi.getManagementPublicHoliday({
        pageNumber: Number(page) || 1,
        pageSize: Number(pageSize) || 20,
        searchTerm: searchTerm,
        startDate: startDate,
        endDate: endDate
      });
      await exportPublicHolidaysExcel(allData?.data || [], searchParams);
    } catch (e) {
      toast.error('Excel dosyası oluşturulurken bir hata oluştu.');
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  return (
    <div className="w-full overflow-auto">
      <DataTable
        title={'Tatil Listesi'}
        tableName={DataTableName.PublicHolidaysTable}
        data={publicHolidaysListData?.data || []}
        columns={columns}
        filterColumns={filterColumns}
        isLoading={isLoading || isFetching}
        isError={isError}
        pageCount={publicHolidaysListData?.pageSize || 0}
        totalCount={publicHolidaysListData?.totalCount || 0}
        clearFiltersPress={handleClearFiltersPress}
        handleExcelExportButton={handleExcelExportButton}
        renderCreateButton={renderCreateButton}
      />
    </div>
  );
}
