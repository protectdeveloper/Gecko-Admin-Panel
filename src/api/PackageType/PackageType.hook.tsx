import { toast } from 'sonner';
import { PackageTypeApi } from './PackageType.api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { GetManagementPackageTypeParams, PutManagementPackageTypeByIdParams } from './PackageType.types';

export const getManagementPackageTypeQueryOptions = (params: GetManagementPackageTypeParams) => ({
  queryKey: ['getManagementPackageType', params],
  queryFn: () => PackageTypeApi.getManagementPackageType(params)
});

export const useGetPackageTypeQuery = (params: GetManagementPackageTypeParams) => {
  return useQuery(getManagementPackageTypeQueryOptions(params));
};

export const getManagementPackageTypeByIdQueryOptions = (id: string) => ({
  queryKey: ['getManagementPackageTypeById', id],
  queryFn: () => PackageTypeApi.getManagementPackageTypeById(id),
  enabled: !!id
});

export const useGetPackageTypeByIdQuery = (id: string) => {
  return useQuery(getManagementPackageTypeByIdQueryOptions(id));
};

export const usePostCreatePackageTypeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: PackageTypeApi.postCreateManagementPackageType,
    onSuccess: async (data, variables) => {
      if (data?.success) {
        toast.success(data.message || 'Paket tipi başarıyla oluşturuldu.');
        await queryClient.invalidateQueries({ queryKey: ['getManagementPackageType'] });
      } else {
        toast.error(data?.error || 'Paket tipi oluşturulurken bir hata oluştu.');
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.error || 'Paket tipi oluşturulurken bir hata oluştu.');
    }
  });
};

export const usePutPackageTypeByIdMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, body }: { id: string; body: PutManagementPackageTypeByIdParams }) =>
      PackageTypeApi.putManagementPackageTypeById(id, body),
    onSuccess: async (data, variables) => {
      if (data?.success) {
        toast.success(data.message || 'Paket tipi başarıyla güncellendi.');
        await queryClient.invalidateQueries({ queryKey: ['getManagementPackageType'] });
        await queryClient.invalidateQueries({ queryKey: ['getManagementPackageTypeById', variables.id] });
      } else {
        toast.error(data?.error || 'Paket tipi güncellenirken bir hata oluştu.');
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.error || 'Paket tipi güncellenirken bir hata oluştu.');
    }
  });
};

export const useDeletePackageTypeByIdMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: PackageTypeApi.deleteManagementPackageTypeById,
    onSuccess: async (data) => {
      if (data?.success) {
        toast.success(data.message || 'Paket tipi başarıyla silindi.');
        await queryClient.invalidateQueries({ queryKey: ['getManagementPackageType'] });
      } else {
        toast.error(data?.error || 'Paket tipi silinirken bir hata oluştu.');
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.error || 'Paket tipi silinirken bir hata oluştu.');
    }
  });
};
