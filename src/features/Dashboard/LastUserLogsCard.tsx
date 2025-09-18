import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatAvatarFallback } from '@/utils/formatAvatarFallback';
import { formatDateWithTime } from '@/utils/formatTime';
import { Skeleton } from '@/components/ui/skeleton';

interface Props {
  className?: string;
}

const LastUserLogsCard = ({ className = '' }: Props) => {
  const randomUserLogData = [
    {
      id: '1',
      fullName: 'Ali Yılmaz',
      departmentName: 'IT',
      actionName: 'Giriş yaptı',
      createdAt: '2024-06-01 10:00'
    },
    {
      id: '2',
      fullName: 'Ayşe Demir',
      departmentName: 'Finans',
      actionName: 'Kayıt ekledi',
      createdAt: '2024-06-01 09:30'
    },
    {
      id: '3',
      fullName: 'Mehmet Kaya',
      departmentName: 'Pazarlama',
      actionName: 'Rapor indirdi',
      createdAt: '2024-05-31 16:45'
    },
    {
      id: '4',
      fullName: 'Fatma Şahin',
      departmentName: 'İnsan Kaynakları',
      actionName: 'Kayıt güncelledi',
      createdAt: '2024-05-31 15:20'
    },
    {
      id: '5',
      fullName: 'Caner Yayla',
      departmentName: 'Satış',
      actionName: 'Çıkış yaptı',
      createdAt: '2024-05-31 14:10'
    },
    {
      id: '6',
      fullName: 'Zeynep Koç',
      departmentName: 'Operasyon',
      actionName: 'Giriş yaptı',
      createdAt: '2024-05-31 13:55'
    },
    {
      id: '7',
      fullName: 'Emre Aydın',
      departmentName: 'Yönetim',
      actionName: 'Kayıt sildi',
      createdAt: '2024-05-31 12:30'
    },
    {
      id: '8',
      fullName: 'Elif Yıldız',
      departmentName: 'IT',
      actionName: 'Rapor indirdi',
      createdAt: '2024-05-31 11:15'
    },
    {
      id: '9',
      fullName: 'Murat Güneş',
      departmentName: 'Finans',
      actionName: 'Kayıt ekledi',
      createdAt: '2024-05-31 10:05'
    },
    {
      id: '10',
      fullName: 'Seda Aksoy',
      departmentName: 'Pazarlama',
      actionName: 'Giriş yaptı',
      createdAt: '2024-05-31 09:00'
    }
  ];

  let isLoading = false;

  if (isLoading) {
    return (
      <Card className={cn(`p-4 gap-3`, className)}>
        <CardHeader className="p-0">
          <CardTitle>Son 10 Kullanıcı Logu</CardTitle>
        </CardHeader>

        <CardContent className="w-full h-full flex flex-col p-0 overflow-scroll">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="p-3 pb-5 space-y-2 border-b last:border-b-0 transition-shadow">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-10 w-10 rounded-full bg-muted" />
                  <Skeleton className="h-4 w-32 bg-muted rounded" />
                </div>
                <Skeleton className="h-4 w-24 bg-muted rounded" />
              </div>
              <Skeleton className="h-4 w-1/2 bg-muted rounded" />
              <Skeleton className="h-4 w-full bg-muted rounded" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn(`p-4 gap-3`, className)}>
      <CardHeader className="p-0">
        <CardTitle>Son 10 Kullanıcı Logu</CardTitle>
      </CardHeader>

      <CardContent className="w-full h-full flex flex-col p-0 overflow-scroll">
        {randomUserLogData.map((item, index) => (
          <div key={index} className="p-3 space-y-2 border-b last:border-b-0 transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={undefined} alt="User Avatar" />
                  <AvatarFallback>
                    {formatAvatarFallback(item.fullName.split(' ')[0], item.fullName.split(' ')[1])}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm">{item.fullName}</span>
              </div>
              <p className="text-sm text-muted-foreground">{formatDateWithTime(item.createdAt)}</p>
            </div>

            <p className="text-sm text-muted-foreground">
              {item.departmentName} - {item.actionName}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default LastUserLogsCard;
