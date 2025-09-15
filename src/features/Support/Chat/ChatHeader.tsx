import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSupportStore } from '@/store/useSupportStore';
import { formatAvatarFallback } from '@/utils/formatAvatarFallback';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const ChatHeader = () => {
  const { user: supportUser, role, customer } = useSupportStore();

  return (
    <div className="flex flex-row items-center p-4 gap-3 border-b min-h-[4rem]">
      <Avatar className="w-10 h-10">
        <AvatarImage alt={'user-avatar'} />
        <AvatarFallback>{formatAvatarFallback(supportUser?.firstName || '-', supportUser?.lastName || '-')}</AvatarFallback>
      </Avatar>

      <div className="w-full flex flex-col gap-1 md:gap-0.5">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-0.5 md:gap-2">
          <span className="font-semibold">
            {supportUser?.firstName} {supportUser?.lastName}
          </span>

          <span className="text-xs text-muted-foreground">
            {customer?.customerName} / {customer?.customerCode}
          </span>
        </div>

        <span className="text-xs text-muted-foreground">
          {role?.roleName} / {supportUser?.phoneNumber}
        </span>
      </div>
    </div>
  );
};

export default ChatHeader;
