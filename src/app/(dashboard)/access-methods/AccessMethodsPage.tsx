'use client';

import React from 'react';
import { toast } from 'sonner';
import { DataTable } from '@/components/table/DataTable';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { DataTableName } from '@/components/table/DataTable.enum';
import { useGetAccessMethodQuery } from '@/api/AccessMethod/AccessMethod.hook';
import { AccessMethodApi } from '@/api/AccessMethod/AccessMethod.api';
import { useAccessMethodsTableColumns } from '@/features/AccessMethods/table/AccessMethodsTable.columns';
import { exportAccessMethodsExcel } from '@/utils/excelExport';

export default function AccessMethodsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams() || new URLSearchParams();

  const page = searchParams.get('page') || '1';
  const pageSize = searchParams.get('pageSize') || '20';
  const searchTerm = searchParams.get('searchTerm') || undefined;
  const isActive = searchParams.get('isActive') || undefined;

  const {
    data: accessMethodListData,
    isLoading,
    isError
  } = useGetAccessMethodQuery({
    pageNumber: Number(page) || 1,
    pageSize: Number(pageSize) || 20,
    searchTerm: searchTerm,
    isActive: isActive === 'true' ? true : isActive === 'false' ? false : undefined
  });

  const { columns, filterColumns, renderCreateButton } = useAccessMethodsTableColumns();

  const handleClearFiltersPress = () => {
    router.push(`${pathname}`);
  };

  const handleExcelExportButton = async () => {
    const loadingToast = toast.loading('Excel dosyası hazırlanıyor...');
    try {
      const allData = await AccessMethodApi.getManagementAccessMethod({
        pageNumber: Number(page) || 1,
        pageSize: Number(pageSize) || 20,
        searchTerm: searchTerm,
        isActive: isActive === 'true' ? true : isActive === 'false' ? false : undefined
      });
      await exportAccessMethodsExcel(allData?.data || [], searchParams);
    } catch (e) {
      toast.error('Excel dosyası oluşturulurken bir hata oluştu.');
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  return (
    <div className="w-full overflow-auto">
      <DataTable
        title={'Geçiş Yöntemleri'}
        tableName={DataTableName.AccessMethodsTable}
        data={accessMethodListData?.data || []}
        columns={columns}
        filterColumns={filterColumns}
        isLoading={isLoading}
        isError={isError}
        pageCount={accessMethodListData?.pageSize || 0}
        totalCount={accessMethodListData?.totalCount || 0}
        clearFiltersPress={handleClearFiltersPress}
        handleExcelExportButton={handleExcelExportButton}
        renderCreateButton={renderCreateButton}
      />
    </div>
  );
}
