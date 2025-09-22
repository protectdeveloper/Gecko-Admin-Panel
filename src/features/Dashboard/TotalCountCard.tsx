'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowRightLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface Props {
  className?: string;
  title?: string;
  count?: number;
  icon?: React.ReactNode;
  isLoading?: boolean;
  onRefresh?: () => void;
}

const TotalCountCard = ({ title, count = 0, icon = null, isLoading = false, className, onRefresh }: Props) => {
  if (isLoading) {
    return (
      <Card className={cn('flex flex-col items-center justify-center p-4 gap-5 relative', className)}>
        <CardHeader className="w-full flex justify-center items-center p-0">
          <Skeleton className="h-16 w-16 rounded-full" />
          <Skeleton className="h-7 w-7 rounded-md absolute top-3 right-3" />
        </CardHeader>

        <CardContent className="w-full flex flex-row items-center text-center justify-center gap-2 p-0">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-5 w-1/4" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn('flex flex-col items-center justify-center p-4 gap-3 relative', className)}>
      <CardHeader className="w-full flex justify-center items-center p-0">
        {icon}
        <Button
          size="icon"
          variant="outline"
          className="p-1.5 w-min h-min absolute top-3 right-3"
          onClick={onRefresh}
          disabled={isLoading}
        >
          <ArrowRightLeft size={20} />
        </Button>
      </CardHeader>

      <CardContent className="w-full flex flex-row items-center text-center justify-center p-0">
        <span className="text-muted-foreground">
          {title}: <span className="text-xl text-foreground font-bold">{count}</span>
        </span>
      </CardContent>
    </Card>
  );
};

export default TotalCountCard;
