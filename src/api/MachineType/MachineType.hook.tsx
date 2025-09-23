import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { MachineTypeApi } from './MachineType.api';
import { GetManagementMachineTypesParams, PutManagementMachineTypeByIdParams } from './MachineType.types';
import { toast } from 'sonner';

export const getMachineTypesQueryOptions = (params: GetManagementMachineTypesParams) => ({
  queryKey: ['getManagementMachineTypes', params],
  queryFn: () => MachineTypeApi.getManagementMachineTypes(params)
});

export const useGetMachineTypesQuery = (params: GetManagementMachineTypesParams) => {
  return useQuery(getMachineTypesQueryOptions(params));
};

export const getMachineTypeByIdQueryOptions = (id: string) => ({
  queryKey: ['getManagementMachineTypeById', id],
  queryFn: () => MachineTypeApi.getManagementMachineTypeById(id),
  enabled: !!id
});

export const useGetMachineTypeByIdQuery = (id: string) => {
  return useQuery(getMachineTypeByIdQueryOptions(id));
};

export const usePostCreateMachineTypeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: MachineTypeApi.postCreateManagementMachineType,
    onSuccess: async (data, variables) => {
      if (data?.success) {
        toast.success(data.message || 'Firma başarıyla oluşturuldu.');
        await queryClient.invalidateQueries({ queryKey: ['getManagementMachineTypes'] });
      } else {
        toast.error(data?.error || 'Firma oluşturulurken bir hata oluştu.');
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.error || 'Firma oluşturulurken bir hata oluştu.');
    }
  });
};

export const usePutUpdateMachineTypeByIdMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, body }: { id: string; body: PutManagementMachineTypeByIdParams }) =>
      MachineTypeApi.putManagementMachineTypeById(id, body),
    onSuccess: async (data, variables) => {
      if (data?.success) {
        toast.success(data.message || 'Firma başarıyla güncellendi.');
        await queryClient.invalidateQueries({ queryKey: ['getManagementMachineTypes'] });
        await queryClient.invalidateQueries({ queryKey: ['getManagementMachineTypeById', variables.id] });
      } else {
        toast.error(data?.error || 'Firma güncellenirken bir hata oluştu.');
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.error || 'Firma güncellenirken bir hata oluştu.');
    }
  });
};

export const useDeleteMachineTypeByIdMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: MachineTypeApi.deleteManagementMachineTypeById,
    onSuccess: async (data) => {
      if (data?.success) {
        toast.success(data.message || 'Firma başarıyla silindi.');
        await queryClient.invalidateQueries({ queryKey: ['getManagementMachineTypes'] });
      } else {
        toast.error(data?.error || 'Firma silinirken bir hata oluştu.');
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.error || 'Firma silinirken bir hata oluştu.');
    }
  });
};
