'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useTranslation } from 'react-i18next';
import { Separator } from '@/components/ui/separator';
import CustomSearchInput from '@/components/inputs/CustomSearchInput';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';

const SupportDisplay = dynamic(() => import('./support-display'), {
  ssr: false
});

const SupportList = dynamic(() => import('./support-list'), {
  ssr: false
});

const SupportListClosed = dynamic(() => import('./ListContent/support-list-close'), {
  ssr: false
});

const SupportListOpen = dynamic(() => import('./ListContent/support-list-open'), {
  ssr: false
});

interface SupportContentProps {
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
}

const SupportContent = ({ defaultLayout = [20, 32, 48] }: SupportContentProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname() || '';
  const searchParams = useSearchParams() || new URLSearchParams();

  const tab = searchParams.get('tab');
  const supportId = searchParams.get('supportId');

  const onChangeHandler = (value: string, queryName: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    if (value) {
      newSearchParams.set(queryName, value);
    } else {
      newSearchParams.delete(queryName);
    }

    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  return (
    <React.Fragment>
      <div className="hidden w-full lg:block">
        <ResizablePanelGroup
          direction="horizontal"
          onLayout={(sizes: number[]) => {
            document.cookie = `react-resizable-panels:layout:mail=${JSON.stringify(sizes)}`;
          }}
          className="rounded-xl border border-border"
        >
          <ResizablePanel defaultSize={defaultLayout[0]} minSize={20} className="flex flex-col p-4">
            <Tabs
              defaultValue={tab || 'waiting'}
              onValueChange={(value) => onChangeHandler(value, 'tab')}
              className="flex flex-col h-full gap-3"
            >
              <div className="flex flex-col items-center gap-2">
                <h1 className="text-xl font-bold">{t('support.supportRequests')}</h1>
                <TabsList>
                  <TabsTrigger value="waiting" className="text-zinc-600 dark:text-zinc-200">
                    {t('support.supportTabWaiting')}
                  </TabsTrigger>
                  <TabsTrigger value="resolved" className="text-zinc-600 dark:text-zinc-200">
                    {t('support.supportTabResolved')}
                  </TabsTrigger>
                </TabsList>
              </div>
              <Separator />
              <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <form>
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder={t('support.searchSupport')} className="pl-8" />
                  </div>
                </form>
              </div>
              <TabsContent value="waiting" className="flex-1 min-h-0 m-0">
                <SupportListOpen supportId={supportId} />
              </TabsContent>
              <TabsContent value="resolved" className="flex-1 min-h-0 m-0">
                <SupportListClosed supportId={supportId} />
              </TabsContent>
            </Tabs>
          </ResizablePanel>

          <ResizableHandle withHandle />

          <ResizablePanel defaultSize={defaultLayout[2]} minSize={50}>
            <SupportDisplay />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      <div className="lg:hidden w-full h-full">
        {!supportId ? (
          <div className="rounded-xl border border-border h-full flex flex-col">
            <div className="flex flex-col h-full p-4">
              <Tabs
                defaultValue={tab || 'waiting'}
                onValueChange={(value) => onChangeHandler(value, 'tab')}
                className="flex flex-col h-full gap-3"
              >
                <div className="flex flex-col items-center gap-2 flex-shrink-0">
                  <h1 className="text-lg font-bold">{t('support.supportRequests')}</h1>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="waiting" className="text-zinc-600 dark:text-zinc-200 text-sm">
                      {t('support.supportTabWaiting')}
                    </TabsTrigger>
                    <TabsTrigger value="resolved" className="text-zinc-600 dark:text-zinc-200 text-sm">
                      {t('support.supportTabResolved')}
                    </TabsTrigger>
                  </TabsList>
                </div>
                <Separator className="flex-shrink-0" />
                <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex-shrink-0">
                  <CustomSearchInput
                    value={searchParams.get('name') || ''}
                    onChange={(value) => onChangeHandler(value, 'name')}
                    placeholder={t('support.searchSupport')}
                  />
                </div>
                <TabsContent value="waiting" className="flex-1 min-h-0 m-0">
                  <SupportList supportId={supportId} />
                </TabsContent>
                <TabsContent value="resolved" className="flex-1 min-h-0 m-0">
                  <SupportListClosed supportId={supportId} />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-border h-full">
            <SupportDisplay />
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default SupportContent;
