import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { CustomerMachineApi } from './CustomerMachine.api';
import { GetManagementCustomerMachineParams, PutManagementCustomerMachineByIdParams } from './CustomerMachine.types';

export const getCustomerMachineQueryOptions = (params: GetManagementCustomerMachineParams) => ({
  queryKey: ['getManagementCustomerMachine', params],
  queryFn: () => CustomerMachineApi.getManagementCustomerMachine(params)
});

export const useGetCustomerMachineQuery = (params: GetManagementCustomerMachineParams) => {
  return useQuery(getCustomerMachineQueryOptions(params));
};

export const getCustomerMachineByIdQueryOptions = (id: string) => ({
  queryKey: ['getManagementCustomerMachineById', id],
  queryFn: () => CustomerMachineApi.getManagementCustomerMachineById(id),
  enabled: !!id
});

export const useGetCustomerMachineByIdQuery = (id: string) => {
  return useQuery(getCustomerMachineByIdQueryOptions(id));
};

export const usePostCreateCustomerMachineMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: CustomerMachineApi.postCreateManagementCustomerMachine,
    onSuccess: async (data, variables) => {
      if (data?.success) {
        toast.success(data.message || 'Firma makinesi oluşturuldu.');
        await queryClient.invalidateQueries({ queryKey: ['getManagementCustomerMachine'] });
      } else {
        toast.error(data?.error || 'Firma makinesi oluşturulurken bir hata oluştu.');
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.error || 'Firma makinesi oluşturulurken bir hata oluştu.');
    }
  });
};

export const usePutUpdateCustomerMachineByIdMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, body }: { id: string; body: PutManagementCustomerMachineByIdParams }) =>
      CustomerMachineApi.putManagementCustomerMachineById(id, body),
    onSuccess: async (data, variables) => {
      if (data?.success) {
        toast.success(data.message || 'Firma makinesi başarıyla güncellendi.');
        await queryClient.invalidateQueries({ queryKey: ['getManagementCustomerMachine'] });
        await queryClient.invalidateQueries({ queryKey: ['getManagementCustomerMachineById', variables.id] });
      } else {
        toast.error(data?.error || 'Firma makinesi güncellenirken bir hata oluştu.');
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.error || 'Firma makinesi güncellenirken bir hata oluştu.');
    }
  });
};

export const useDeleteCustomerMachineByIdMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: CustomerMachineApi.deleteManagementCustomerMachineById,
    onSuccess: async (data) => {
      if (data?.success) {
        toast.success(data.message || 'Firma makinesi başarıyla silindi.');
        await queryClient.invalidateQueries({ queryKey: ['getManagementCustomerMachine'] });
      } else {
        toast.error(data?.error || 'Firma makinesi silinirken bir hata oluştu.');
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.error || 'Firma makinesi silinirken bir hata oluştu.');
    }
  });
};
