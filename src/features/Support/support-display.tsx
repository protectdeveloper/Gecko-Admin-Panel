'use client';

import dynamic from 'next/dynamic';
import { ArrowLeft, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';

const ChatHeader = dynamic(() => import('./Chat/ChatHeader'), {
  ssr: false
});

const ChatContent = dynamic(() => import('./Chat/ChatContent'), {
  ssr: false
});

const SupportDisplay = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const pathname = usePathname() || '';
  const searchParams = useSearchParams() || new URLSearchParams();
  const supportId = searchParams.get('supportId');

  const handleBackToList = () => {
    router.push(pathname);
  };

  return (
    <div className="flex flex-col w-full h-full min-h-0">
      <div className="lg:hidden flex items-center gap-2 p-4 border-b min-h-[4rem]">
        <Button variant="ghost" size="icon" onClick={handleBackToList}>
          <ArrowLeft className="h-4 w-4" />
          <span className="sr-only">{t('support.back')}</span>
        </Button>
        <h2 className="font-semibold">{t('support.supportDetailTitle')}</h2>
      </div>

      {supportId ? (
        <div className="flex flex-col flex-1 min-h-0">
          <ChatHeader />
          <ChatContent />
        </div>
      ) : (
        <div className="w-full h-full bg-card flex flex-col gap-3 items-center justify-center text-center text-muted-foreground">
          <Info className="text-white bg-primary rounded-full" size={50} />
          <div className="flex flex-col text-center text-base font-semibold">
            <span>{t('support.pleaseSelectSupportRequest')}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportDisplay;
