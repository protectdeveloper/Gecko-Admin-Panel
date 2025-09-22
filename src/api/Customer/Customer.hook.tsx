import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CustomerApi } from './Customer.api';
import { GetManagementCustomersParams, PutManagementCustomerByIdParams } from './Customer.types';
import { toast } from 'sonner';

export const getCustomersQueryOptions = (params: GetManagementCustomersParams) => ({
  queryKey: ['getManagementCustomers', params],
  queryFn: () => CustomerApi.getManagementCustomers(params)
});

export const useGetCustomersQuery = (params: GetManagementCustomersParams) => {
  return useQuery(getCustomersQueryOptions(params));
};

export const getCustomerByIdQueryOptions = (id: string) => ({
  queryKey: ['getManagementCustomerById', id],
  queryFn: () => CustomerApi.getManagementCustomerById(id),
  enabled: !!id
});

export const useGetCustomerByIdQuery = (id: string) => {
  return useQuery(getCustomerByIdQueryOptions(id));
};

export const usePostCreateCustomerMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: CustomerApi.postCreateManagementCustomer,
    onSuccess: async (data, variables) => {
      if (data?.success) {
        toast.success(data.message || 'Firma başarıyla oluşturuldu.');
        await queryClient.invalidateQueries({ queryKey: ['getManagementCustomers'] });
      } else {
        toast.error(data?.error || 'Firma oluşturulurken bir hata oluştu.');
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.error || 'Firma oluşturulurken bir hata oluştu.');
    }
  });
};

export const usePutUpdateCustomerByIdMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, body }: { id: string; body: PutManagementCustomerByIdParams }) =>
      CustomerApi.putManagementCustomerById(id, body),
    onSuccess: async (data, variables) => {
      if (data?.success) {
        toast.success(data.message || 'Firma başarıyla güncellendi.');
        await queryClient.invalidateQueries({ queryKey: ['getManagementCustomers'] });
        await queryClient.invalidateQueries({ queryKey: ['getManagementCustomerById', variables.id] });
      } else {
        toast.error(data?.error || 'Firma güncellenirken bir hata oluştu.');
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.error || 'Firma güncellenirken bir hata oluştu.');
    }
  });
};

export const useDeleteCustomerByIdMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: CustomerApi.deleteManagementCustomerById,
    onSuccess: async (data) => {
      if (data?.success) {
        toast.success(data.message || 'Firma başarıyla silindi.');
        await queryClient.invalidateQueries({ queryKey: ['getManagementCustomers'] });
      } else {
        toast.error(data?.error || 'Firma silinirken bir hata oluştu.');
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.error || 'Firma silinirken bir hata oluştu.');
    }
  });
};
