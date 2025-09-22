import { toast } from 'sonner';
import { PackageApi } from './Package.api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { GetManagementPackageParams, PutManagementPackageByIdParams } from './Package.types';

export const getManagementPackageQueryOptions = (params: GetManagementPackageParams) => ({
  queryKey: ['getManagementPackage', params],
  queryFn: () => PackageApi.getManagementPackage(params)
});

export const useGetManagementPackageQuery = (params: GetManagementPackageParams) => {
  return useQuery(getManagementPackageQueryOptions(params));
};

export const getManagementPackageByIdQueryOptions = (id: string) => ({
  queryKey: ['getManagementPackageById', id],
  queryFn: () => PackageApi.getManagementPackageById(id),
  enabled: !!id
});

export const useGetManagementPackageByIdQuery = (id: string) => {
  return useQuery(getManagementPackageByIdQueryOptions(id));
};

export const usePostCreateManagementPackageMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: PackageApi.postCreateManagementPackage,
    onSuccess: async (data, variables) => {
      if (data?.success) {
        toast.success(data.message || 'Paket başarıyla oluşturuldu.');
        await queryClient.invalidateQueries({ queryKey: ['getManagementPackages'] });
      } else {
        toast.error(data?.error || 'Paket oluşturulurken bir hata oluştu.');
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.error || 'Paket oluşturulurken bir hata oluştu.');
    }
  });
};

export const usePutManagementPackageByIdMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, body }: { id: string; body: PutManagementPackageByIdParams }) =>
      PackageApi.putManagementPackageById(id, body),
    onSuccess: async (data, variables) => {
      if (data?.success) {
        toast.success(data.message || 'Paket başarıyla güncellendi.');
        await queryClient.invalidateQueries({ queryKey: ['getManagementPackages'] });
        await queryClient.invalidateQueries({ queryKey: ['getManagementPackageById', variables.id] });
      } else {
        toast.error(data?.error || 'Paket güncellenirken bir hata oluştu.');
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.error || 'Paket güncellenirken bir hata oluştu.');
    }
  });
};

export const useDeleteManagementPackageByIdMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: PackageApi.deleteManagementPackageById,
    onSuccess: async (data) => {
      if (data?.success) {
        toast.success(data.message || 'Paket başarıyla silindi.');
        await queryClient.invalidateQueries({ queryKey: ['getManagementPackages'] });
      } else {
        toast.error(data?.error || 'Paket silinirken bir hata oluştu.');
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.error || 'Paket silinirken bir hata oluştu.');
    }
  });
};
