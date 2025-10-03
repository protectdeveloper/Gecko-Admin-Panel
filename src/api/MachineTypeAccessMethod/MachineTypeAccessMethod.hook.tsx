import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { MachineTypeAccessMethodApi } from './MachineTypeAccessMethod.api';
import {
  GetManagementMachineTypeAccessMethodsParams,
  PutManagementMachineTypeAccessMethodByIdParams
} from './MachineTypeAccessMethod.types';
import { toast } from 'sonner';

export const getMachineTypeAccessMethodsQueryOptions = (params: GetManagementMachineTypeAccessMethodsParams) => ({
  queryKey: ['getManagementMachineTypeAccessMethods', params],
  queryFn: () => MachineTypeAccessMethodApi.getManagementMachineTypeAccessMethods(params)
});

export const useGetMachineTypeAccessMethodsQuery = (params: GetManagementMachineTypeAccessMethodsParams) => {
  return useQuery(getMachineTypeAccessMethodsQueryOptions(params));
};

export const getMachineTypeAccessMethodByIdQueryOptions = (id: string) => ({
  queryKey: ['getManagementMachineTypeAccessMethodById', id],
  queryFn: () => MachineTypeAccessMethodApi.getManagementMachineTypeAccessMethodById(id),
  enabled: !!id
});

export const useGetMachineTypeAccessMethodByIdQuery = (id: string) => {
  return useQuery(getMachineTypeAccessMethodByIdQueryOptions(id));
};

export const usePostCreateMachineTypeAccessMethodMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: MachineTypeAccessMethodApi.postCreateManagementMachineTypeAccessMethod,
    onSuccess: async (data) => {
      if (data?.success) {
        toast.success(data.message || 'Firma başarıyla oluşturuldu.');
        await queryClient.invalidateQueries({ queryKey: ['getManagementMachineTypeAccessMethods'] });
      } else {
        toast.error(data?.error || 'Firma oluşturulurken bir hata oluştu.');
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.error || 'Firma oluşturulurken bir hata oluştu.');
    }
  });
};

export const usePutUpdateMachineTypeAccessMethodByIdMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, body }: { id: string; body: PutManagementMachineTypeAccessMethodByIdParams }) =>
      MachineTypeAccessMethodApi.putManagementMachineTypeAccessMethodById(id, body),
    onSuccess: async (data, variables) => {
      if (data?.success) {
        toast.success(data.message || 'Firma başarıyla güncellendi.');
        await queryClient.invalidateQueries({ queryKey: ['getManagementMachineTypeAccessMethods'] });
        await queryClient.refetchQueries({ queryKey: ['getManagementMachineTypeAccessMethodById', variables.id] });
      } else {
        toast.error(data?.error || 'Firma güncellenirken bir hata oluştu.');
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.error || 'Firma güncellenirken bir hata oluştu.');
    }
  });
};

export const useDeleteMachineTypeAccessMethodByIdMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: MachineTypeAccessMethodApi.deleteManagementMachineTypeAccessMethodById,
    onSuccess: async (data) => {
      if (data?.success) {
        toast.success(data.message || 'Firma başarıyla silindi.');
        await queryClient.invalidateQueries({ queryKey: ['getManagementMachineTypeAccessMethods'] });
      } else {
        toast.error(data?.error || 'Firma silinirken bir hata oluştu.');
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.error || 'Firma silinirken bir hata oluştu.');
    }
  });
};
