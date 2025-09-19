import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Calendar, Package } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { formatDateWithTime } from '@/utils/formatTime';
import { Skeleton } from '@/components/ui/skeleton';

interface Props {
  className?: string;
}

const ExpiringCompaniesCard = ({ className }: Props) => {
  const companiesData = [
    { id: '1', name: 'Firma A', lastPaymentDate: '2024-07-10', packageName: 'Pro' },
    { id: '2', name: 'Firma B', lastPaymentDate: '2024-07-12', packageName: 'Basic' },
    { id: '3', name: 'Firma C', lastPaymentDate: '2024-07-15', packageName: 'Enterprise' },
    { id: '4', name: 'Firma D', lastPaymentDate: '2024-07-18', packageName: 'Pro' },
    { id: '5', name: 'Firma E', lastPaymentDate: '2024-07-20', packageName: 'Basic' }
  ];

  let isLoading = false;

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
          <Badge variant="outline" className="font-medium">
            Son 5
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="w-full h-full flex flex-col gap-4 p-0 overflow-scroll">
        {companiesData?.map((item, index) => (
          <div key={index} className="flex justify-between p-4 space-y-1 border rounded-lg transition-shadow">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold tracking-wide">#{item.id}</span>
              <span className="text-sm font-bold truncate group-hover:underline">{item.name}</span>
            </div>

            <div className="flex flex-col items-end gap-2">
              <span className="flex items-center gap-1 text-xs font-medium text-white bg-chart-2 dark:bg-amber-700 px-2 py-0.5 rounded-full">
                <Calendar size={13} className="text-white" />
                {formatDateWithTime(item.lastPaymentDate)}
              </span>
              <span className="flex items-center gap-1 text-xs font-medium text-white bg-chart-3 dark:bg-green-700 px-2 py-0.5 rounded-full">
                <Package size={13} className="text-white" />
                {item.packageName}
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ExpiringCompaniesCard;
