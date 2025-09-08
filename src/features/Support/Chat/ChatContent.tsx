'use client';

import { ChevronDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useSearchParams } from 'next/navigation';
import { useInfiniteQuery } from '@tanstack/react-query';
import { formatDateHourMinute } from '@/utils/formatTime';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  useSupportUserTicketDeleteMessageMutation,
  useSupportUserTicketEditMessageMutation,
  useSupportUserTicketSendMessageMutation,
  useSupportUserTicketSendMessagePhotoMutation
} from '@/api/Support/Support.hook';
import { groupMessagesByDate, getDateHeader, getSortedGroupKeys } from '../function/ChatFunction';
import { SupportApi } from '@/api/Support/Support.api';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { formatAvatarFallback } from '@/utils/formatAvatarFallback';
import { useAuthStore } from '@/store/useAuthStore';
import { CustomPhotoInputValueType } from '@/components/inputs/CustomPhotoInput';
import { Skeleton } from '@/components/ui/skeleton';
import MessageBox from './MessageBox';
import ChatMessageInputBox from './ChatMessageInputBox';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { useTranslation } from 'react-i18next';

const ChatContent = () => {
  dayjs.extend(utc);
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams() || new URLSearchParams();
  const supportId = searchParams.get('supportId');
  const containerRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [highlightedMessageId, setHighlightedMessageId] = useState<string | null>(null);
  const [selectedMessage, setSelectedMessage] = useState({
    messageId: '',
    messageContent: '',
    senderType: '',
    createdAt: '',
    isReply: false
  });

  const { mutateAsync: editMessage } = useSupportUserTicketEditMessageMutation();
  const { mutateAsync: deleteMessage } = useSupportUserTicketDeleteMessageMutation();
  const { mutateAsync: sendMessage } = useSupportUserTicketSendMessageMutation();
  const { mutateAsync: sendMessagePhoto } = useSupportUserTicketSendMessagePhotoMutation();

  const { data, fetchNextPage, hasNextPage, refetch, isFetching, isLoading } = useInfiniteQuery({
    queryKey: ['getSupportUserTicketMessagesById', supportId],
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      const response = await SupportApi.getSupportUserTicketMessagesById({
        pageNumber: pageParam,
        pageSize: 20,
        ticketId: supportId as string
      });

      return response;
    },
    getNextPageParam: (lastPage, __, lastPageParam) => lastPageParam + 1,
    getPreviousPageParam: (_, __, firstPageParam) => firstPageParam - 1
  });

  const loadNext = useCallback(async () => {
    const lastPage = data?.pages?.[data.pages.length - 1];
    // Eğer son sayfa yoksa veya data'sı boşsa tekrar fetchNextPage çağrılmasın
    if (!lastPage || !lastPage.data || lastPage.data.length === 0) return;

    const container = containerRef.current;
    let prevScrollHeight = 0;
    if (container) {
      prevScrollHeight = container.scrollHeight;
    }

    if (hasNextPage) {
      await fetchNextPage();
      // fetchNextPage sonrası scroll pozisyonunu koru
      setTimeout(() => {
        if (container) {
          const newScrollHeight = container.scrollHeight;
          container.scrollTop += newScrollHeight - prevScrollHeight;
        }
      }, 0);
    }
  }, [fetchNextPage, hasNextPage, data?.pages]);

  const messages = useMemo(() => {
    if (!data?.pages) return [];

    try {
      // Mesajları ekrana ters sırada göstermek için reverse
      return data?.pages?.flatMap((page) => page?.data || []).reverse();
    } catch (error) {
      return [];
    }
  }, [data?.pages]);

  const groupedMessages = groupMessagesByDate(messages);
  const sortedGroupKeys = getSortedGroupKeys(groupedMessages);

  const handleDeleteMessage = async (messageId: string) => {
    if (!supportId) return;
    const response = await deleteMessage(messageId as string);

    if (!response.success) {
      toast.error(response?.error || 'Mesaj silinirken bir hata oluştu.');
      return;
    }

    const newData = data?.pages.map((page) => {
      return {
        ...page,
        data: page.data.filter((msg) => msg.messageID !== messageId)
      };
    });
    queryClient.setQueryData(['getSupportUserTicketMessagesById', supportId], {
      pageParams: data?.pageParams,
      pages: newData
    });
  };

  const handleSelectMessage = (
    messageId: string,
    messageContent: string,
    isReply: boolean,
    senderType: 'user' | 'admin',
    createdAt: string
  ) => {
    setSelectedMessage({ messageId, messageContent, isReply, senderType, createdAt });
  };

  const handleSendMessage = async ({ messageInput }: { messageInput: string }) => {
    if (!messageInput.trim() || !supportId) return;

    if (selectedMessage.messageId && !selectedMessage.isReply) {
      await handleEditMessage(selectedMessage.messageId, messageInput);
      setSelectedMessage({ messageId: '', messageContent: '', isReply: false, senderType: '', createdAt: '' });
      return;
    }

    const response = await sendMessage({
      ticketID: supportId as string,
      messageContent: messageInput,
      replyToMessageID: selectedMessage.isReply ? selectedMessage.messageId : undefined
    });

    if (response?.success) {
      const newMessage = {
        messageID: Math.random().toString(36).substr(2, 9),
        ticketID: supportId as string,
        senderType: 'user',
        messageContent: messageInput,
        createdAt: dayjs.utc().add(3, 'hour').toISOString(),
        replyToMessage: selectedMessage.isReply
          ? {
              messageID: selectedMessage.messageId,
              messageContent: selectedMessage.messageContent,
              senderType: selectedMessage.senderType,
              createdAt: selectedMessage.createdAt
            }
          : null,
        photos: null
      };

      queryClient.setQueryData(['getSupportUserTicketMessagesById', supportId], (old: any) => {
        if (!old) {
          return { pageParams: [1], pages: [{ data: [newMessage] }] };
        }

        // Yeni mesajı ilk sayfanın başına ekle (en başa)
        let updatedPages = [...old.pages];
        if (!updatedPages[0] || !Array.isArray(updatedPages[0].data)) {
          updatedPages[0] = { data: [] };
        }
        updatedPages[0] = {
          ...updatedPages[0],
          data: [newMessage, ...updatedPages[0].data]
        };
        return { ...old, pages: updatedPages };
      });

      setSelectedMessage({ messageId: '', messageContent: '', isReply: false, senderType: '', createdAt: '' });

      if (containerRef.current) {
        setTimeout(() => {
          containerRef.current?.scrollTo({
            top: containerRef.current.scrollHeight,
            behavior: 'smooth'
          });
        }, 100);
      }

      queryClient.removeQueries({ queryKey: ['getSupportUserTicketMessagesById', supportId] });
      await refetch();
    } else {
      toast.error(response?.error || 'Mesaj gönderilirken bir hata oluştu.');
    }
  };

  const handleEditMessage = async (messageId: string, newContent: string) => {
    if (!supportId) return;
    const response = await editMessage({ messageID: messageId, messageContent: newContent });

    if (!response.success) {
      toast.error(response?.error || 'Mesaj düzenlenirken bir hata oluştu.');
      return;
    }

    // data find edit message
    const newData = data?.pages.map((page) => {
      return {
        ...page,
        data: page.data.map((msg) => {
          if (msg.messageID === messageId) {
            return { ...msg, messageContent: newContent };
          }
          return msg;
        })
      };
    });

    queryClient.setQueryData(['getSupportUserTicketMessagesById', supportId], {
      pageParams: data?.pageParams,
      pages: newData
    });
  };

  const handleSendMessagePhoto = async (photos: CustomPhotoInputValueType[], messageInput: string) => {
    if (!supportId) return;

    const response = await sendMessagePhoto({
      ticketID: supportId as string,
      images: photos,
      messageContent: messageInput
    });

    if (response?.success) {
      // Fotoğraflı yeni mesajı ilk sayfanın başına ekle
      const newMessage = {
        messageID: Math.random().toString(36).substr(2, 9),
        ticketID: supportId as string,
        senderType: 'user',
        messageContent: messageInput,
        createdAt: dayjs.utc().add(3, 'hour').toISOString(),
        replyToMessage: null,
        photos: photos
      };

      queryClient.setQueryData(['getSupportUserTicketMessagesById', supportId], (old: any) => {
        if (!old) {
          return { pageParams: [1], pages: [{ data: [newMessage] }] };
        }

        let updatedPages = [...old.pages];
        if (!updatedPages[0] || !Array.isArray(updatedPages[0].data)) {
          updatedPages[0] = { data: [] };
        }
        updatedPages[0] = {
          ...updatedPages[0],
          data: [newMessage, ...updatedPages[0].data]
        };
        return { ...old, pages: updatedPages };
      });

      setSelectedMessage({ messageId: '', messageContent: '', isReply: false, senderType: '', createdAt: '' });

      if (containerRef.current) {
        setTimeout(() => {
          containerRef.current?.scrollTo({
            top: containerRef.current.scrollHeight,
            behavior: 'smooth'
          });
        }, 100);
      }

      queryClient.removeQueries({ queryKey: ['getSupportUserTicketMessagesById', supportId] });
      await refetch();
    } else {
      toast.error(response?.error || 'Fotoğraf gönderilirken bir hata oluştu.');
    }
  };

  const onScrollReplyToMessage = (messageID: string) => {
    const messageElement = document.getElementById(`message-${messageID}`);
    const container = containerRef.current;

    if (messageElement && container) {
      setHighlightedMessageId(messageID);

      // Mesaj elementinin container içindeki pozisyonunu hesapla
      const messageRect = messageElement.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const relativeTop = messageRect.top - containerRect.top;

      // Container'ın ortasına scroll yap
      const scrollPositionWeb = container.scrollTop + relativeTop - containerRect.height / 2 + messageRect.height / 2;
      const scrollPositionMobile = container.scrollTop + relativeTop - containerRect.height * 2 + messageRect.height * 2;

      // Ekran genişliğine göre scroll pozisyonunu belirle
      const isMobileView = window.innerWidth < 768;
      const finalScrollPosition = isMobileView ? scrollPositionMobile : scrollPositionWeb;

      container.scrollTo({
        top: finalScrollPosition,
        behavior: 'smooth'
      });

      // 3 saniye sonra highlight'ı kaldır
      setTimeout(() => {
        setHighlightedMessageId(null);
      }, 1500);
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [supportId]);

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col gap-4 p-3 overflow-scroll bg-background">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <div key={i} className={`flex gap-2 ${i % 2 === 0 ? 'flex-row-reverse' : 'flex-row'} w-full`}>
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className={`flex flex-col gap-2 ${i % 2 === 0 ? 'items-end' : 'items-start'} w-full`}>
              <Skeleton className="h-14 w-2/3 max-w-[300px] rounded-lg" />
            </div>
          </div>
        ))}

        <div className="flex-1 flex flex-row items-end justify-center mt-auto gap-2">
          <Skeleton className="h-10 w-10 rounded-full" />

          <Skeleton className="h-16 w-full flex-1 rounded-lg" />
          <Skeleton className="h-10 w-1/12 rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full min-h-0">
      <div
        ref={containerRef}
        className="flex-1 flex flex-col gap-4 p-3 overflow-scroll"
        onScroll={(e) => {
          const element = e.currentTarget;
          const atBottom = element.scrollHeight - element.scrollTop <= element.clientHeight + 100;
          if (element.scrollTop === 0 && hasNextPage && !isFetching) {
            loadNext();
          }
          setShowScrollButton(!atBottom);
        }}
      >
        <div className="flex flex-col gap-3">
          {sortedGroupKeys?.map((groupKey) => (
            <React.Fragment key={groupKey}>
              <div className="sticky top-0 z-10 flex items-center justify-center">
                <Badge variant="outline" className="text-sm font-semibold text-primary px-3 py-1">
                  {getDateHeader(groupKey, t)}
                </Badge>
              </div>

              {groupedMessages[groupKey]?.map((msg, index) => (
                <div key={index} className={`flex gap-2 ${msg.senderType === 'user' ? 'flex-row-reverse' : 'flex-row'} relative`}>
                  <Avatar className="h-8 w-8 rounded-full">
                    <AvatarImage src={undefined} alt={'avatar'} />
                    <AvatarFallback className="rounded-lg bg-accent">
                      {msg.senderType === 'user'
                        ? formatAvatarFallback(user?.firstName || '-', user?.lastName || '-')
                        : formatAvatarFallback('G', 'D')}
                    </AvatarFallback>
                  </Avatar>

                  <MessageBox
                    msg={msg}
                    handleSelectMessage={handleSelectMessage}
                    handleDeleteMessage={handleDeleteMessage}
                    formatDateHourMinute={formatDateHourMinute}
                    onScrollReplyToMessage={onScrollReplyToMessage}
                    highlight={highlightedMessageId === msg.messageID}
                  />
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>

        {showScrollButton && (
          <Button
            onClick={() => {
              containerRef.current?.scrollTo({
                top: containerRef.current.scrollHeight,
                behavior: 'smooth'
              });
            }}
            size={'default'}
            variant={'link'}
            className="sticky bottom-1 ml-auto text-primary border border-primary bg-card w-9 h-9 rounded-full"
          >
            <ChevronDown className="size-5 font-semibold" />
          </Button>
        )}
      </div>

      <Separator className="mt-auto" />

      <ChatMessageInputBox
        selectedMessageContent={selectedMessage.messageContent}
        isSelectedMessage={!!selectedMessage.messageId}
        onClearSelectedMessage={() =>
          setSelectedMessage({ messageId: '', messageContent: '', isReply: false, senderType: '', createdAt: '' })
        }
        onSendMessage={(messageInput, photos) => {
          if (photos.length > 0) {
            handleSendMessagePhoto(photos, messageInput);
          } else {
            handleSendMessage({ messageInput });
          }
        }}
      />
    </div>
  );
};

export default ChatContent;
