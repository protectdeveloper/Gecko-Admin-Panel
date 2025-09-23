'use client';
import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react';
import { ArrowRightLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useGetManagementAnalyticsCustomersDatabaseSizesQuery } from '@/api/Analytics/Analytics.hook';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';

interface Props {
  className?: string;
}

const DatabaseSizesCard = ({ className }: Props) => {
  const [forceRefresh, setForceRefresh] = useState(false);

  const { data: databaseSizeData, refetch, isLoading } = useGetManagementAnalyticsCustomersDatabaseSizesQuery({ forceRefresh });

  useEffect(() => {
    if (forceRefresh) {
      refetch();
      setForceRefresh(false);
    }
  }, [forceRefresh, refetch]);

  if (isLoading) {
    return (
      <Card className={cn('p-4 gap-3', className)}>
        <CardHeader className="p-0">
          <CardTitle className="flex flex-col gap-0 p-0">
            <div className="flex items-start justify-between gap-2">
              <span>Veritabanı Boyutları</span>

              <Skeleton className="h-7 w-7 rounded-md" />
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className="w-full flex flex-col overflow-scroll gap-4 p-0">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="p-4 space-y-3 border rounded-lg bg-accent/5">
              <div className="flex items-center justify-between gap-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-5 w-1/5" />
              </div>

              <div className="flex flex-col gap-3">
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-full" />
              </div>

              <div className="flex flex-row gap-2 w-full">
                <Skeleton className="w-20 h-4" />
                <Skeleton className="w-20 h-4" />
                <Skeleton className="w-20 h-4" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn(`p-4 gap-3`, className)}>
      <CardHeader className="p-0 gap-0">
        <CardTitle className="flex flex-col gap-0 p-0">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <span>Veritabanı Boyutları</span>

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
        </CardTitle>
      </CardHeader>

      <CardContent className="w-full h-full flex flex-col gap-3 p-0 overflow-scroll">
        {databaseSizeData?.data?.map((item, index) => (
          <div key={index} className="p-4 space-y-1 border rounded-lg transition-shadow">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-base font-semibold">{item.customerName}</h3>
              <Badge
                variant="default"
                className={cn('font-medium', item?.isConnected ? 'bg-green-800 text-white' : 'bg-red-800 text-white')}
              >
                {item.isConnected ? 'Bağlı' : 'Bağlı Değil'}
              </Badge>
            </div>

            <div className="flex flex-col items-start justify-center gap-1">
              <span className="text-sm text-muted-foreground">
                DB Name: <span className="font-medium text-foreground">{item.databaseName || 'Bilinmiyor'}</span>
              </span>
              <span className="text-sm text-muted-foreground">
                Server Name: <span className="font-medium text-foreground">{item.serverName || 'Bilinmiyor'}</span>
              </span>
            </div>

            <div className="flex flex-wrap gap-2 space-x-0 space-y-0 pt-2">
              <Badge variant="secondary" className="bg-purple-800 text-white h-6">
                Log Size: {item.logSizeGB ? item.logSizeGB.toFixed(2) + ' GB' : 'Bilinmiyor'}
              </Badge>
              <Badge variant="secondary" className="bg-blue-800 text-white h-6">
                Database Size: {item.databaseSizeGB ? item.databaseSizeGB.toFixed(2) + ' GB' : 'Bilinmiyor'}
              </Badge>
              <Badge variant="secondary" className="bg-green-800 text-white h-6">
                Data Size: {item.dataSizeGB ? item.dataSizeGB.toFixed(2) + ' GB' : 'Bilinmiyor'}
              </Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default DatabaseSizesCard;
