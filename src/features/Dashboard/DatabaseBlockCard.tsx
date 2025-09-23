'use client';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRightLeft, Info } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useGetManagementAnalyticsDatabaseBlockAnalysisQuery } from '@/api/Analytics/Analytics.hook';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface Props {
  className?: string;
}

const DatabaseBlockCard = ({ className }: Props) => {
  const [forceRefresh, setForceRefresh] = useState(false);

  const { data: databaseBlockData, refetch, isLoading } = useGetManagementAnalyticsDatabaseBlockAnalysisQuery({});

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
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/3" />
              </div>

              <Skeleton className="w-full h-12" />
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
          <div className="flex items-start justify-between gap-2">
            <span>Veritabanı Bloklanan Sorgular</span>

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

          <div className="flex items-center gap-2 text-sm"></div>
        </CardTitle>
      </CardHeader>

      <CardContent className="w-full h-full flex flex-col gap-3 p-0 overflow-scroll">
        {databaseBlockData?.data?.map((item, index) => (
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
              <span className="text-sm text-muted-foreground">
                Toplam Bloklanan Sorgu: <span className="font-medium text-foreground">{item.blockedSessions.length}</span>
              </span>
            </div>

            {item?.blockedSessions.length > 0 && (
              <Accordion type="single" className="flex flex-col gap-3 pt-2 overflow-scroll max-h-[230px]" collapsible>
                {item?.blockedSessions.map((session, sIndex) => (
                  <AccordionItem key={sIndex} value={`item-${sIndex}`} className="border last:border rounded-lg">
                    <AccordionTrigger className="p-4 bg-accent/50">
                      <div className="flex items-center justify-between w-full">
                        <span className="font-medium">Sorgu ID: {session.sessionId}</span>
                        <Badge variant="secondary" className="text-xs">
                          Status: {session.status}
                        </Badge>
                      </div>
                    </AccordionTrigger>

                    <AccordionContent className="p-4 flex flex-col gap-2">
                      <span className="text-sm text-muted-foreground">
                        Command: <span className="font-medium text-foreground">{session.command}</span>
                      </span>
                      <span className="text-sm text-muted-foreground">
                        Wait Type: <span className="font-medium text-foreground">{session.waitType}</span>
                      </span>
                      <span className="text-sm text-muted-foreground">
                        Last Wait Type: <span className="font-medium text-foreground">{session.lastWaitType}</span>
                      </span>
                      <span className="text-sm text-muted-foreground">
                        Total Elapsed Time: <span className="font-medium text-foreground">{session.totalElapsedTime} ms</span>
                      </span>
                      <span className="text-sm text-muted-foreground line-clamp-1">
                        SQL Text: <span className="font-medium text-foreground">{session.sqlText}</span>
                      </span>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </div>
        ))}

        {(!databaseBlockData || databaseBlockData?.data.length === 0) && (
          <div className="w-full h-full flex flex-col gap-3 items-center justify-center text-sm text-muted-foreground">
            <Info className="text-white bg-primary rounded-full" size={40} />
            <span className="text-sm font-medium">Veri bulunamadı</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DatabaseBlockCard;
