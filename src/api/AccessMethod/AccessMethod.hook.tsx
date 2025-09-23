import { toast } from 'sonner';
import { AccessMethodApi } from './AccessMethod.api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { GetManagementAccessMethodParams, PutManagementAccessMethodByIdParams } from './AccessMethod.types';

export const getManagementAccessMethodQueryOptions = (params: GetManagementAccessMethodParams) => ({
  queryKey: ['getManagementAccessMethod', params],
  queryFn: () => AccessMethodApi.getManagementAccessMethod(params)
});

export const useGetAccessMethodQuery = (params: GetManagementAccessMethodParams) => {
  return useQuery(getManagementAccessMethodQueryOptions(params));
};

export const getManagementAccessMethodByIdQueryOptions = (id: string) => ({
  queryKey: ['getManagementAccessMethodById', id],
  queryFn: () => AccessMethodApi.getManagementAccessMethodById(id),
  enabled: !!id
});

export const useGetAccessMethodByIdQuery = (id: string) => {
  return useQuery(getManagementAccessMethodByIdQueryOptions(id));
};

export const usePostCreateAccessMethodMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: AccessMethodApi.postCreateManagementAccessMethod,
    onSuccess: async (data, variables) => {
      if (data?.success) {
        toast.success(data.message || 'Erişim yöntemi başarıyla oluşturuldu.');
        await queryClient.invalidateQueries({ queryKey: ['getManagementAccessMethod'] });
      } else {
        toast.error(data?.error || 'Erişim yöntemi oluşturulurken bir hata oluştu.');
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.error || 'Erişim yöntemi oluşturulurken bir hata oluştu.');
    }
  });
};

export const usePutAccessMethodByIdMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, body }: { id: string; body: PutManagementAccessMethodByIdParams }) =>
      AccessMethodApi.putManagementAccessMethodById(id, body),
    onSuccess: async (data, variables) => {
      if (data?.success) {
        toast.success(data.message || 'Erişim yöntemi başarıyla güncellendi.');
        await queryClient.invalidateQueries({ queryKey: ['getManagementAccessMethod'] });
        await queryClient.invalidateQueries({ queryKey: ['getManagementAccessMethodById', variables.id] });
      } else {
        toast.error(data?.error || 'Erişim yöntemi güncellenirken bir hata oluştu.');
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.error || 'Erişim yöntemi güncellenirken bir hata oluştu.');
    }
  });
};

export const useDeleteAccessMethodByIdMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: AccessMethodApi.deleteManagementAccessMethodById,
    onSuccess: async (data) => {
      if (data?.success) {
        toast.success(data.message || 'Erişim yöntemi başarıyla silindi.');
        await queryClient.invalidateQueries({ queryKey: ['getManagementAccessMethod'] });
      } else {
        toast.error(data?.error || 'Erişim yöntemi silinirken bir hata oluştu.');
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.error || 'Erişim yöntemi silinirken bir hata oluştu.');
    }
  });
};
