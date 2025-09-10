'use client';
import dynamic from 'next/dynamic';
import { cn } from '@/lib/utils';
import React from 'react';
import MessageDropdownMenu from './MessageDropdownMenu';
import { GetSupportUserTicketMessagesByIdDTO } from '@/api/Support/Support.types';

const MessagePhotoGallery = dynamic(() => import('./MessagePhotoGallery'), { ssr: false });

interface MessageBoxProps {
  msg: GetSupportUserTicketMessagesByIdDTO['data'][0];
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
      className={cn(
        'max-w-[50%] flex flex-col gap-1.5 text-sm relative',
        highlight &&
          (msg.senderType === 'user' ? 'ring-2 ring-black dark:ring-gray-100 opacity-60 ' : 'ring-2 ring-primary opacity-60')
      )}
    >
      {msg?.replyToMessage && (
        <div
          onClick={() => onScrollReplyToMessage(msg.replyToMessage?.messageID as string)}
          className={cn(
            'border-l-4 px-2 py-1 rounded-sm cursor-pointer',
            msg.senderType === 'user' ? 'bg-card/20 border-secondary' : 'bg-input dark:bg-card border-primary'
          )}
        >
          <p className="text-sm font-medium italic opacity-80 whitespace-pre-wrap">{msg.replyToMessage.messageContent}</p>
        </div>
      )}

      <MessagePhotoGallery msg={msg} />

      <div
        className={cn(
          'flex flex-wrap items-start gap-2 py-1.5 px-2.5 rounded-lg',
          msg?.senderType === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'
        )}
      >
        <div className="flex-1 break-words whitespace-pre-wrap min-w-0">
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

      <span className={cn('text-[11px] font-medium opacity-70 block', msg?.senderType === 'user' ? 'text-end' : 'text-start')}>
        {formatDateHourMinute(msg?.createdAt)}
      </span>
    </div>
  );
};

export default MessageBox;
