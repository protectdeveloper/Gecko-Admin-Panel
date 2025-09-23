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

export const usePostMqttStartMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: MqttApi.postMqttStart,
    onSuccess: async (data) => {
      if (data?.success) {
        toast.success(data.message || 'MQTT başarıyla başlatıldı.');
        await queryClient.refetchQueries({ queryKey: ['getMqttStatus'] });
      } else {
        toast.error(data?.error || 'MQTT başlatılırken bir hata oluştu.');
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.error || 'MQTT başlatılırken bir hata oluştu.');
    }
  });
};

export const usePostMqttStopMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: MqttApi.postMqttStop,
    onSuccess: async (data) => {
      if (data?.success) {
        toast.success(data.message || 'MQTT başarıyla durduruldu.');
        await queryClient.refetchQueries({ queryKey: ['getMqttStatus'] });
      } else {
        toast.error(data?.error || 'MQTT durdurulurken bir hata oluştu.');
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.error || 'MQTT durdurulurken bir hata oluştu.');
    }
  });
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
