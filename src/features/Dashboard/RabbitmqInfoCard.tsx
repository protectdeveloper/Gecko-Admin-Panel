'use client';
import { cn } from '@/lib/utils';
import { ArrowRightLeft, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useGetManagementAnalyticsRabbitMQQueuesQuery } from '@/api/Analytics/Analytics.hook';

interface Props {
  className?: string;
}

const RabbitmqInfoCard = ({ className }: Props) => {
  const [forceRefresh, setForceRefresh] = useState(false);

  const {
    data: rabbitmqData,
    refetch,
    isLoading
  } = useGetManagementAnalyticsRabbitMQQueuesQuery({
    forceRefresh: forceRefresh
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
        <CardHeader className="p-0">
          <CardTitle className="flex flex-col gap-0 p-0">
            <div className="flex items-start justify-between gap-2">
              <span>Rabbitmq Kuyruk ve Dinleyici Bilgisi</span>

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
        <CardTitle className="flex flex-col gap-0 lg:gap-3 2xl:gap-0 p-0">
          <div className="flex items-start justify-between gap-2">
            <span>Rabbitmq Kuyruk ve Dinleyici Bilgisi</span>

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
              {rabbitmqData?.data?.activeQueues || '0'} Aktif
            </Badge>
            /
            <Badge variant="default" className=" bg-red-800 text-white">
              {rabbitmqData?.data?.inactiveQueues || '0'} Pasif
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="w-full h-full flex flex-col gap-3 p-0 overflow-scroll">
        {rabbitmqData?.data?.queues?.map((queue, index) => (
          <div key={index} className="p-4 border rounded-lg transition-shadow">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-base font-semibold">- {queue.name}</h3>
              <Badge
                variant="default"
                className={cn('font-medium', queue?.isActive ? 'bg-green-800 text-white' : 'bg-red-800 text-white')}
              >
                {queue.isActive ? 'Aktif' : 'Pasif'}
              </Badge>
            </div>
            <span className="text-sm text-muted-foreground font-semibold">Consumers Sayısı: {queue.consumers}</span>
          </div>
        ))}

        {(!rabbitmqData || rabbitmqData?.data?.queues?.length === 0) && (
          <div className="w-full h-full flex flex-col gap-3 items-center justify-center text-sm text-muted-foreground">
            <Info className="text-white bg-primary rounded-full" size={40} />
            <span className="text-sm font-medium">Sonuç bulunamadı</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RabbitmqInfoCard;
