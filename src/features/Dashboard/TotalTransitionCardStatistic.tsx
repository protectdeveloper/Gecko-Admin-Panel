'use client';

import * as React from 'react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const TotalTransitionCardStatistic = () => {
  const [view, setView] = React.useState('daily');

  const handleTabChange = (value: string) => {
    setView(value);
  };

  const chartData = [
    { date: '2024-04-01', mobile: 150 },
    { date: '2024-04-02', mobile: 180 },
    { date: '2024-04-03', mobile: 120 },
    { date: '2024-04-04', mobile: 260 },
    { date: '2024-04-05', mobile: 290 },
    { date: '2024-04-06', mobile: 340 },
    { date: '2024-04-07', mobile: 180 },
    { date: '2024-04-08', mobile: 320 },
    { date: '2024-04-09', mobile: 110 },
    { date: '2024-04-10', mobile: 190 },
    { date: '2024-04-11', mobile: 350 },
    { date: '2024-04-12', mobile: 210 },
    { date: '2024-04-13', mobile: 380 }
  ];

  const chartConfig = {
    mobile: {
      label: 'Geçiş Sayısı',
      color: 'var(--chart-1)'
    }
  } satisfies ChartConfig;

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
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-mobile)" stopOpacity={1} />
                <stop offset="95%" stopColor="var(--color-mobile)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString('tr', {
                  month: 'short',
                  day: 'numeric'
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString('tr', {
                      month: 'short',
                      day: 'numeric'
                    });
                  }}
                  indicator="dot"
                  className="w-36"
                />
              }
            />
            <Area dataKey="mobile" type="natural" fill="url(#fillMobile)" stroke="var(--color-mobile)" stackId="a" />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default TotalTransitionCardStatistic;
