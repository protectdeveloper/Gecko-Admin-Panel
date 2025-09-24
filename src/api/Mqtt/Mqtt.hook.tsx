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

export const getMqttMessagesQueryOptions = (sort: string) => ({
  queryKey: ['getMqttMessages', sort],
  queryFn: () => MqttApi.getMqttMessages(sort)
});

export const useGetMqttMessagesQuery = (sort?: string) => {
  return useQuery(getMqttMessagesQueryOptions(sort || ''));
};

export const getMqttStartQueryOptions = {
  queryKey: ['getMqttStart'],
  queryFn: MqttApi.getMqttStart
};

export const useGetMqttStartQuery = () => {
  return useQuery(getMqttStartQueryOptions);
};

export const getMqttStopQueryOptions = {
  queryKey: ['getMqttStop'],
  queryFn: MqttApi.getMqttStop
};

export const useGetMqttStopQuery = () => {
  return useQuery(getMqttStopQueryOptions);
};

export const usePostMqttSubscribeTerminalStatusMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: MqttApi.postMqttSubscribeTerminalStatus,
    onSuccess: async (data, variables) => {
      if (data?.success) {
        toast.success(data.message || 'Terminal durumu aboneliği başarıyla başlatıldı.');
      } else {
        toast.error(data?.error || 'Terminal durumu aboneliği başlatılırken bir hata oluştu.');
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.error || 'Terminal durumu aboneliği başlatılırken bir hata oluştu.');
    }
  });
};

export const usePostMqttSubscribeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (topic: string) => MqttApi.postMqttSubscribe(topic),
    onSuccess: async (data) => {
      if (data?.success) {
        toast.success(data.message || 'Abonelik başarıyla başlatıldı.');
        await queryClient.refetchQueries({ queryKey: ['getMqttStatus'] });
      } else {
        toast.error(data?.error || 'Abonelik başlatılırken bir hata oluştu.');
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.error || 'Abonelik başlatılırken bir hata oluştu.');
    }
  });
};

export const usePostMqttUnsubscribeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (topic: string) => MqttApi.postMqttUnsubscribe(topic),
    onSuccess: async (data) => {
      if (data?.success) {
        toast.success(data.message || 'Abonelik başarıyla iptal edildi.');
        await queryClient.refetchQueries({ queryKey: ['getMqttStatus'] });
      } else {
        toast.error(data?.error || 'Abonelik iptal edilirken bir hata oluştu.');
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.error || 'Abonelik iptal edilirken bir hata oluştu.');
    }
  });
};
