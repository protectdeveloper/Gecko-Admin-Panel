'use client';
import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react';
import { ArrowRightLeft, Pause, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import {
  useGetMqttMessagesQuery,
  useGetMqttStatusQuery,
  usePostMqttStartMutation,
  usePostMqttStopMutation,
  usePostMqttSubscribeMutation,
  usePostMqttSubscribeTerminalStatusMutation,
  usePostMqttUnsubscribeMutation
} from '@/api/Mqtt/Mqtt.hook';

interface Props {
  className?: string;
}

const MqttMessageCard = ({ className }: Props) => {
  const { mutateAsync: postStopMqtt, isPending: isStopPending } = usePostMqttStopMutation();
  const { mutateAsync: postStartMqtt, isPending: isStartPending } = usePostMqttStartMutation();
  const { mutateAsync: postSubscribe, isPending: isSubscribePending } = usePostMqttSubscribeMutation();
  const { mutateAsync: postUnsubscribe, isPending: isUnsubscribePending } = usePostMqttUnsubscribeMutation();
  const { mutateAsync: postSubscribeTerminalStatus, isPending: isSubscribeTerminalStatusPending } =
    usePostMqttSubscribeTerminalStatusMutation();

  const { data: mqttStatusData, isLoading: isMqttStatusLoading, refetch: refetchMqttStatus } = useGetMqttStatusQuery();
  const { data: mqttMessagesData, isLoading: isMqttMessagesLoading, refetch: refetchMqttMessages } = useGetMqttMessagesQuery();

  const handleMqttStartStop = async () => {
    if (mqttStatusData?.isConnected) {
      await postStopMqtt();
    } else {
      await postStartMqtt();
    }
  };

  return (
    <Card className={cn(`p-4 gap-3`, className)}>
      <CardHeader className="p-0 gap-0">
        <CardTitle className="flex flex-col gap-0 p-0">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <span>MQTT</span>

            <Button
              size="default"
              variant="outline"
              className="p-1.5 w-min h-min"
              disabled={isStopPending || isStartPending || isMqttStatusLoading}
              loading={isMqttStatusLoading}
              onClick={handleMqttStartStop}
            >
              {mqttStatusData?.isConnected ? <Pause /> : <Play />}
              {mqttStatusData?.isConnected ? <span>Durdur</span> : <span>Başlat</span>}
            </Button>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="w-full h-full flex flex-col gap-3 p-0 overflow-scroll"></CardContent>
    </Card>
  );
};

export default MqttMessageCard;
