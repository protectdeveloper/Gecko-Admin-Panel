import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { ChevronDown, CornerDownRight, Edit, Trash2 } from 'lucide-react';
import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';

interface MessageDropdownMenuProps {
  onDeletePress: () => void;
  onEditPress: () => void;
  onReplyPress: () => void;
  createdAt: string;
  senderType?: 'user' | 'admin';
}

const MessageDropdownMenu = ({ onDeletePress, onEditPress, onReplyPress, createdAt, senderType }: MessageDropdownMenuProps) => {
  const { t } = useTranslation();
  const created = new Date(createdAt).getTime();
  const now = Date.now();
  const diffMs = now - created;
  const showDropdown = diffMs <= 2 * 60 * 1000;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={cn(
            'w-4 h-4 p-0 border-0',
            senderType === 'user'
              ? 'text-background bg-white/20 dark:bg-white/20'
              : 'text-foreground bg-black/10 dark:bg-white/20'
          )}
        >
          <ChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onReplyPress}>
          <CornerDownRight className="w-4 h-4" /> {t('support.reply')}
        </DropdownMenuItem>
        {showDropdown && (
          <Fragment>
            <DropdownMenuItem onClick={onEditPress}>
              <Edit className="w-4 h-4" /> {t('support.edit')}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onDeletePress} className="text-red-600 focus:text-red-600">
              <Trash2 className="w-4 h-4" /> {t('support.delete')}
            </DropdownMenuItem>
          </Fragment>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MessageDropdownMenu;
