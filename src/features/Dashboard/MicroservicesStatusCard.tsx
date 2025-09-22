'use client';
import { cn } from '@/lib/utils';
import { ArrowRightLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useGetManagementAnalyticsMicroservicesHealthQuery } from '@/api/Analytics/Analytics.hook';

interface Props {
  className?: string;
}

const MicroservicesStatusCard = ({ className }: Props) => {
  const [forceRefresh, setForceRefresh] = useState(false);

  const {
    data: microservicesHealth,
    refetch,
    isLoading
  } = useGetManagementAnalyticsMicroservicesHealthQuery({
    forceRefresh: forceRefresh
  });

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
              <span>Micro Servisler ve Durumu</span>

              <Skeleton className="h-7 w-7 rounded-md" />
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Skeleton className="h-5 w-1/4 rounded-md" />
              <Skeleton className="h-5 w-1/4 rounded-md" />
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className="w-full flex flex-col overflow-scroll gap-4 p-0">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="p-4 space-y-3 border rounded-lg bg-accent/5">
              <div className="flex items-center justify-between gap-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-5 w-1/4" />
              </div>

              <div className="flex items-center justify-between gap-3">
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn(`p-4 gap-3`, className)}>
      <CardHeader className="p-0">
        <CardTitle className="flex flex-col gap-0 p-0">
          <div className="flex items-start justify-between gap-2">
            <span>Micro Servisler ve Durumu</span>

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

          <div className="flex items-center gap-2 text-sm">
            <Badge variant="default" className="bg-green-800 text-white">
              {microservicesHealth?.data?.healthyServices || '0'} Sağlıklı
            </Badge>
            /
            <Badge variant="default" className=" bg-red-800 text-white">
              {microservicesHealth?.data?.unhealthyServices || '0'} Sağlıksız
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="w-full h-full flex flex-col gap-3 p-0 overflow-scroll">
        {microservicesHealth?.data?.services?.map((service, index) => (
          <div key={index} className="p-4 space-y-1 border rounded-lg transition-shadow">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-base font-semibold">{service.serviceName}</h3>
              <Badge
                variant="default"
                className={cn('font-medium', service?.isHealthy ? 'bg-green-800 text-white' : 'bg-red-800 text-white')}
              >
                {service.isHealthy ? 'Sağlıklı' : 'Sağlıksız'}
              </Badge>
            </div>

            <div className="flex flex-col items-start justify-center gap-1">
              <p className="text-sm text-muted-foreground">URL: {service.serviceUrl || 'Bilinmiyor'}</p>
              <p className="text-sm text-muted-foreground">Response Time: {service.responseTimeMs || 'Bilinmiyor'}ms</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default MicroservicesStatusCard;
