'use client';
import React from 'react';
import { useGetMqttSubscribeTerminalStatusQuery, usePostMqttUnsubscribeMutation } from '@/api/Mqtt/Mqtt.hook';

const MqttSubscribeTerminalContent = () => {
  const { data: mqttSubscribeTerminalStatusData, isLoading } = useGetMqttSubscribeTerminalStatusQuery();
  const { mutateAsync: postUnsubscribe, isPending: isUnsubscribePending } = usePostMqttUnsubscribeMutation();

  const handleUnsubscribePress = async (topic: string) => {
    await postUnsubscribe({
      topic: topic
    });
  };

  return <div className="w-full flex flex-col"></div>;
};

export default MqttSubscribeTerminalContent;
