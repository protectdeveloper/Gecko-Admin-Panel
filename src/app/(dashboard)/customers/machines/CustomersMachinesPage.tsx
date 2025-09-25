'use client';

import React from 'react';
import { DataTable } from '@/components/table/DataTable';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { DataTableName } from '@/components/table/DataTable.enum';
import { toast } from 'sonner';
import { exportCustomersMachinesExcel } from '@/utils/excelExport';
import { useCustomersMachinesTableColumns } from '@/features/CustomersMachines/table/CustomersMachinesTable.columns';
import { useGetCustomerMachineQuery } from '@/api/CustomerMachine/CustomerMachine.hook';
import { CustomerMachineApi } from '@/api/CustomerMachine/CustomerMachine.api';

export default function CustomersMachinesPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams() || new URLSearchParams();

  const page = searchParams.get('page') || '1';
  const pageSize = searchParams.get('pageSize') || '20';
  const searchTerm = searchParams.get('searchTerm') || '';
  const assemblyName = searchParams.get('assemblyName') || '';
  const machineName = searchParams.get('machineName') || undefined;
  const customerId = searchParams.get('customerId') || undefined;
  const isActive = searchParams.get('isActive') || undefined;
  const isOnline = searchParams.get('isOnline') || undefined;
  const isTasEnabled = searchParams.get('isTasEnabled') || undefined;

  const {
    data: customersMachinesListData,
    isLoading,
    isError
  } = useGetCustomerMachineQuery({
    pageNumber: Number(page) || 1,
    pageSize: Number(pageSize) || 20,
    customerId: customerId,
    machineName: machineName,
    assemblyName: assemblyName,
    searchTerm: searchTerm,
    isActive: isActive === 'true' ? true : isActive === 'false' ? false : undefined,
    isOnline: isOnline === 'true' ? true : isOnline === 'false' ? false : undefined,
    isTasEnabled: isTasEnabled === 'true' ? true : isTasEnabled === 'false' ? false : undefined
  });

  const { columns, filterColumns, renderCreateButton } = useCustomersMachinesTableColumns();

  const handleClearFiltersPress = () => {
    router.push(`${pathname}`);
  };

  const handleExcelExportButton = async () => {
    const loadingToast = toast.loading('Excel dosyası hazırlanıyor...');
    try {
      const allData = await CustomerMachineApi.getManagementCustomerMachine({
        pageNumber: Number(page) || 1,
        pageSize: Number(pageSize) || 20,
        customerId: customerId,
        machineName: machineName,
        assemblyName: assemblyName,
        searchTerm: searchTerm,
        isActive: isActive === 'true' ? true : isActive === 'false' ? false : undefined,
        isOnline: isOnline === 'true' ? true : isOnline === 'false' ? false : undefined,
        isTasEnabled: isTasEnabled === 'true' ? true : isTasEnabled === 'false' ? false : undefined
      });
      await exportCustomersMachinesExcel(allData?.data || [], searchParams);
    } catch (e) {
      toast.error('Excel dosyası oluşturulurken bir hata oluştu.');
    } finally {
      toast.dismiss(loadingToast);
    }
  };
  return (
    <DataTable
      title={'Firma Makineleri'}
      tableName={DataTableName.CustomersMachinesTable}
      data={customersMachinesListData?.data || []}
      columns={columns}
      filterColumns={filterColumns}
      isLoading={isLoading}
      isError={isError}
      pageCount={customersMachinesListData?.pageSize || 0}
      totalCount={customersMachinesListData?.totalCount || 0}
      clearFiltersPress={handleClearFiltersPress}
      handleExcelExportButton={handleExcelExportButton}
      renderCreateButton={renderCreateButton}
    />
  );
}
