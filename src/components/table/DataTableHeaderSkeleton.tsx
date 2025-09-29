import React from 'react';
import { Skeleton } from '../ui/skeleton';

const DataTableHeaderSkeleton = () => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <Skeleton className="h-6 w-1/2 md:w-1/5" />
      <div className="flex items-center gap-2">
        <Skeleton className="h-8 w-9 md:w-36 rounded-md" />
        <Skeleton className="h-8 w-9 md:w-24 rounded-md" />
        <Skeleton className="h-8 w-9 md:w-16 rounded-md" />
      </div>
    </div>
  );
};

export default DataTableHeaderSkeleton;
