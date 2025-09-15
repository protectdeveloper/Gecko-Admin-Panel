'use client';
import dynamic from 'next/dynamic';
import { cn } from '@/lib/utils';
import React from 'react';
import MessageDropdownMenu from './MessageDropdownMenu';
import { GetSupportAdminTicketMessagesByIdDTO } from '@/api/Support/Support.types';

const MessagePhotoGallery = dynamic(() => import('./MessagePhotoGallery'), { ssr: false });

interface MessageBoxProps {
  msg: GetSupportAdminTicketMessagesByIdDTO['data'][0];
  onScrollReplyToMessage: (messageID: string) => void;
  handleSelectMessage: (
    messageID: string,
    messageContent: string,
    isReply: boolean,
    senderType: 'user' | 'admin',
    createdAt: string
  ) => void;
  handleDeleteMessage: (messageID: string) => void;
  formatDateHourMinute: (dateString: string) => string;
  highlight?: boolean;
}

const MessageBox = ({
  msg,
  onScrollReplyToMessage,
  handleSelectMessage,
  handleDeleteMessage,
  formatDateHourMinute,
  highlight = false
}: MessageBoxProps) => {
  return (
    <div
      id={`message-${msg.messageID}`}
      className={cn('flex flex-col gap-1.5 text-sm relative', msg.senderType === 'admin' ? 'items-end' : 'items-start')}
    >
      {msg?.replyToMessage && (
        <div
          onClick={() => onScrollReplyToMessage(msg.replyToMessage?.messageID as string)}
          className={cn(
            'border-l-4 px-2 py-1.5 rounded-md cursor-pointer max-w-sm text-sm',
            'overflow-hidden text-ellipsis whitespace-pre-wrap break-words',
            'bg-input/40 dark:bg-input border-primary'
          )}
        >
          <p className="italic opacity-80">{msg.replyToMessage.messageContent}</p>
        </div>
      )}

      <MessagePhotoGallery msg={msg} />

      <div
        className={cn(
          'flex items-start gap-2 rounded-lg shadow-sm px-2.5 py-2',
          msg.senderType === 'admin' ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground',
          highlight &&
            (msg.senderType === 'admin' ? 'ring-2 ring-black dark:ring-gray-100 opacity-80' : 'ring-2 ring-primary opacity-80')
        )}
      >
        <div className={'whitespace-pre-wrap break-words overflow-wrap-anywhere max-w-[150px] sm:max-w-sm lg:max-w-md'}>
          <p>{msg?.messageContent}</p>
        </div>

        <MessageDropdownMenu
          createdAt={msg?.createdAt}
          senderType={msg?.senderType}
          onReplyPress={() => handleSelectMessage(msg?.messageID, msg?.messageContent, true, msg?.senderType, msg?.createdAt)}
          onEditPress={() => handleSelectMessage(msg?.messageID, msg?.messageContent, false, msg?.senderType, msg?.createdAt)}
          onDeletePress={() => handleDeleteMessage(msg?.messageID)}
        />
      </div>

      <span className={cn('text-[11px] font-medium opacity-70 mt-0.5', msg?.senderType === 'admin' ? 'text-right' : 'text-left')}>
        {formatDateHourMinute(msg?.createdAt)}
      </span>
    </div>
  );
};

export default MessageBox;
