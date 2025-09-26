'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { customerDetailTabs } from '@/utils/data';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import TotalCountCard from '@/features/Dashboard/TotalCountCard';
import { ArrowLeftRight, MonitorCog, UsersRound } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import MachinesContent from '@/features/CustomerDetail/tab-contents/MachinesContent';
import ConnectionsContent from '@/features/CustomerDetail/tab-contents/ConnectionContent';

const CustomerDetailPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const tab = searchParams.get('tab') || 'users';
  const customerId = pathname.split('/').pop() || '';

  const onChangeHandler = (value: string, queryName: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    if (value) {
      newSearchParams.set(queryName, value);
    } else {
      newSearchParams.delete(queryName);
    }

    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  return (
    <div className="w-full flex flex-col bg-card p-4 min-h-screen gap-4">
      <div className="grid grid-cols-1 min-h-32 min-[550]:grid-cols-3 gap-4">
        <TotalCountCard
          title="Toplam Geçiş Sayısı"
          count={0}
          icon={<ArrowLeftRight size={45} className="text-muted-foreground" />}
          isLoading={false}
          onRefresh={() => {}}
        />
        <TotalCountCard
          title="Toplam Kullanıcı Sayısı"
          count={0}
          icon={<UsersRound size={45} className="text-muted-foreground" />}
          isLoading={false}
          onRefresh={() => {}}
        />
        <TotalCountCard
          title="Toplam Makine Sayısı"
          count={0}
          icon={<MonitorCog size={45} className="text-muted-foreground" />}
          isLoading={false}
          onRefresh={() => {}}
        />
      </div>

      <Tabs value={tab || 'users'} onValueChange={(value) => onChangeHandler(value, 'tab')} className="w-full p-0 m-0 min-h-0">
        <Card className="w-full flex flex-row flex-wrap p-0 gap-1 md:gap-0 overflow-auto rounded-md">
          {customerDetailTabs.map((customerTab, index) => (
            <Button
              key={index}
              variant="ghost"
              className={cn('flex-1 rounded-md h-8', tab === customerTab.value && 'bg-accent text-accent-foreground')}
              onClick={() => onChangeHandler(customerTab.value, 'tab')}
            >
              {customerTab.label}
            </Button>
          ))}
        </Card>

        <TabsContent value="users"></TabsContent>
        <TabsContent value="machines">
          <MachinesContent customerId={customerId as string} />
        </TabsContent>
        <TabsContent value="transitions"></TabsContent>
        <TabsContent value="connections">
          <ConnectionsContent customerId={customerId as string} />
        </TabsContent>
        <TabsContent value="transitionMethods"></TabsContent>
        <TabsContent value="payments"></TabsContent>
        <TabsContent value="settings"></TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomerDetailPage;
