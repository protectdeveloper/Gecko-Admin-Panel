'use client';
import { cn } from '@/lib/utils';
import React, { useState } from 'react';
import { ArrowRightLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface Props {
  className?: string;
}

const LastJobsCard = ({ className = '' }: React.PropsWithChildren<Props>) => {
  const [forceRefresh, setForceRefresh] = useState(false);

  return (
    <Card className={cn(`p-4 gap-3`, className)}>
      <CardHeader className="p-0">
        <CardTitle className="flex flex-col gap-0 p-0">
          <div className="flex items-start justify-between gap-2">
            <span>Son Çalışan Görevler</span>

            <Button size="icon" variant="outline" className="p-1.5 w-min h-min" onClick={() => setForceRefresh(!forceRefresh)}>
              <ArrowRightLeft size={20} />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="w-full p-0"></CardContent>
    </Card>
  );
};

export default LastJobsCard;
