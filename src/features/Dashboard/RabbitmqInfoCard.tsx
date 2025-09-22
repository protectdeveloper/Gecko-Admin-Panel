import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useGetManagementAnalyticsRabbitMQQueuesQuery } from '@/api/Analytics/Analytics.hook';
import { Badge } from '@/components/ui/badge';

interface Props {
  className?: string;
}

const RabbitmqInfoCard = ({ className }: Props) => {
  const { data: rabbitmqData, isLoading } = useGetManagementAnalyticsRabbitMQQueuesQuery({
    forceRefresh: false
  });

  return (
    <Card className={cn(`p-4 gap-3`, className)}>
      <CardHeader className="p-0">
        <CardTitle>Rabbitmq Kuyruk ve Dinleyici Bilgisi</CardTitle>
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
      </CardContent>
    </Card>
  );
};

export default RabbitmqInfoCard;
