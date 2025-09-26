'use client';

import React from 'react';
import { DataTable } from '@/components/table/DataTable';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { DataTableName } from '@/components/table/DataTable.enum';
import { toast } from 'sonner';
import { exportMachinesExcel } from '@/utils/excelExport';
import { useGetMachinesQuery } from '@/api/Machine/Machine.hook';
import { useMachinesTableColumns } from '@/features/Machines/table/MachinessTable.columns';
import { MachineApi } from '@/api/Machine/Machine.api';

export default function MachinesPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams() || new URLSearchParams();

  const page = searchParams.get('page') || '1';
  const pageSize = searchParams.get('pageSize') || '20';
  const searchTerm = searchParams.get('searchTerm') || undefined;
  const isActive = searchParams.get('isActive') || undefined;
  const isOnline = searchParams.get('isOnline') || undefined;
  const machineTypeId = searchParams.get('machineTypeId') || undefined;
  const ipAddress = searchParams.get('ipAddress') || undefined;
  const serialNumber = searchParams.get('serialNumber') || undefined;

  const {
    data: machinesListData,
    isLoading,
    isFetching,
    isError
  } = useGetMachinesQuery({
    pageNumber: Number(page) || 1,
    pageSize: Number(pageSize) || 20,
    isActive: isActive === 'true' ? true : isActive === 'false' ? false : undefined,
    isOnline: isOnline === 'true' ? true : isOnline === 'false' ? false : undefined,
    searchTerm: searchTerm,
    machineTypeId: machineTypeId,
    ipAddress: ipAddress,
    serialNumber: serialNumber
  });

  const { columns, filterColumns, renderCreateButton } = useMachinesTableColumns();

  const handleClearFiltersPress = () => {
    router.push(`${pathname}`);
  };

  const handleExcelExportButton = async () => {
    const loadingToast = toast.loading('Excel dosyası hazırlanıyor...');
    try {
      const allData = await MachineApi.getManagementMachines({
        pageNumber: Number(page) || 1,
        pageSize: Number(pageSize) || 20,
        isActive: isActive === 'true' ? true : isActive === 'false' ? false : undefined,
        isOnline: isOnline === 'true' ? true : isOnline === 'false' ? false : undefined,
        searchTerm: searchTerm,
        machineTypeId: machineTypeId,
        ipAddress: ipAddress,
        serialNumber: serialNumber
      });
      await exportMachinesExcel(allData?.data || [], searchParams);
    } catch (e) {
      toast.error('Excel dosyası oluşturulurken bir hata oluştu.');
    } finally {
      toast.dismiss(loadingToast);
    }
  };
  return (
    <div className="w-full overflow-auto">
      <DataTable
        title={'Makineler'}
        tableName={DataTableName.MachinesTable}
        data={machinesListData?.data || []}
        columns={columns}
        filterColumns={filterColumns}
        isLoading={isLoading || isFetching}
        isError={isError}
        pageCount={machinesListData?.pageSize || 0}
        totalCount={machinesListData?.totalCount || 0}
        clearFiltersPress={handleClearFiltersPress}
        handleExcelExportButton={handleExcelExportButton}
        renderCreateButton={renderCreateButton}
      />
    </div>
  );
}
