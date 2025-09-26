'use client';

import React from 'react';
import { toast } from 'sonner';
import { DataTable } from '@/components/table/DataTable';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { DataTableName } from '@/components/table/DataTable.enum';
import { usePackagesContentTableColumns } from '@/features/PackagesContent/table/PackagesContentTable.columns';
import { PackageContentApi } from '@/api/PackageContent/PackageContent.api';
import { exportPackageContentExcel } from '@/utils/excelExport';
import { useGetPackageContentQuery } from '@/api/PackageContent/PackageContent.hook';

export default function PackagesContentPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams() || new URLSearchParams();

  const page = searchParams.get('page') || '1';
  const pageSize = searchParams.get('pageSize') || '20';
  const packageId = searchParams.get('packageId') || undefined;
  const packageTypeId = searchParams.get('packageTypeId') || undefined;

  const {
    data: packageContentListData,
    isLoading,
    isError
  } = useGetPackageContentQuery({
    pageNumber: Number(page) || 1,
    pageSize: Number(pageSize) || 20,
    packageId: packageId,
    packageTypeId: packageTypeId
  });

  const { columns, filterColumns, renderCreateButton } = usePackagesContentTableColumns();

  const handleClearFiltersPress = () => {
    router.push(`${pathname}`);
  };

  const handleExcelExportButton = async () => {
    const loadingToast = toast.loading('Excel dosyası hazırlanıyor...');
    try {
      const allData = await PackageContentApi.getManagementPackageContent({
        pageNumber: Number(page) || 1,
        pageSize: Number(pageSize) || 20,
        packageId: packageId,
        packageTypeId: packageTypeId
      });
      await exportPackageContentExcel(allData?.data || [], searchParams);
    } catch (e) {
      toast.error('Excel dosyası oluşturulurken bir hata oluştu.');
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  return (
    <div className="w-full overflow-auto">
      <DataTable
        title={'Paket İçerikleri'}
        tableName={DataTableName.PackagesContentTable}
        data={packageContentListData?.data || []}
        columns={columns}
        filterColumns={filterColumns}
        isLoading={isLoading}
        isError={isError}
        pageCount={packageContentListData?.pageSize || 0}
        totalCount={packageContentListData?.totalCount || 0}
        clearFiltersPress={handleClearFiltersPress}
        handleExcelExportButton={handleExcelExportButton}
        renderCreateButton={renderCreateButton}
      />
    </div>
  );
}
