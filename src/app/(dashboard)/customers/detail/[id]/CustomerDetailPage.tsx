'use client';
import React from 'react';
import TotalCountCard from '@/features/Dashboard/TotalCountCard';
import { ArrowLeftRight, MonitorCog, UsersRound } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import MachinesContent from '@/features/CustomerDetail/tab-contents/MachinesContent';
import ConnectionsContent from '@/features/CustomerDetail/tab-contents/ConnectionContent';

const CustomerDetailPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const tab = searchParams.get('tab');
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

  const customerTabs = [
    { label: 'Kullanıcılar', value: 'users' },
    { label: 'Makineler', value: 'machines' },
    { label: 'Geçişler', value: 'transitions' },
    { label: 'Bağlantılar', value: 'connections' },
    { label: 'Geçiş Metodları', value: 'transitionMethods' },
    { label: 'Ödemeler', value: 'payments' },
    { label: 'Ayarlar', value: 'settings' }
  ];

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

      <div className="flex w-full">
        <Tabs defaultValue={tab || 'users'} onValueChange={(value) => onChangeHandler(value, 'tab')} className="w-full">
          <TabsList className="rounded-md">
            {customerTabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
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
    </div>
  );
};

export default CustomerDetailPage;
