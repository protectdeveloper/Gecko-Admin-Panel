import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
  title?: string;
  count?: number;
  icon?: React.ReactNode;
  isLoading?: boolean;
}

const TotalCountCard = ({ title, count = 0, icon = null, isLoading = false, className }: Props) => {
  if (isLoading) {
    return (
      <Card className={cn('flex flex-col items-center justify-center p-4 gap-5', className)}>
        <CardHeader className="w-full flex justify-center items-center p-0">
          <Skeleton className="h-16 w-16 rounded-full" />
        </CardHeader>

        <CardContent className="w-full flex flex-row items-center text-center justify-center gap-2 p-0">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-5 w-1/4" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn('flex flex-col items-center justify-center p-4 gap-3', className)}>
      <CardHeader className="w-full flex justify-center items-center p-0">{icon}</CardHeader>

      <CardContent className="w-full flex flex-row items-center text-center justify-center p-0">
        <span className="text-muted-foreground">
          {title}: <span className="text-xl text-foreground font-bold">{count}</span>
        </span>
      </CardContent>
    </Card>
  );
};

export default TotalCountCard;
