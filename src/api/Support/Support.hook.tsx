import { SupportApi } from './Support.api';
import { GetSupportUserTicketMessagesByIdParams, GetSupportUserTicketsParams } from './Support.types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const getSupportUserTicketsQueryOptions = (params: GetSupportUserTicketsParams) => ({
  queryKey: ['getSupportUserTickets', params],
  queryFn: () => SupportApi.getSupportUserTickets(params)
});

export const useGetSupportUserTicketsQuery = (params: GetSupportUserTicketsParams) => {
  return useQuery(getSupportUserTicketsQueryOptions(params));
};

export const getSupportUserTicketMessagesByIdQueryOptions = (params: GetSupportUserTicketMessagesByIdParams) => ({
  queryKey: ['getSupportUserTicketMessagesById', params.ticketId],
  queryFn: () => SupportApi.getSupportUserTicketMessagesById(params),
  enabled: params.ticketId ? true : false
});

export const useGetSupportUserTicketMessagesByIdQuery = (params: GetSupportUserTicketMessagesByIdParams) => {
  return useQuery(getSupportUserTicketMessagesByIdQueryOptions(params));
};

export const useSupportUserCreateTicketsMutation = () => {
  return useMutation({
    mutationFn: SupportApi.postCreateSupportUserTickets,
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error: any) => {
      toast.error(error?.response?.message || 'Destek bileti oluşturulurken bir hata oluştu.');
    }
  });
};

export const useSupportUserTicketSendMessageMutation = () => {
  return useMutation({
    mutationFn: SupportApi.postSupportUserTicketSendMessage,
    onSuccess: async (data, variables) => {
      if (data?.success) {
      } else {
        toast.error(data?.message || 'Destek bileti mesajı gönderilirken bir hata oluştu.');
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.message || 'Destek bileti mesajı gönderilirken bir hata oluştu.');
    }
  });
};

export const useSupportUserTicketEditMessageMutation = () => {
  return useMutation({
    mutationFn: SupportApi.putSupportUserTicketEditMessage,
    onSuccess: (data) => {},
    onError: (error: any) => {
      toast.error(error?.response?.message || 'Destek bileti mesajı düzenlenirken bir hata oluştu.');
    }
  });
};

export const useSupportUserTicketDeleteMessageMutation = () => {
  return useMutation({
    mutationFn: SupportApi.deleteSupportUserTicketDeleteMessage,
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error: any) => {
      toast.error(error?.response?.message || 'Destek bileti mesajı silinirken bir hata oluştu.');
    }
  });
};

export const useSupportUserTicketSendMessagePhotoMutation = () => {
  return useMutation({
    mutationFn: SupportApi.postSupportUserTicketSendMessagePhoto,
    onSuccess: (data) => {
      if (data?.success) {
      } else {
        toast.error(data?.message || 'Fotoğraf yüklenirken bir hata oluştu.');
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.message || 'Fotoğraf yüklenirken bir hata oluştu.');
    }
  });
};
