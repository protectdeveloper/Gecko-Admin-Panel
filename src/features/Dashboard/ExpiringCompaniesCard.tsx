import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Calendar, Info, Package } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { formatDateWithTime, formatDayDateWithTime } from '@/utils/formatTime';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetManagementAnalyticsPackagesExpiringQuery } from '@/api/Analytics/Analytics.hook';
import { CustomSelectBox } from '@/components/inputs/CustomSelectBox';

interface Props {
  className?: string;
}

const ExpiringCompaniesCard = ({ className }: Props) => {
  const [lastDayCount, setLastDayCount] = useState('30');

  const { data: packagesExpiringData, isLoading } = useGetManagementAnalyticsPackagesExpiringQuery({
    forceRefresh: false,
    daysAhead: Number(lastDayCount),
    limit: 5
  });

  if (isLoading) {
    return (
      <Card className={cn('p-4 gap-3', className)}>
        <CardHeader className="p-0">
          <CardTitle className="flex items-center justify-between">
            Ödemesi Yaklaşan Firmalar
            <Badge variant="outline" className="font-medium">
              Son 5
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="w-full flex flex-col overflow-scroll gap-4 p-0">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="p-4 space-y-3 border rounded-lg bg-accent/5">
              <div className="flex items-center justify-between gap-3">
                <Skeleton className="h-4 w-1/9" />
                <Skeleton className="h-4 w-1/2" />
              </div>

              <div className="flex items-center justify-between gap-3">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-1/3" />
              </div>
            </div>
          ))}
        </CardContent>{' '}
      </Card>
    );
  }

  return (
    <Card className={cn('p-4 gap-3', className)}>
      <CardHeader className="p-0">
        <CardTitle className="flex items-center justify-between p-0">
          Ödemesi Yaklaşan Firmalar
          <CustomSelectBox
            value={lastDayCount}
            onValueChange={(value) => setLastDayCount(value)}
            data={[
              { label: 'Son 7 Gün', value: '7' },
              { label: 'Son 30 Gün', value: '30' },
              { label: 'Son 90 Gün', value: '90' },
              { label: 'Son 180 Gün', value: '180' }
            ]}
          />
        </CardTitle>
      </CardHeader>

      <CardContent className="w-full h-full flex flex-col gap-3 p-0 overflow-scroll">
        {packagesExpiringData?.data?.expiringPackages?.map((item, index) => (
          <div key={index} className="p-4 space-y-2 border rounded-lg transition-shadow">
            <div className="flex flex-row justify-between gap-1">
              <span className="text-sm font-semibold truncate group-hover:underline">{item.customerName}</span>
              <span className="text-xs font-light tracking-wide">#{item.customerCode}</span>
            </div>

            <div className="flex flex-wrap items-center gap-0 space-x-2 space-y-2">
              <Badge
                variant={'default'}
                className="flex items-center gap-1 text-[11px] font-medium text-white bg-chart-2 dark:bg-amber-700 px-2 py-0.5 rounded-full"
              >
                <Calendar size={13} className="text-white" />
                {formatDayDateWithTime(item.endDate)}
              </Badge>

              <Badge
                variant={'default'}
                className="flex items-center gap-1 text-[11px] font-medium text-white bg-chart-1 dark:bg-blue-700 px-2 py-0.5 rounded-full ml-2"
              >
                {item.daysUntilExpiry} gün kaldı
              </Badge>

              <Badge
                variant={'default'}
                className="flex items-center gap-1 text-[11px] font-medium text-white bg-chart-3 dark:bg-green-700 px-2 py-0.5 rounded-full"
              >
                <Package size={13} className="text-white" />
                {item.packageName}
              </Badge>
            </div>
          </div>
        ))}

        {(!packagesExpiringData || packagesExpiringData?.data.expiringPackages.length === 0) && (
          <div className="w-full h-full flex flex-col gap-3 items-center justify-center text-sm text-muted-foreground">
            <Info className="text-white bg-primary rounded-full" size={40} />
            <span className="text-sm font-medium">Veri bulunamadı</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExpiringCompaniesCard;
