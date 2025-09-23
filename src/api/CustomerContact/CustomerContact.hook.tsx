import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { CustomerContactApi } from './CustomerContact.api';
import { GetManagementCustomerContactParams, PutManagementCustomerContactByIdParams } from './CustomerContact.types';

export const getCustomerContactQueryOptions = (params: GetManagementCustomerContactParams) => ({
  queryKey: ['getManagementCustomerContact', params],
  queryFn: () => CustomerContactApi.getManagementCustomerContact(params)
});

export const useGetCustomerContactQuery = (params: GetManagementCustomerContactParams) => {
  return useQuery(getCustomerContactQueryOptions(params));
};

export const getCustomerContactByIdQueryOptions = (id: string) => ({
  queryKey: ['getManagementCustomerContactById', id],
  queryFn: () => CustomerContactApi.getManagementCustomerContactById(id),
  enabled: !!id
});

export const useGetCustomerContactByIdQuery = (id: string) => {
  return useQuery(getCustomerContactByIdQueryOptions(id));
};

export const usePostCreateCustomerContactMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: CustomerContactApi.postCreateManagementCustomerContact,
    onSuccess: async (data, variables) => {
      if (data?.success) {
        toast.success(data.message || 'Firma başarıyla oluşturuldu.');
        await queryClient.invalidateQueries({ queryKey: ['getManagementCustomerContact'] });
      } else {
        toast.error(data?.error || 'Firma iletişim bilgisi oluşturulurken bir hata oluştu.');
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.error || 'Firma iletişim bilgisi oluşturulurken bir hata oluştu.');
    }
  });
};

export const usePutUpdateCustomerContactByIdMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, body }: { id: string; body: PutManagementCustomerContactByIdParams }) =>
      CustomerContactApi.putManagementCustomerContactById(id, body),
    onSuccess: async (data, variables) => {
      if (data?.success) {
        toast.success(data.message || 'Firma iletişim bilgisi başarıyla güncellendi.');
        await queryClient.invalidateQueries({ queryKey: ['getManagementCustomerContact'] });
        await queryClient.invalidateQueries({ queryKey: ['getManagementCustomerContactById', variables.id] });
      } else {
        toast.error(data?.error || 'Firma iletişim bilgisi güncellenirken bir hata oluştu.');
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.error || 'Firma iletişim bilgisi güncellenirken bir hata oluştu.');
    }
  });
};

export const useDeleteCustomerContactByIdMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: CustomerContactApi.deleteManagementCustomerContactById,
    onSuccess: async (data) => {
      if (data?.success) {
        toast.success(data.message || 'Firma başarıyla silindi.');
        await queryClient.invalidateQueries({ queryKey: ['getManagementCustomerContact'] });
      } else {
        toast.error(data?.error || 'Firma iletişim bilgisi silinirken bir hata oluştu.');
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.error || 'Firma iletişim bilgisi silinirken bir hata oluştu.');
    }
  });
};
