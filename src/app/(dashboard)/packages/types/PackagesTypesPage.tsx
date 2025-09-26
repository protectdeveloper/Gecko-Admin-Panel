'use client';

import React from 'react';
import { toast } from 'sonner';
import { DataTable } from '@/components/table/DataTable';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { DataTableName } from '@/components/table/DataTable.enum';
import { exportPackageTypesExcel } from '@/utils/excelExport';
import { usePackagesTypesTableColumns } from '@/features/PackagesTypes/table/PackagesTypesTable.columns';
import { useGetPackageTypeQuery } from '@/api/PackageType/PackageType.hook';
import { PackageTypeApi } from '@/api/PackageType/PackageType.api';

export default function PackagesTypesPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams() || new URLSearchParams();

  const page = searchParams.get('page') || '1';
  const pageSize = searchParams.get('pageSize') || '20';
  const searchTerm = searchParams.get('searchTerm') || undefined;
  const categoryName = searchParams.get('categoryName') || undefined;
  const isActive = searchParams.get('isActive') || undefined;

  const {
    data: packageTypesListData,
    isLoading,
    isFetching,
    isError
  } = useGetPackageTypeQuery({
    pageNumber: Number(page) || 1,
    pageSize: Number(pageSize) || 20,
    isActive: isActive === 'true' ? true : isActive === 'false' ? false : undefined,
    categoryName: categoryName,
    searchTerm: searchTerm
  });

  const { columns, filterColumns, renderCreateButton } = usePackagesTypesTableColumns();

  const handleClearFiltersPress = () => {
    router.push(`${pathname}`);
  };

  const handleExcelExportButton = async () => {
    const loadingToast = toast.loading('Excel dosyası hazırlanıyor...');
    try {
      const allData = await PackageTypeApi.getManagementPackageType({
        pageNumber: Number(page) || 1,
        pageSize: Number(pageSize) || 20,
        isActive: isActive === 'true' ? true : isActive === 'false' ? false : undefined,
        categoryName: categoryName,
        searchTerm: searchTerm
      });
      await exportPackageTypesExcel(allData?.data || [], searchParams);
    } catch (e) {
      toast.error('Excel dosyası oluşturulurken bir hata oluştu.');
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  return (
    <div className="w-full overflow-auto">
      <DataTable
        title={'Paket Tipleri'}
        tableName={DataTableName.PackagesTypesTable}
        data={packageTypesListData?.data || []}
        columns={columns}
        filterColumns={filterColumns}
        isLoading={isLoading || isFetching}
        isError={isError}
        pageCount={packageTypesListData?.pageSize || 0}
        totalCount={packageTypesListData?.totalCount || 0}
        clearFiltersPress={handleClearFiltersPress}
        handleExcelExportButton={handleExcelExportButton}
        renderCreateButton={renderCreateButton}
      />
    </div>
  );
}
