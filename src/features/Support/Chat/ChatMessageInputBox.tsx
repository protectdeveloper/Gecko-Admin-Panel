'use client';
import { Send, X } from 'lucide-react';
import React, { useState, useRef, useLayoutEffect } from 'react';
import { Button } from '@/components/ui/button';
import { CustomPhotoInput, CustomPhotoInputValueType } from '@/components/inputs/CustomPhotoInput';
import CustomTextAreaInput from '@/components/inputs/CustomTextAreaInput';
import { useTranslation } from 'react-i18next';

interface ChatMessageInputBoxProps {
  selectedMessageContent?: string;
  isSelectedMessage?: boolean;
  onSendMessage: (message: string, photos: CustomPhotoInputValueType[]) => void;
  onClearSelectedMessage: () => void;
}

const ChatMessageInputBox = ({
  isSelectedMessage,
  selectedMessageContent,
  onSendMessage,
  onClearSelectedMessage
}: ChatMessageInputBoxProps) => {
  const { t } = useTranslation();
  const [messageInput, setMessageInput] = useState(selectedMessageContent || '');
  const [selectedFiles, setSelectedFiles] = useState<CustomPhotoInputValueType[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [forceFocusGuard, setForceFocusGuard] = useState(false);

  const handleRemoveFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  useLayoutEffect(() => {
    if (!isSelectedMessage) return;
    // Try focusing on next animation frame to ensure DOM is ready
    const id = requestAnimationFrame(() => {
      if (textareaRef.current) {
        textareaRef.current.focus({ preventScroll: true });
        const len = textareaRef.current.value.length;
        try {
          textareaRef.current.setSelectionRange(len, len);
        } catch {}
        // short window where we re-focus if blur happens immediately after click
        setForceFocusGuard(true);
        setTimeout(() => setForceFocusGuard(false), 300);
      } else {
        // Fallback in case ref not ready yet
        setTimeout(() => {
          if (textareaRef.current) {
            textareaRef.current.focus({ preventScroll: true });
            const len2 = textareaRef.current.value.length;
            try {
              textareaRef.current.setSelectionRange(len2, len2);
            } catch {}
            setForceFocusGuard(true);
            setTimeout(() => setForceFocusGuard(false), 300);
          }
        }, 0);
      }
    });
    return () => cancelAnimationFrame(id);
  }, [isSelectedMessage, selectedMessageContent]);

  return (
    <div className="w-full flex flex-col gap-2 px-2">
      {selectedFiles.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {selectedFiles.map((file, index) => (
            <div className="relative" key={index}>
              <img
                src={file?.image}
                alt={`Selected ${index + 1}`}
                className="w-24 h-24 object-cover rounded-md border border-border"
              />
              <div
                className="p-1 absolute right-1.5 top-1.5 bg-input rounded-full cursor-pointer"
                onClick={() => handleRemoveFile(index)}
              >
                <X className="h-2 w-2" />
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-row items-end gap-2">
        <CustomPhotoInput onChange={setSelectedFiles} value={selectedFiles} maxFiles={3} />

        <div className="flex-1 flex flex-col gap-2">
          {(isSelectedMessage || selectedMessageContent) && (
            <div className="w-fit flex items-center bg-secondary pl-4 pr-2 py-2 rounded-md text-sm gap-2 relative overflow-auto">
              <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-primary rounded" style={{ height: '100%' }}></div>
              <div className="flex flex-row items-start gap-2">
                <span className="font-semibold">{selectedMessageContent}</span>

                <Button
                  variant="outline"
                  size={'icon'}
                  className="w-5 h-5 p-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    onClearSelectedMessage();
                  }}
                >
                  <X className="h-1.5 w-1.5" />
                </Button>
              </div>
            </div>
          )}

          <CustomTextAreaInput
            ref={textareaRef}
            value={messageInput}
            autoFocus={true}
            onFocusCapture={() => {}}
            onChange={(value) => setMessageInput(value)}
            placeholder={t('support.messagePlaceholder') || 'Type your message...'}
            className="flex-1"
            onBlur={() => {
              if (forceFocusGuard && textareaRef.current) {
                requestAnimationFrame(() => textareaRef.current?.focus({ preventScroll: true }));
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                if (messageInput.trim()) {
                  onSendMessage(messageInput, selectedFiles);
                  setMessageInput('');
                  setSelectedFiles([]);
                }
              }
            }}
          />
        </div>

        <Button
          onClick={(e) => {
            e.preventDefault();
            onSendMessage(messageInput, selectedFiles);
            setMessageInput('');
            setSelectedFiles([]);
          }}
          size="icon"
          disabled={!messageInput.trim()}
        >
          <Send />
        </Button>
      </div>
    </div>
  );
};

export default ChatMessageInputBox;
