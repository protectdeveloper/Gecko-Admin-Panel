'use client';

import React from 'react';
import { toast } from 'sonner';
import { DataTable } from '@/components/table/DataTable';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { DataTableName } from '@/components/table/DataTable.enum';
import { exportMachinesTypesExcel, exportPackageTypesExcel } from '@/utils/excelExport';
import { PackageTypeApi } from '@/api/PackageType/PackageType.api';
import { useGetMachineTypesQuery } from '@/api/MachineType/MachineType.hook';
import { useMachinesTypesTableColumns } from '@/features/MachinesTypes/table/MachinesTypesTable.columns';
import { MachineTypeApi } from '@/api/MachineType/MachineType.api';

export default function MachinesTypesPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams() || new URLSearchParams();

  const page = searchParams.get('page') || '1';
  const pageSize = searchParams.get('pageSize') || '20';
  const searchTerm = searchParams.get('searchTerm') || undefined;
  const isActive = searchParams.get('isActive') || undefined;

  const {
    data: machineTypesListData,
    isLoading,
    isError
  } = useGetMachineTypesQuery({
    pageNumber: Number(page) || 1,
    pageSize: Number(pageSize) || 20,
    isActive: isActive === 'true' ? true : isActive === 'false' ? false : undefined,
    searchTerm: searchTerm
  });

  const { columns, filterColumns, renderCreateButton } = useMachinesTypesTableColumns();

  const handleClearFiltersPress = () => {
    router.push(`${pathname}`);
  };

  const handleExcelExportButton = async () => {
    const loadingToast = toast.loading('Excel dosyası hazırlanıyor...');
    try {
      const allData = await MachineTypeApi.getManagementMachineTypes({
        pageNumber: Number(page) || 1,
        pageSize: Number(pageSize) || 20,
        isActive: isActive === 'true' ? true : isActive === 'false' ? false : undefined,
        searchTerm: searchTerm
      });
      await exportMachinesTypesExcel(allData?.data || [], searchParams);
    } catch (e) {
      toast.error('Excel dosyası oluşturulurken bir hata oluştu.');
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  return (
    <DataTable
      title={'Makine Tipleri'}
      tableName={DataTableName.MachinesTypesTable}
      data={machineTypesListData?.data || []}
      columns={columns}
      filterColumns={filterColumns}
      isLoading={isLoading}
      isError={isError}
      pageCount={machineTypesListData?.pageSize || 0}
      totalCount={machineTypesListData?.totalCount || 0}
      clearFiltersPress={handleClearFiltersPress}
      handleExcelExportButton={handleExcelExportButton}
      renderCreateButton={renderCreateButton}
    />
  );
}
