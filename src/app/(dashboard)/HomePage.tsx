'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { DataTable } from '@/components/table/DataTable';
import { DataTableName } from '@/components/table/DataTable.enum';

const HomePage = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full grid grid-cols-1 xl:grid-cols-12 gap-4">
        <div className="xl:col-span-9 space-y-4">
          <div className="grid grid-cols-1 min-[400px]:grid-cols-2 xl:grid-cols-4 gap-4">
            <Card className="p-4">
              <CardHeader className="p-0">
                <CardTitle>Card A</CardTitle>
              </CardHeader>
              <CardContent className="w-full h-28 p-0" />
            </Card>
            <Card className="p-4">
              <CardHeader className="p-0">
                <CardTitle>Card B</CardTitle>
              </CardHeader>
              <CardContent className="w-full h-28 p-0" />
            </Card>
            <Card className="p-4">
              <CardHeader className="p-0">
                <CardTitle>Card C</CardTitle>
              </CardHeader>
              <CardContent className="w-full h-28 p-0" />
            </Card>
            <Card className="p-4">
              <CardHeader className="p-0">
                <CardTitle>Card D</CardTitle>
              </CardHeader>
              <CardContent className="w-full h-28 p-0" />
            </Card>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="p-4">
              <CardHeader className="p-0">
                <CardTitle>Wide Card 1</CardTitle>
              </CardHeader>
              <CardContent className="w-full h-36 p-0" />
            </Card>

            <Card className="p-4">
              <CardHeader className="p-0">
                <CardTitle>Wide Card 2</CardTitle>
              </CardHeader>
              <CardContent className="w-full h-36 p-0" />
            </Card>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
            <Card className="w-full xl:col-span-3 p-4 gap-4">
              <CardHeader className="p-0">
                <CardTitle>Big Card (3/4) — içinde 4 small card</CardTitle>
              </CardHeader>

              <CardContent className="p-0 min-h-[260px]">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 h-full">
                  <Card className="p-4">
                    <CardHeader className="p-0">
                      <CardTitle>Inner 1</CardTitle>
                    </CardHeader>
                    <CardContent className="w-full h-full p-0" />
                  </Card>
                  <Card className="p-4">
                    <CardHeader className="p-0">
                      <CardTitle>Inner 2</CardTitle>
                    </CardHeader>
                    <CardContent className="w-full h-full p-0" />
                  </Card>
                  <Card className="p-4">
                    <CardHeader className="p-0">
                      <CardTitle>Inner 3</CardTitle>
                    </CardHeader>
                    <CardContent className="w-full h-full p-0" />
                  </Card>
                </div>
              </CardContent>
            </Card>

            <Card className="w-full xl:col-span-1 p-4">
              <CardHeader className="p-0">
                <CardTitle>Side Small Card</CardTitle>
              </CardHeader>
              <CardContent className="w-full h-full p-0" />
            </Card>
          </div>
        </div>

        <div className="xl:col-span-3 flex flex-col gap-4 min-h-0">
          <Card className="p-4 flex-1 min-h-0">
            <CardHeader className="p-0">
              <CardTitle>Right Top Card</CardTitle>
            </CardHeader>
            <CardContent className="w-full h-full p-0" />
          </Card>

          <Card className="p-4 flex-1 min-h-0">
            <CardHeader className="p-0">
              <CardTitle>Right Bottom Card</CardTitle>
            </CardHeader>
            <CardContent className="w-full h-full p-0" />
          </Card>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 xl:grid-cols-12 gap-4">
        <div className="xl:col-span-9">
          <DataTable
            tableName={DataTableName.DashboardTable}
            title={'Tablo Başlığı'}
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
              <CardTitle>Right Bottom Card</CardTitle>
            </CardHeader>
            <CardContent className="w-full p-0" />
          </Card>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
