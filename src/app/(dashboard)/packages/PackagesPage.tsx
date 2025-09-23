'use client';

import React from 'react';
import { toast } from 'sonner';
import { DataTable } from '@/components/table/DataTable';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { DataTableName } from '@/components/table/DataTable.enum';
import { exportPackagesExcel } from '@/utils/excelExport';
import { usePackagesTableColumns } from '@/features/Packages/table/PackagesTable.columns';
import { useGetPackageQuery } from '@/api/Package/Package.hook';
import { PackageApi } from '@/api/Package/Package.api';

export default function PackagesPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams() || new URLSearchParams();

  const page = searchParams.get('page') || '1';
  const pageSize = searchParams.get('pageSize') || '20';
  const searchTerm = searchParams.get('searchTerm') || undefined;
  const isActive = searchParams.get('isActive') || undefined;
  const minPrice = searchParams.get('minPrice') || undefined;
  const maxPrice = searchParams.get('maxPrice') || undefined;

  const {
    data: packagesListData,
    isLoading,
    isError
  } = useGetPackageQuery({
    pageNumber: Number(page) || 1,
    pageSize: Number(pageSize) || 20,
    isActive: isActive === 'true' ? true : isActive === 'false' ? false : undefined,
    searchTerm: searchTerm,
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined
  });

  const { columns, filterColumns, renderCreateButton } = usePackagesTableColumns();

  const handleClearFiltersPress = () => {
    router.push(`${pathname}`);
  };

  const handleExcelExportButton = async () => {
    const loadingToast = toast.loading('Excel dosyası hazırlanıyor...');
    try {
      const allData = await PackageApi.getManagementPackage({
        pageNumber: Number(page) || 1,
        pageSize: Number(pageSize) || 20,
        isActive: isActive === 'true' ? true : isActive === 'false' ? false : undefined,
        searchTerm: searchTerm,
        minPrice: minPrice ? Number(minPrice) : undefined,
        maxPrice: maxPrice ? Number(maxPrice) : undefined
      });
      await exportPackagesExcel(allData?.data || [], searchParams);
    } catch (e) {
      toast.error('Excel dosyası oluşturulurken bir hata oluştu.');
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  return (
    <DataTable
      title={'Paketler'}
      tableName={DataTableName.PackagesTable}
      data={packagesListData?.data || []}
      columns={columns}
      filterColumns={filterColumns}
      isLoading={isLoading}
      isError={isError}
      pageCount={packagesListData?.pageSize || 0}
      totalCount={packagesListData?.totalCount || 0}
      clearFiltersPress={handleClearFiltersPress}
      handleExcelExportButton={handleExcelExportButton}
      renderCreateButton={renderCreateButton}
    />
  );
}
