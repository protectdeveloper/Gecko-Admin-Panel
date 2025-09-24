'use client';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDayDateWithTime } from '@/utils/formatTime';
import { CustomSelectBox } from '@/components/inputs/CustomSelectBox';
import { ArrowRightLeft, Calendar, Info, Package } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useGetManagementAnalyticsPackagesExpiringQuery } from '@/api/Analytics/Analytics.hook';

interface Props {
  className?: string;
}

const ExpiringCompaniesCard = ({ className }: Props) => {
  const [lastDayCount, setLastDayCount] = useState('30');
  const [forceRefresh, setForceRefresh] = useState(false);

  const {
    data: packagesExpiringData,
    refetch,
    isLoading
  } = useGetManagementAnalyticsPackagesExpiringQuery({
    forceRefresh: forceRefresh,
    daysAhead: Number(lastDayCount),
    limit: 5
  });

  useEffect(() => {
    if (forceRefresh) {
      refetch();
      setForceRefresh(false);
    }
  }, [forceRefresh, refetch]);

  if (isLoading || forceRefresh) {
    return (
      <Card className={cn('p-4 gap-3', className)}>
        <CardHeader className="p-0 gap-0">
          <CardTitle className="flex flex-col gap-1 p-0">
            <div className="flex flex-row items-start justify-between gap-0">
              <span>Ödemesi Yaklaşan Firmalar</span>
              <Skeleton className="h-7 w-7 rounded-md" />
            </div>

            <Skeleton className="h-7 w-1/2 rounded-md" />
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
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn('p-4 gap-3', className)}>
      <CardHeader className="p-0 gap-0">
        <CardTitle className="flex flex-col gap-0 p-0">
          <div className="flex flex-row items-start justify-between gap-0">
            <span>Ödemesi Yaklaşan Firmalar</span>
            <Button
              size="icon"
              variant="outline"
              className="p-1.5 w-min h-min"
              onClick={() => setForceRefresh(true)}
              disabled={isLoading}
            >
              <ArrowRightLeft size={20} />
            </Button>
          </div>

          <CustomSelectBox
            value={lastDayCount}
            onValueChange={(value) => setLastDayCount(value)}
            height={'35px'}
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
