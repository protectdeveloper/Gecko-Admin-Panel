'use client';

import React, { useEffect, useState } from 'react';
import { DataTable } from '@/components/table/DataTable';
import LastJobsCard from '@/features/Dashboard/LastJobsCard';
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
  useGetManagementAnalyticsMessageCreditQuery,
  useGetManagementAnalyticsTotalsQuery
} from '@/api/Analytics/Analytics.hook';

const HomePage = () => {
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
              isLoading={isAnalyticsTotalsLoading}
              onRefresh={() => {
                setForceRefresh(false);
                setTimeout(() => setForceRefresh(true), 0);
              }}
            />
            <TotalCountCard
              title="Toplam Kullanıcı Sayısı"
              count={analyticsTotalsData?.data.totalUsers || 0}
              icon={<UsersRound size={45} className="text-muted-foreground" />}
              isLoading={isAnalyticsTotalsLoading}
              onRefresh={() => {
                setForceRefresh(false);
                setTimeout(() => setForceRefresh(true), 0);
              }}
            />
            <TotalCountCard
              title="Toplam Makine Sayısı"
              count={analyticsTotalsData?.data.totalMachines || 0}
              icon={<MonitorCog size={45} className="text-muted-foreground" />}
              isLoading={isAnalyticsTotalsLoading}
              onRefresh={() => {
                setForceRefresh(false);
                setTimeout(() => setForceRefresh(true), 0);
              }}
            />
            <TotalCountCard
              title="Toplam Kalan SMS / E-posta Sayısı"
              count={analyticsMessageCreditData?.data?.creditAmount || 0}
              icon={<Mails size={45} className="text-muted-foreground" />}
              isLoading={isAnalyticsMessageCreditLoading}
              onRefresh={() => {
                setForceRefresh(false);
                setTimeout(() => setForceRefresh(true), 0);
              }}
            />
          </div>

          <div className="grid grid-cols-1 gap-4">
            <TotalTransitionCardStatistic />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
            <RabbitmqInfoCard className="h-[400px] overflow-auto" />
            <MicroservicesStatusCard className="h-[400px] overflow-auto" />
            <LastJobsCard className="h-[400px] overflow-auto" />
          </div>
        </div>

        <div className="xl:col-span-3 flex flex-col sm:flex-row xl:flex-col gap-4 xl:h-[965px] min-h-0">
          <ExpiringCompaniesCard className="flex-1 h-[400px] xl:min-h-0" />
          <SupportRequestsCard className="flex-1 h-[400px] xl:min-h-0" />
        </div>
      </div>

      <div className="w-full grid grid-cols-1 xl:grid-cols-12 gap-4">
        <div className="xl:col-span-9">
          <DataTable
            tableName={DataTableName.DashboardTable}
            title={'Admin Logları'}
            data={[]}
            columns={[]}
            filterColumns={[]}
            totalCount={0}
            pageCount={1}
          />
        </div>

        <div className="xl:col-span-3">
          <LastUserLogsCard className="h-[715px] xl:min-h-0" />
        </div>
      </div>
    </div>
  );
};
export default HomePage;
