'use client';
import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react';
import { ArrowRightLeft, ListVideo, MonitorCog, Pause, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import {
  useGetMqttMessagesQuery,
  useGetMqttStartQuery,
  useGetMqttStatusQuery,
  useGetMqttStopQuery,
  usePostMqttSubscribeMutation
} from '@/api/Mqtt/Mqtt.hook';
import { CustomSelectBox } from '@/components/inputs/CustomSelectBox';
import { AppDialog } from '@/components/AppDialog';
import MqttSubscribeTerminalContent from './modal/MqttSubscribeTerminalContent';
import { formatDateWithTime } from '@/utils/formatTime';

interface Props {
  className?: string;
}

const MqttMessageCard = ({ className }: Props) => {
  const [timeSeconds, setTimeSeconds] = useState('10');

  const { isLoading: isStartPending, refetch: refetchMqttStart } = useGetMqttStartQuery({ enabled: false });
  const { isLoading: isStopPending, refetch: refetchMqttStop } = useGetMqttStopQuery({ enabled: false });
  const { data: mqttStatusData, isLoading: isMqttStatusLoading, refetch: refetchMqttStatus } = useGetMqttStatusQuery();

  const {
    data: mqttMessagesData,
    isLoading: isMqttMessagesLoading,
    refetch: refetchMqttMessages,
    isRefetching: isMqttMessagesRefetching,
    isFetching: isMqttMessagesFetching
  } = useGetMqttMessagesQuery(undefined, { enabled: false });

  const { mutateAsync: postSubscribe, isPending: isSubscribePending } = usePostMqttSubscribeMutation();

  const handleMqttStartStop = async () => {
    if (mqttStatusData?.isConnected) {
      await refetchMqttStop();
    } else {
      await refetchMqttStart();
    }
    refetchMqttStatus();
  };

  const handleSubscribePress = async (topic: string) => {
    await postSubscribe({
      topic: topic
    });
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (mqttStatusData?.isConnected) {
      refetchMqttMessages();
      interval = setInterval(() => {
        if (mqttStatusData?.isConnected) {
          refetchMqttMessages();
        }
      }, Number(timeSeconds || '10') * 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [mqttStatusData?.isConnected, timeSeconds]);

  return (
    <Card className={cn(`p-4 gap-3`, className)}>
      <CardHeader className="p-0 gap-0">
        <CardTitle className="flex flex-col gap-0 p-0">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <span>MQTT</span>

            <div className="flex flex-row items-center justify-start gap-2">
              <Button
                size="icon"
                variant="outline"
                className="px-2 py-1 rounded-md w-min h-min"
                disabled={isStopPending || isStartPending || isMqttStatusLoading}
                loading={isMqttStatusLoading}
                onClick={handleMqttStartStop}
              >
                {mqttStatusData?.isConnected ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
                {mqttStatusData?.isConnected ? <span>Durdur</span> : <span>Başlat</span>}
              </Button>

              <AppDialog.Dialog>
                <AppDialog.Trigger asChild>
                  <Button
                    size="icon"
                    variant="outline"
                    className="px-2 py-1 rounded-md w-min h-min"
                    disabled={isSubscribePending}
                    loading={isSubscribePending}
                  >
                    Abonelikler
                  </Button>
                </AppDialog.Trigger>

                <AppDialog.Content
                  className="md:min-w-2xl"
                  title={'Abonelikler'}
                  description={'Aboneliklerinizi bu alandan yönetebilirsiniz.'}
                >
                  <MqttSubscribeTerminalContent />
                </AppDialog.Content>
              </AppDialog.Dialog>

              <CustomSelectBox
                value={timeSeconds}
                onValueChange={(value) => setTimeSeconds(value)}
                placeholder="Süre (sn)"
                data={[
                  { value: '1', label: '1 sn' },
                  { value: '5', label: '5 sn' },
                  { value: '10', label: '10 sn' },
                  { value: '30', label: '30 sn' },
                  { value: '60', label: '60 sn' }
                ]}
                height={'30px'}
                className="rounded-md"
              />
            </div>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="w-full h-full flex flex-col gap-3 p-0 overflow-scroll">
        {!isMqttMessagesFetching &&
          !isMqttMessagesLoading &&
          !isMqttMessagesRefetching &&
          mqttMessagesData?.messages?.map((message, index) => (
            <div key={index} className="p-4 space-y-0 flex flex-col gap-3 border rounded-lg transition-shadow" onClick={() => {}}>
              <div className="w-full flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="p-1 w-min h-min"
                  onClick={() => handleSubscribePress(message.topic)}
                >
                  <ListVideo size={20} />
                </Button>

                <div className="w-full flex flex-row items-center justify-between gap-2">
                  <div className="flex flex-col">
                    <h3 className="text-base font-semibold">{message.customer.customerName}</h3>
                    <span className="text-xs text-muted-foreground break-all whitespace-normal">{message.topic}</span>
                  </div>

                  <Badge variant="outline" className="font-medium">
                    {message.customer.customerCode}
                  </Badge>
                </div>
              </div>

              <Badge variant="link" className="w-full flex flex-wrap justify-between font-medium text-sm p-3">
                <span className="flex items-center gap-1.5">
                  <MonitorCog size={16} />
                  {message.machine.machineName}
                </span>

                <span className="flex items-center gap-1.5">Version: {message.machine.version}</span>
              </Badge>

              <div className="w-full flex flex-wrap items-center justify-start gap-2">
                <Badge variant={'default'}>
                  <ArrowRightLeft size={14} />
                  Process:
                  <span className="text-xs font-medium break-words whitespace-pre-wrap">{message.data.process}</span>
                </Badge>

                <Badge variant={'outline'}>
                  <Pause size={14} />
                  Status:
                  <span className="text-xs font-medium break-words whitespace-pre-wrap">{message.data.status}</span>
                </Badge>

                <Badge variant={'destructive'} className="text-white">
                  <MonitorCog size={14} />
                  Timestamp:
                  <span className="text-xs font-medium break-words whitespace-pre-wrap">{message.data.timestamp}</span>
                </Badge>
              </div>

              <span className="text-xs text-muted-foreground">{formatDateWithTime(message?.receivedAt)}</span>
            </div>
          ))}

        {(isMqttMessagesLoading || isMqttMessagesRefetching || isMqttMessagesFetching) && (
          <div className="space-y-3">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="p-4 space-y-0 flex flex-col gap-3 border rounded-lg transition-shadow">
                <div className="w-full flex items-center gap-2">
                  <Skeleton className="w-8 h-8 rounded-md" />
                  <div className="w-full flex flex-row items-center justify-between gap-2">
                    <div className="flex flex-col w-full">
                      <Skeleton className="mb-1 w-1/3 h-4 rounded-md" />
                      <Skeleton className="w-full h-3 rounded-md" />
                    </div>
                    <Skeleton className="w-12 h-6 rounded-md" />
                  </div>
                </div>

                <Skeleton className="w-full h-10 rounded-md" />

                <div className="w-full flex flex-wrap items-center justify-start gap-2">
                  <Skeleton className="w-32 h-6 rounded-md" />
                  <Skeleton className="w-32 h-6 rounded-md" />
                  <Skeleton className="w-32 h-6 rounded-md" />
                </div>

                <Skeleton className="w-1/4 h-3 rounded-md" />
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MqttMessageCard;
