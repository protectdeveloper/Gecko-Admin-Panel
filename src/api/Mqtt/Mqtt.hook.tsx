import { toast } from 'sonner';
import { MqttApi } from './Mqtt.api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const getMqttStatusQueryOptions = {
  queryKey: ['getMqttStatus'],
  queryFn: MqttApi.getMqttStatus
};

export const useGetMqttStatusQuery = () => {
  return useQuery(getMqttStatusQueryOptions);
};

export const getMqttMessagesQueryOptions = (sort: string, options = {}) => ({
  queryKey: ['getMqttMessages', sort],
  queryFn: () => MqttApi.getMqttMessages(sort),
  ...options
});

export const useGetMqttMessagesQuery = (sort?: string, options = {}) => {
  return useQuery(getMqttMessagesQueryOptions(sort || '', options));
};

export const getMqttStartQueryOptions = {
  queryKey: ['getMqttStart'],
  queryFn: MqttApi.getMqttStart
};

export const useGetMqttStartQuery = (options = {}) => {
  return useQuery({ ...getMqttStartQueryOptions, ...options });
};

export const getMqttStopQueryOptions = {
  queryKey: ['getMqttStop'],
  queryFn: MqttApi.getMqttStop
};

export const useGetMqttStopQuery = (options = {}) => {
  return useQuery({ ...getMqttStopQueryOptions, ...options });
};

export const getMqttSubscribeTerminalStatusQueryOptions = {
  queryKey: ['getMqttSubscribeTerminalStatus'],
  queryFn: MqttApi.getMqttSubscribeTerminalStatus
};

export const useGetMqttSubscribeTerminalStatusQuery = (options = {}) => {
  return useQuery({ ...getMqttSubscribeTerminalStatusQueryOptions, ...options });
};

export const usePostMqttSubscribeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: MqttApi.postMqttSubscribe,
    onSuccess: async (data) => {
      toast.success(data.message || 'Abonelik başarıyla başlatıldı.');
      await queryClient.refetchQueries({ queryKey: ['getMqttSubscribeTerminalStatus'] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.error || 'Abonelik başlatılırken bir hata oluştu.');
    }
  });
};

export const usePostMqttUnsubscribeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: MqttApi.postMqttUnsubscribe,
    onSuccess: async (data) => {
      toast.success(data.message || 'Abonelik başarıyla iptal edildi.');
      await queryClient.refetchQueries({ queryKey: ['getMqttSubscribeTerminalStatus'] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.error || 'Abonelik iptal edilirken bir hata oluştu.');
    }
  });
};
