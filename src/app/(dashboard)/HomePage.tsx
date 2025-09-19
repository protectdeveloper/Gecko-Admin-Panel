'use client';

import React from 'react';
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

const HomePage = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full grid grid-cols-1 xl:grid-cols-12 gap-4">
        <div className="xl:col-span-9 space-y-4">
          <div className="grid grid-cols-1 min-h-32 min-[400px]:grid-cols-2 xl:grid-cols-4 gap-4">
            <TotalCountCard
              title="Toplam Firma Sayısı"
              count={20}
              icon={<Building2 size={45} className="text-muted-foreground" />}
            />
            <TotalCountCard
              title="Toplam Kullanıcı Sayısı"
              count={150}
              icon={<UsersRound size={45} className="text-muted-foreground" />}
            />
            <TotalCountCard
              title="Toplam Makine Sayısı"
              count={100}
              icon={<MonitorCog size={45} className="text-muted-foreground" />}
            />
            <TotalCountCard
              title="Toplam Kalan SMS / E-posta Sayısı"
              count={50}
              icon={<Mails size={45} className="text-muted-foreground" />}
            />
          </div>

          <div className="grid grid-cols-1 gap-4">
            <TotalTransitionCardStatistic />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 h-[300px]">
            <RabbitmqInfoCard className="h-full" />
            <MicroservicesStatusCard className="h-full" />
            <LastJobsCard className="h-full" />
          </div>
        </div>

        <div className="xl:col-span-3 flex flex-col sm:flex-row xl:flex-col gap-4 xl:h-[865px] min-h-0">
          <ExpiringCompaniesCard className="flex-1 md:h-[400px] xl:min-h-0" />
          <SupportRequestsCard className="flex-1 md:h-[400px] xl:min-h-0" />
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
