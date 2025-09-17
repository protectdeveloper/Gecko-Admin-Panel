'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import { Info } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { useSupportStore } from '@/store/useSupportStore';
import { GetSupportAdminTicketsDTO } from '@/api/Support/Support.types';
import { formatDateHourMinute, formatDateTransactions, formatDateWithTime } from '@/utils/formatTime';

interface SupportListContentProps {
  ticketsData?: GetSupportAdminTicketsDTO;
  supportId?: string | null;
  onChangeHandler: (value: string, queryName: string) => void;
  finished: boolean;
  handleLoadMore: () => void;
}

const SupportListContent = ({ ticketsData, supportId, onChangeHandler, finished, handleLoadMore }: SupportListContentProps) => {
  const { t } = useTranslation();
  const { setCustomer, setRole, setUser, setIsActive, setStatus } = useSupportStore();

  const handleSupportStoreState = (item: GetSupportAdminTicketsDTO['data'][0]) => {
    setCustomer(item.customer);
    setUser(item.user);
    setRole(item.role);
    setIsActive(item.isActive);
    setStatus(item.status);
  };

  return (
    <div>
      {ticketsData?.data && ticketsData?.data?.length > 0 && (
        <div className="flex flex-col gap-2">
          {ticketsData?.data?.map((item, index) => (
            <button
              key={index}
              className={cn(
                'flex flex-col cursor-pointer items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent',
                supportId === item.ticketID && 'bg-muted'
              )}
              onClick={() => {
                handleSupportStoreState(item);
                onChangeHandler(item.ticketID, 'supportId');
              }}
            >
              <div className="w-full flex flex-col gap-1">
                <div className="flex flex-wrap justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="font-semibold">{item.subject}</div>
                  </div>

                  <div
                    className={cn(
                      'flex flex-row items-center gap-2 text-xs',
                      supportId === item.ticketID ? 'text-foreground' : 'text-muted-foreground'
                    )}
                  >
                    <span>{formatDateWithTime(item.status === 'open' ? item?.createdAt : item?.closedAt || new Date())}</span>

                    {item?.lastMessage?.senderType !== 'admin' && item.status === 'open' && (
                      <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                    )}
                  </div>
                </div>
                <div className="text-xs font-medium">{item.description}</div>
              </div>

              <div className="line-clamp-2 text-xs text-muted-foreground bg-input px-3 py-0.5 rounded-lg">
                {t(`support.${item.priority}Status`)}
              </div>
            </button>
          ))}

          {finished && (
            <Button variant="outline" className="w-full" onClick={handleLoadMore}>
              {t('support.moreOptions')}
            </Button>
          )}
        </div>
      )}

      {(!ticketsData || ticketsData?.data.length === 0) && (
        <div className="flex flex-col items-center justify-center text-center px-5 py-10 gap-3 bg-card rounded-lg">
          <Info className="h-10 w-10 text-muted-foreground" />
          <p className="text-sm text-muted-foreground font-medium">{t('support.noTickets')}</p>
        </div>
      )}
    </div>
  );
};

export default SupportListContent;
