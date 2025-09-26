'use client';

import React from 'react';
import { toast } from 'sonner';
import { DataTable } from '@/components/table/DataTable';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { DataTableName } from '@/components/table/DataTable.enum';
import { exportConnectionsExcel } from '@/utils/excelExport';
import { useGetConnectionQuery } from '@/api/Connection/Connection.hook';
import { useConnectionsTableColumns } from '@/features/Connections/table/ConnectionsTable.columns';
import { ConnectionApi } from '@/api/Connection/Connection.api';

export default function ConnectionsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams() || new URLSearchParams();

  const page = searchParams.get('page') || '1';
  const pageSize = searchParams.get('pageSize') || '20';
  const searchTerm = searchParams.get('searchTerm') || undefined;
  const isActive = searchParams.get('isActive') || undefined;
  const customerId = searchParams.get('customerId') || undefined;

  const {
    data: connectionsListData,
    isLoading,
    isError
  } = useGetConnectionQuery({
    pageNumber: Number(page) || 1,
    pageSize: Number(pageSize) || 20,
    searchTerm: searchTerm,
    isActive: isActive === 'true' ? true : isActive === 'false' ? false : undefined,
    customerId: customerId
  });

  const { columns, filterColumns, renderCreateButton } = useConnectionsTableColumns({});

  const handleClearFiltersPress = () => {
    router.push(`${pathname}`);
  };

  const handleExcelExportButton = async () => {
    const loadingToast = toast.loading('Excel dosyası hazırlanıyor...');
    try {
      const allData = await ConnectionApi.getManagementConnection({
        pageNumber: Number(page) || 1,
        pageSize: Number(pageSize) || 20,
        searchTerm: searchTerm,
        customerId: customerId,
        isActive: isActive === 'true' ? true : isActive === 'false' ? false : undefined
      });
      await exportConnectionsExcel(allData?.data || [], searchParams);
    } catch (e) {
      toast.error('Excel dosyası oluşturulurken bir hata oluştu.');
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  return (
    <div className="w-full overflow-auto">
      <DataTable
        title={'Bağlantılar'}
        tableName={DataTableName.ConnectionsTable}
        data={connectionsListData?.data || []}
        columns={columns}
        filterColumns={filterColumns}
        isLoading={isLoading}
        isError={isError}
        pageCount={connectionsListData?.pageSize || 0}
        totalCount={connectionsListData?.totalCount || 0}
        clearFiltersPress={handleClearFiltersPress}
        handleExcelExportButton={handleExcelExportButton}
        renderCreateButton={renderCreateButton}
      />
    </div>
  );
}
