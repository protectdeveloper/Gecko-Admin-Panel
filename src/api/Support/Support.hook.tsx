import { toast } from 'sonner';
import { SupportApi } from './Support.api';
import { useMutation, useQuery } from '@tanstack/react-query';
import { GetSupportAdminTicketMessagesByIdParams, GetSupportAdminTicketsParams } from './Support.types';

export const getSupportAdminTicketsQueryOptions = (params: GetSupportAdminTicketsParams) => ({
  queryKey: ['getSupportAdminTickets', params],
  queryFn: () => SupportApi.getSupportAdminTickets(params),
  refetchInterval: 10000, // 10 saniye
  refetchIntervalInBackground: true // Sayfa arka plandayken bile çalışır
});

export const useGetSupportAdminTicketsQuery = (params: GetSupportAdminTicketsParams) => {
  return useQuery(getSupportAdminTicketsQueryOptions(params));
};

export const getSupportAdminTicketMessagesByIdQueryOptions = (params: GetSupportAdminTicketMessagesByIdParams) => ({
  queryKey: ['getSupportAdminTicketMessagesById', params.ticketId],
  queryFn: () => SupportApi.getSupportAdminTicketMessagesById(params),
  enabled: params.ticketId ? true : false
});

export const useGetSupportAdminTicketMessagesByIdQuery = (params: GetSupportAdminTicketMessagesByIdParams) => {
  return useQuery(getSupportAdminTicketMessagesByIdQueryOptions(params));
};

export const useSupportAdminTicketSendMessageMutation = () => {
  return useMutation({
    mutationFn: SupportApi.postSupportAdminTicketSendMessage,
    onSuccess: async (data) => {
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

export const useSupportAdminTicketEditMessageMutation = () => {
  return useMutation({
    mutationFn: SupportApi.putSupportAdminTicketEditMessage,
    onSuccess: (data) => {
      if (data?.success) {
      } else {
        toast.error(data?.error || 'Destek bileti mesajı düzenlenirken bir hata oluştu.');
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.error || 'Destek bileti mesajı düzenlenirken bir hata oluştu.');
    }
  });
};

export const useSupportAdminTicketDeleteMessageMutation = () => {
  return useMutation({
    mutationFn: SupportApi.deleteSupportAdminTicketDeleteMessage,
    onSuccess: (data) => {
      if (data?.success) {
      } else {
        toast.error(data?.error || 'Destek bileti mesajı silinirken bir hata oluştu.');
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.error || 'Destek bileti mesajı silinirken bir hata oluştu.');
    }
  });
};

export const useSupportAdminTicketSendMessagePhotoMutation = () => {
  return useMutation({
    mutationFn: SupportApi.postSupportAdminTicketSendMessagePhoto,
    onSuccess: (data) => {
      if (data?.success) {
      } else {
        toast.error(data?.error || 'Fotoğraf yüklenirken bir hata oluştu.');
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.error || 'Fotoğraf yüklenirken bir hata oluştu.');
    }
  });
};
