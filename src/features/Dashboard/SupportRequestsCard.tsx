import React from 'react';
import { cn } from '@/lib/utils';
import { Info } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDateWithTime } from '@/utils/formatTime';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useGetSupportAdminTicketsQuery } from '@/api/Support/Support.hook';

interface Props {
  className?: string;
}

const SupportRequestsCard = ({ className = '' }: Props) => {
  const router = useRouter();
  const { t } = useTranslation();

  const { data: ticketsData, isLoading } = useGetSupportAdminTicketsQuery({
    pageNumber: 1,
    pageSize: 20,
    status: 'open'
  });

  if (isLoading) {
    return (
      <Card className={cn(`p-4 gap-3`, className)}>
        <CardHeader className="p-0">
          <CardTitle className="flex items-center justify-between">
            Destek Talebi
            <Badge variant="default" className="font-medium">
              Son 5
            </Badge>
          </CardTitle>
        </CardHeader>

        <CardContent className="w-full flex flex-col overflow-scroll gap-4 p-0">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="p-4 space-y-3 h-28 border rounded-lg bg-accent/5">
              <div className="flex items-center justify-between gap-3">
                <Skeleton className="h-4 w-2/5" />
                <Skeleton className="h-4 w-1/5" />
              </div>
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn(`p-4 gap-3`, className)}>
      <CardHeader className="p-0">
        <CardTitle className="flex items-center justify-between">
          Destek Talebi
          <Badge variant="outline" className="font-medium">
            Son 5
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="w-full h-full flex flex-col gap-3 p-0 overflow-scroll">
        {ticketsData?.data?.map((ticket, index) => (
          <div
            key={index}
            className="p-4 space-y-1 border rounded-lg hover:shadow-sm transition-shadow cursor-pointer hover:bg-accent/70"
            onClick={() => router.push(`support-requests?supportId=${ticket.ticketID}&tab=waiting`)}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                <h3 className="text-base font-semibold">{ticket.subject}</h3>
              </div>

              <div className="line-clamp-2 text-xs text-muted-foreground bg-input px-3 py-0.5 rounded-lg">
                {t(`support.${ticket.priority}Status`)}
              </div>
            </div>

            <p className="text-sm text-foreground">Son Mesaj: {ticket?.lastMessage?.messageContent || ticket?.description}</p>
            <p className="text-xs text-muted-foreground">Oluşturulma Tarihi: {formatDateWithTime(ticket?.createdAt)}</p>
          </div>
        ))}

        {(!ticketsData || ticketsData?.data?.length === 0) && (
          <div className="w-full h-full flex flex-col gap-3 items-center justify-center text-sm text-muted-foreground">
            <Info className="text-white bg-primary rounded-full" size={40} />
            <span className="text-sm font-medium">Görüntülenecek destek talebi bulunamadı.</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SupportRequestsCard;
