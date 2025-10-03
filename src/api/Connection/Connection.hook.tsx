import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { ConnectionApi } from './Connection.api';
import {
  GetManagementConnectionCustomerByIdParams,
  GetManagementConnectionParams,
  PutManagementConnectionByIdParams
} from './Connection.types';

export const getManagementConnectionQueryOptions = (params: GetManagementConnectionParams) => ({
  queryKey: ['getManagementConnection', params],
  queryFn: () => ConnectionApi.getManagementConnection(params)
});

export const useGetConnectionQuery = (params: GetManagementConnectionParams) => {
  return useQuery(getManagementConnectionQueryOptions(params));
};

export const getManagementConnectionByIdQueryOptions = (id: string) => ({
  queryKey: ['getManagementConnectionById', id],
  queryFn: () => ConnectionApi.getManagementConnectionById(id),
  enabled: !!id
});

export const useGetConnectionByIdQuery = (id: string) => {
  return useQuery(getManagementConnectionByIdQueryOptions(id));
};

export const usePostCreateConnectionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: Parameters<typeof ConnectionApi.postCreateManagementConnection>[0]) =>
      ConnectionApi.postCreateManagementConnection(body),
    onSuccess: () => {
      toast.success('Bağlantı başarıyla oluşturuldu.');
      queryClient.invalidateQueries({ queryKey: ['getManagementConnection'] });
    },
    onError: () => {
      toast.error('Bağlantı oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.');
    }
  });
};

export const usePutConnectionByIdMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, body }: { id: string; body: PutManagementConnectionByIdParams }) =>
      ConnectionApi.putManagementConnectionById(id, body),
    onSuccess: async (data, variables) => {
      if (data?.success) {
        toast.success(data.message || 'Bağlantı başarıyla güncellendi.');
        await queryClient.invalidateQueries({ queryKey: ['getManagementConnection'] });
        await queryClient.refetchQueries({ queryKey: ['getManagementConnectionById', variables.id] });
      } else {
        toast.error(data?.error || 'Bağlantı güncellenirken bir hata oluştu.');
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.error || 'Bağlantı güncellenirken bir hata oluştu.');
    }
  });
};

export const useDeleteConnectionByIdMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ConnectionApi.deleteManagementConnectionById,
    onSuccess: async (data) => {
      if (data?.success) {
        toast.success(data.message || 'Bağlantı başarıyla silindi.');
        await queryClient.invalidateQueries({ queryKey: ['getManagementConnection'] });
      } else {
        toast.error(data?.error || 'Bağlantı silinirken bir hata oluştu.');
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.error || 'Bağlantı silinirken bir hata oluştu.');
    }
  });
};

export const getManagementConnectionCustomerByCustomerIdQueryOptions = (params: GetManagementConnectionCustomerByIdParams) => ({
  queryKey: ['getManagementConnectionCustomerByCustomerId', params],
  queryFn: () => ConnectionApi.getManagementConnectionCustomerByCustomerId(params),
  enabled: !!params.customerId
});

export const useGetConnectionCustomerByCustomerIdQuery = (params: GetManagementConnectionCustomerByIdParams) => {
  return useQuery(getManagementConnectionCustomerByCustomerIdQueryOptions(params));
};
