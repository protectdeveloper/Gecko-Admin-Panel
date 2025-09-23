import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { MachineApi } from './Machine.api';
import { GetManagementMachinesParams, PutManagementMachineByIdParams } from './Machine.types';
import { toast } from 'sonner';

export const getMachinesQueryOptions = (params: GetManagementMachinesParams) => ({
  queryKey: ['getManagementMachines', params],
  queryFn: () => MachineApi.getManagementMachines(params)
});

export const useGetMachinesQuery = (params: GetManagementMachinesParams) => {
  return useQuery(getMachinesQueryOptions(params));
};

export const getMachineByIdQueryOptions = (id: string) => ({
  queryKey: ['getManagementMachineById', id],
  queryFn: () => MachineApi.getManagementMachineById(id),
  enabled: !!id
});

export const useGetMachineByIdQuery = (id: string) => {
  return useQuery(getMachineByIdQueryOptions(id));
};

export const usePostCreateMachineMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: MachineApi.postCreateManagementMachine,
    onSuccess: async (data, variables) => {
      if (data?.success) {
        toast.success(data.message || 'Firma başarıyla oluşturuldu.');
        await queryClient.invalidateQueries({ queryKey: ['getManagementMachines'] });
      } else {
        toast.error(data?.error || 'Firma oluşturulurken bir hata oluştu.');
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.error || 'Firma oluşturulurken bir hata oluştu.');
    }
  });
};

export const usePutUpdateMachineByIdMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, body }: { id: string; body: PutManagementMachineByIdParams }) =>
      MachineApi.putManagementMachineById(id, body),
    onSuccess: async (data, variables) => {
      if (data?.success) {
        toast.success(data.message || 'Firma başarıyla güncellendi.');
        await queryClient.invalidateQueries({ queryKey: ['getManagementMachines'] });
        await queryClient.invalidateQueries({ queryKey: ['getManagementMachineById', variables.id] });
      } else {
        toast.error(data?.error || 'Firma güncellenirken bir hata oluştu.');
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.error || 'Firma güncellenirken bir hata oluştu.');
    }
  });
};

export const useDeleteMachineByIdMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: MachineApi.deleteManagementMachineById,
    onSuccess: async (data) => {
      if (data?.success) {
        toast.success(data.message || 'Firma başarıyla silindi.');
        await queryClient.invalidateQueries({ queryKey: ['getManagementMachines'] });
      } else {
        toast.error(data?.error || 'Firma silinirken bir hata oluştu.');
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.error || 'Firma silinirken bir hata oluştu.');
    }
  });
};
