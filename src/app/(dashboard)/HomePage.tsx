'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { DataTable } from '@/components/table/DataTable';
import { DataTableName } from '@/components/table/DataTable.enum';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const HomePage = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full grid grid-cols-1 xl:grid-cols-12 gap-4">
        <div className="xl:col-span-9 space-y-4">
          <div className="grid grid-cols-1 min-[400px]:grid-cols-2 xl:grid-cols-4 gap-4">
            <Card className="p-4">
              <CardHeader className="p-0">
                <CardTitle>Toplam Firma Sayısı</CardTitle>
              </CardHeader>
              <CardContent className="w-full h-28 p-0" />
            </Card>
            <Card className="p-4">
              <CardHeader className="p-0">
                <CardTitle>Toplam Kullanıcı Sayısı</CardTitle>
              </CardHeader>
              <CardContent className="w-full h-28 p-0" />
            </Card>
            <Card className="p-4">
              <CardHeader className="p-0">
                <CardTitle>Toplam Makine Sayısı</CardTitle>
              </CardHeader>
              <CardContent className="w-full h-28 p-0" />
            </Card>
            <Card className="p-4">
              <CardHeader className="p-0">
                <CardTitle>Kalan SMS / E-Posta Sayısı</CardTitle>
              </CardHeader>
              <CardContent className="w-full h-28 p-0" />
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <Card className="p-4">
              <CardHeader className="flex flex-row gap-3 px-0">
                <div className="flex-1 space-y-1">
                  <CardTitle>Toplam Geçiş Sayısı</CardTitle>
                </div>

                <Tabs value={'daily'} onValueChange={(value) => console.log(value)} className=" space-x-1">
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
              <CardContent className="w-full h-36 p-0" />
            </Card>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 h-[300px]">
            <Card className="w-full xl:col-span-1 p-4 gap-4">
              <CardHeader className="p-0">
                <CardTitle>Rabbitmq Kuyruk ve Dinleyici Bilgisi</CardTitle>
              </CardHeader>

              <CardContent className="w-full h-full p-0" />
            </Card>

            <Card className="w-full xl:col-span-1 p-4 gap-4">
              <CardHeader className="p-0">
                <CardTitle>Micro Servisler ve Durumu</CardTitle>
              </CardHeader>
              <CardContent className="w-full h-full p-0" />
            </Card>

            <Card className="w-full xl:col-span-1 p-4">
              <CardHeader className="p-0">
                <CardTitle>Son Çalışan Görevler</CardTitle>
              </CardHeader>
              <CardContent className="w-full h-full p-0" />
            </Card>
          </div>
        </div>

        <div className="xl:col-span-3 flex flex-col gap-4 min-h-0">
          <Card className="p-4 flex-1 min-h-0">
            <CardHeader className="p-0">
              <CardTitle>Ödemesi Yaklaşan Firmalar</CardTitle>
            </CardHeader>
            <CardContent className="w-full h-full p-0" />
          </Card>

          <Card className="p-4 flex-1 min-h-0">
            <CardHeader className="p-0">
              <CardTitle>Destek Talepleri</CardTitle>
            </CardHeader>
            <CardContent className="w-full h-full p-0" />
          </Card>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 xl:grid-cols-12 gap-4">
        <div className="xl:col-span-9">
          <DataTable
            tableName={DataTableName.DashboardTable}
            title={'Admin Logları'}
            data={[]}
            columns={[]}
            filterColumns={[]}
            totalCount={0}
            pageCount={1}
          />
        </div>

        <div className="xl:col-span-3">
          <Card className="p-4 h-full">
            <CardHeader className="p-0">
              <CardTitle>Son 10 Kullanıcı Logu</CardTitle>
            </CardHeader>
            <CardContent className="w-full p-0" />
          </Card>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
