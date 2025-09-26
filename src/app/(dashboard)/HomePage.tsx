'use client';

import React, { useEffect, useState } from 'react';
import { DataTable } from '@/components/table/DataTable';
import TotalCountCard from '@/features/Dashboard/TotalCountCard';
import { DataTableName } from '@/components/table/DataTable.enum';
import LastUserLogsCard from '@/features/Dashboard/LastUserLogsCard';
import RabbitmqInfoCard from '@/features/Dashboard/RabbitmqInfoCard';
import { Building2, Mails, MonitorCog, UsersRound } from 'lucide-react';
import SupportRequestsCard from '@/features/Dashboard/SupportRequestsCard';
import ExpiringCompaniesCard from '@/features/Dashboard/ExpiringCompaniesCard';
import MicroservicesStatusCard from '@/features/Dashboard/MicroservicesStatusCard';
import TotalTransitionCardStatistic from '@/features/Dashboard/TotalTransitionCardStatistic';
import {
  useGetManagementAnalyticsAdminLogsQuery,
  useGetManagementAnalyticsMessageCreditQuery,
  useGetManagementAnalyticsTotalsQuery
} from '@/api/Analytics/Analytics.hook';
import { useDashboardAdminLogsTableColumns } from '@/features/Dashboard/table/DashboardAdminLogsTable.columns';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import DatabaseSizesCard from '@/features/Dashboard/DatabaseSizesCard';
import DatabaseBlockCard from '@/features/Dashboard/DatabaseBlockCard';
import MqttMessageCard from '@/features/Dashboard/MqttMessageCard';

const HomePage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams() || new URLSearchParams();

  const page = searchParams.get('page') || '1';
  const pageSize = searchParams.get('pageSize') || '20';
  const searchTerm = searchParams.get('searchTerm') || undefined;
  const requestMethod = searchParams.get('requestMethod') || undefined;
  const sortColumn = searchParams.get('sortColumn') || undefined;
  const sortDesc = searchParams.get('sortDesc') || undefined;

  const [forceRefresh, setForceRefresh] = useState(false);

  const {
    data: analyticsTotalsData,
    isLoading: isAnalyticsTotalsLoading,
    refetch: refetchTotals
  } = useGetManagementAnalyticsTotalsQuery({ forceRefresh });

  const {
    data: analyticsMessageCreditData,
    isLoading: isAnalyticsMessageCreditLoading,
    refetch: refetchMessageCredit
  } = useGetManagementAnalyticsMessageCreditQuery({ forceRefresh });

  const {
    data: adminLogsData,
    isLoading: isAdminLogsLoading,
    isFetching: isAdminLogsFetching,
    isError: isAdminLogsError
  } = useGetManagementAnalyticsAdminLogsQuery({
    pageNumber: Number(page) || 1,
    pageSize: Number(pageSize) || 20,
    requestMethod: requestMethod === 'all' ? undefined : requestMethod,
    searchTerm: searchTerm || undefined,
    sortBy: sortColumn || undefined,
    sortOrder: sortDesc === 'true' ? 'desc' : sortDesc === 'false' ? 'asc' : undefined
  });

  const handleClearFiltersPress = () => {
    router.push(`${pathname}`);
  };

  const { columns, filterColumns } = useDashboardAdminLogsTableColumns();

  useEffect(() => {
    if (forceRefresh) {
      refetchTotals();
      refetchMessageCredit();
      setForceRefresh(false);
    }
  }, [forceRefresh]);

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full grid grid-cols-1 xl:grid-cols-12 gap-4">
        <div className="xl:col-span-9 space-y-4">
          <div className="grid grid-cols-1 min-h-32 min-[400px]:grid-cols-2 xl:grid-cols-4 gap-4">
            <TotalCountCard
              title="Toplam Firma Sayısı"
              count={analyticsTotalsData?.data.totalCustomers || 0}
              icon={<Building2 size={45} className="text-muted-foreground" />}
              isLoading={isAnalyticsTotalsLoading || forceRefresh}
              onRefresh={() => {
                setForceRefresh(false);
                setTimeout(() => setForceRefresh(true), 0);
              }}
            />

            <TotalCountCard
              title="Toplam Kullanıcı Sayısı"
              count={analyticsTotalsData?.data.totalUsers || 0}
              icon={<UsersRound size={45} className="text-muted-foreground" />}
              isLoading={isAnalyticsTotalsLoading || forceRefresh}
              onRefresh={() => {
                setForceRefresh(false);
                setTimeout(() => setForceRefresh(true), 0);
              }}
            />
            <TotalCountCard
              title="Toplam Makine Sayısı"
              count={analyticsTotalsData?.data.totalMachines || 0}
              icon={<MonitorCog size={45} className="text-muted-foreground" />}
              isLoading={isAnalyticsTotalsLoading || forceRefresh}
              onRefresh={() => {
                setForceRefresh(false);
                setTimeout(() => setForceRefresh(true), 0);
              }}
            />
            <TotalCountCard
              title="Toplam Kalan SMS / E-posta Sayısı"
              count={analyticsMessageCreditData?.data?.creditAmount || 0}
              icon={<Mails size={45} className="text-muted-foreground" />}
              isLoading={isAnalyticsMessageCreditLoading || forceRefresh}
              onRefresh={() => {
                setForceRefresh(false);
                setTimeout(() => setForceRefresh(true), 0);
              }}
            />
          </div>

          <div className="grid grid-cols-1 gap-4">
            <TotalTransitionCardStatistic />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <RabbitmqInfoCard className="h-[400px] overflow-auto" />
            <DatabaseSizesCard className="h-[400px] overflow-auto" />
            <MicroservicesStatusCard className="h-[400px] overflow-auto" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <DatabaseBlockCard className="h-[400px] overflow-auto" />
            <MqttMessageCard className="h-[400px] overflow-auto" />
          </div>
        </div>

        <div className="xl:col-span-3 flex flex-col lg:flex-row xl:flex-col gap-4 xl:h-[1385px] min-h-0">
          <ExpiringCompaniesCard className="lg:flex-1 h-[400px] xl:min-h-0" />
          <SupportRequestsCard className="lg:flex-1 h-[400px] xl:min-h-0" />
          <LastUserLogsCard className="lg:flex-1 h-[400px] xl:min-h-0" />
        </div>
      </div>

      <DataTable
        tableName={DataTableName.DashboardTable}
        title={'Admin Logları'}
        data={adminLogsData?.data || []}
        columns={columns}
        filterColumns={filterColumns}
        totalCount={adminLogsData?.totalCount || 0}
        pageCount={adminLogsData?.pageSize || 0}
        isLoading={isAdminLogsLoading || isAdminLogsFetching}
        isError={isAdminLogsError}
        clearFiltersPress={handleClearFiltersPress}
        isExcelButtonVisible={false}
      />
    </div>
  );
};
export default HomePage;
