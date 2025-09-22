'use client';

import React from 'react';
import { DataTable } from '@/components/table/DataTable';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { DataTableName } from '@/components/table/DataTable.enum';
import { useTranslation } from 'react-i18next';
import { useCustomersTableColumns } from '@/features/Customers/table/CustomersTable.columns';
import { useGetCustomersQuery } from '@/api/Customer/Customer.hook';
import { toast } from 'sonner';
import { CustomerApi } from '@/api/Customer/Customer.api';
import { exportCustomersExcel } from '@/utils/excelExport';

export default function CustomersPage() {
  const router = useRouter();
  const pathname = usePathname() || '';
  const searchParams = useSearchParams() || new URLSearchParams();

  const page = searchParams.get('page') || '1';
  const pageSize = searchParams.get('pageSize') || '20';
  const searchTerm = searchParams.get('searchTerm') || undefined;
  const isActive = searchParams.get('isActive') || undefined;

  const {
    data: usersListData,
    isLoading,
    isError
  } = useGetCustomersQuery({
    pageNumber: Number(page) || 1,
    pageSize: Number(pageSize) || 20,
    isActive: isActive === 'true' ? true : isActive === 'false' ? false : undefined,
    searchTerm: searchTerm
  });

  const { columns, filterColumns, renderCreateButton } = useCustomersTableColumns();

  const handleClearFiltersPress = () => {
    router.push(`${pathname}`);
  };

  const handleExcelExportButton = async () => {
    const loadingToast = toast.loading('Excel dosyası hazırlanıyor...');
    try {
      const allData = await CustomerApi.getManagementCustomers({
        pageNumber: Number(page) || 1,
        pageSize: Number(pageSize) || 20,
        isActive: isActive === 'true' ? true : isActive === 'false' ? false : undefined,
        searchTerm: searchTerm
      });
      await exportCustomersExcel(allData?.data || [], searchParams);
    } catch (e) {
      toast.error('Excel dosyası oluşturulurken bir hata oluştu.');
    } finally {
      toast.dismiss(loadingToast);
    }
  };
  return (
    <DataTable
      title={'Firmalar'}
      tableName={DataTableName.CustomersTable}
      data={usersListData?.data || []}
      columns={columns}
      filterColumns={filterColumns}
      isLoading={isLoading}
      isError={isError}
      pageCount={usersListData?.pageSize || 0}
      totalCount={usersListData?.totalCount || 0}
      clearFiltersPress={handleClearFiltersPress}
      handleExcelExportButton={handleExcelExportButton}
      renderCreateButton={renderCreateButton}
    />
  );
}
