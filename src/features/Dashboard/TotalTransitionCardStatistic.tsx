'use client';

import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { getMonthIndex, getMonths } from '@/utils/chartFunctions';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetManagementAnalyticsPassesStatisticsQuery } from '@/api/Analytics/Analytics.hook';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Skeleton } from '@/components/ui/skeleton';

const TotalTransitionCardStatistic = () => {
  const { t } = useTranslation();
  const [view, setView] = React.useState('daily');
  let chartData: Array<{ day?: string; month?: string; desktop: number }> = [];

  const now = new Date();
  let startDate = '';
  let endDate = '';

  if (view === 'daily') {
    // Last 7 days
    const end = new Date(now);
    const start = new Date(now);
    start.setDate(end.getDate() - 6); // 7 days including today
    startDate = start.toISOString().slice(0, 10);
    endDate = end.toISOString().slice(0, 10);
  } else if (view === 'weekly') {
    // Last 8 weeks
    const end = new Date(now);
    const start = new Date(now);
    start.setDate(end.getDate() - 7 * 7); // 8 weeks (7*8=56 days, but 7*7=49 for last 8 full weeks)
    startDate = start.toISOString().slice(0, 10);
    endDate = end.toISOString().slice(0, 10);
  } else if (view === 'monthly') {
    // This year
    const year = now.getFullYear();
    startDate = `${year}-01-01`;
    endDate = `${year}-12-31`;
  }

  const monthsLabels = getMonths(t);

  const { data: passesStatisticsData, isLoading: isPassesStatisticsLoading } = useGetManagementAnalyticsPassesStatisticsQuery({
    forceRefresh: false,
    startDate: startDate,
    endDate: endDate,
    groupBy: view as 'daily' | 'weekly' | 'monthly'
  });

  if (view === 'monthly' && passesStatisticsData?.data) {
    chartData = monthsLabels?.map((month, index) => {
      const item = passesStatisticsData?.data.statistics.find((d: any) => {
        const monthIndex = getMonthIndex(d?.period);
        return monthIndex === index;
      });
      return {
        date: month,
        desktop: Math.max(0, Number(item?.passCount) || 0)
      };
    });
  } else if (view === 'daily' && passesStatisticsData?.data) {
    chartData = passesStatisticsData?.data?.statistics?.map((item: any) => ({
      date: item?.periodLabel,
      desktop: Math.max(0, Number(item?.passCount) || 0)
    }));
  } else if (view === 'weekly' && passesStatisticsData?.data) {
    chartData = passesStatisticsData?.data?.statistics?.map((item: any) => ({
      date: item?.periodLabel,
      desktop: Math.max(0, Number(item?.passCount) || 0)
    }));
  } else {
    chartData = [];
  }

  const handleTabChange = (value: string) => {
    setView(value);
  };

  const chartConfig = {
    desktop: {
      label: 'Geçiş Sayısı',
      color: 'var(--chart-1)'
    }
  } satisfies ChartConfig;

  if (isPassesStatisticsLoading) {
    return (
      <Card className="p-4 gap-3">
        <CardHeader className="flex items-center gap-2 p-0">
          <div className="grid flex-1 gap-1">
            <CardTitle>Toplam Geçiş Sayısı İstatistiği</CardTitle>
          </div>
          <Tabs value={view} onValueChange={handleTabChange} className="space-x-1">
            <TabsList>
              <TabsTrigger value="daily" className="px-3">
                Günlük
              </TabsTrigger>
              <TabsTrigger value="weekly" className="px-3">
                Haftalık
              </TabsTrigger>
              <TabsTrigger value="monthly" className="px-3">
                Aylık
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>

        <CardContent className="p-0 flex items-center justify-center h-[300px]">
          <Skeleton className="h-full w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <CardHeader className="flex items-center gap-2 p-0">
        <div className="grid flex-1 gap-1">
          <CardTitle>Toplam Geçiş Sayısı İstatistiği</CardTitle>
        </div>
        <Tabs value={view} onValueChange={handleTabChange} className="space-x-1">
          <TabsList>
            <TabsTrigger value="daily" className="px-3">
              Günlük
            </TabsTrigger>
            <TabsTrigger value="weekly" className="px-3">
              Haftalık
            </TabsTrigger>
            <TabsTrigger value="monthly" className="px-3">
              Aylık
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>

      <CardContent className="p-0">
        <ChartContainer config={chartConfig} className="aspect-auto h-[300px] w-full">
          <AreaChart data={chartData} margin={{ left: 20, right: 20, top: 10, bottom: 0 }}>
            <defs>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-desktop)" stopOpacity={1} />
                <stop offset="95%" stopColor="var(--color-desktop)" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} />

            <XAxis
              dataKey={'date'}
              tickLine={true}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => {
                if (typeof value === 'string') {
                  if (view === 'daily') {
                    return value.slice(0, 6);
                  } else {
                    return value.slice(0, 3);
                  }
                }
                return value;
              }}
            />

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    const parsed = Date.parse(value);
                    if (!isNaN(parsed)) {
                      const date = new Date(parsed);
                      return date.toLocaleDateString('tr', {
                        month: 'short',
                        day: 'numeric'
                      });
                    }
                    return value;
                  }}
                  indicator="dot"
                  className="w-36"
                />
              }
            />
            <Area dataKey="desktop" type="bumpX" fill="url(#fillMobile)" stroke="var(--color-desktop)" />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default TotalTransitionCardStatistic;
