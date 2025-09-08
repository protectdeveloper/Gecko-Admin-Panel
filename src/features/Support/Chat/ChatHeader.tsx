import React from 'react';
import { MoreVertical } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { formatAvatarFallback } from '@/utils/formatAvatarFallback';

const ChatHeader = () => {
  const { t } = useTranslation();

  return (
    <div className="flex items-start p-4 border-b min-h-[4rem]">
      <div className="flex-1 flex items-center gap-3 text-sm">
        <Avatar className="w-10 h-10">
          <AvatarImage alt={'admin'} />
          <AvatarFallback>{formatAvatarFallback('G', 'D')}</AvatarFallback>
        </Avatar>

        <span className="font-semibold">{t('support.geckoSupport')}</span>
      </div>
      <div className="flex flex-col items-end gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">{t('support.moreOptions')}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>{t('support.markAsSolved')}</DropdownMenuItem>
            <DropdownMenuItem>{t('support.deleteSupportRequest')}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default ChatHeader;
