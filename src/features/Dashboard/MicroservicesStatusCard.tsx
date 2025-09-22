import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useGetManagementAnalyticsMicroservicesHealthQuery } from '@/api/Analytics/Analytics.hook';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';

interface Props {
  className?: string;
}

const MicroservicesStatusCard = ({ className }: Props) => {
  const { data: microservicesHealth, isLoading } = useGetManagementAnalyticsMicroservicesHealthQuery({
    forceRefresh: false
  });

  if (isLoading) {
    return (
      <Card className={cn('p-4 gap-3', className)}>
        <CardHeader className="p-0">
          <CardTitle className="flex items-center justify-between">Micro Servisler ve Durumu</CardTitle>
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
    <Card className={cn(`p-4 gap-3`, className)}>
      <CardHeader className="p-0">
        <CardTitle className="flex items-center justify-between gap-2">
          <span>Micro Servisler ve Durumu</span>

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
