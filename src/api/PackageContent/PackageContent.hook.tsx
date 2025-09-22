import { toast } from 'sonner';
import { PackageContentApi } from './PackageContent.api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { GetManagementPackageContentParams, PutManagementPackageContentByIdParams } from './PackageContent.types';

export const getManagementPackageContentQueryOptions = (params: GetManagementPackageContentParams) => ({
  queryKey: ['getManagementPackageContent', params],
  queryFn: () => PackageContentApi.getManagementPackageContent(params)
});

export const useGetManagementPackageContentQuery = (params: GetManagementPackageContentParams) => {
  return useQuery(getManagementPackageContentQueryOptions(params));
};

export const getManagementPackageContentByIdQueryOptions = (id: string) => ({
  queryKey: ['getManagementPackageContentById', id],
  queryFn: () => PackageContentApi.getManagementPackageContentById(id),
  enabled: !!id
});

export const useGetManagementPackageContentByIdQuery = (id: string) => {
  return useQuery(getManagementPackageContentByIdQueryOptions(id));
};

export const usePostCreateManagementPackageContentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: PackageContentApi.postCreateManagementPackageContent,
    onSuccess: async (data, variables) => {
      if (data?.success) {
        toast.success(data.message || 'Paket içeriği başarıyla oluşturuldu.');
        await queryClient.invalidateQueries({ queryKey: ['getManagementPackageContent'] });
      } else {
        toast.error(data?.error || 'Paket içeriği oluşturulurken bir hata oluştu.');
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.error || 'Paket içeriği oluşturulurken bir hata oluştu.');
    }
  });
};

export const usePutManagementPackageContentByIdMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, body }: { id: string; body: PutManagementPackageContentByIdParams }) =>
      PackageContentApi.putManagementPackageContentById(id, body),
    onSuccess: async (data, variables) => {
      if (data?.success) {
        toast.success(data.message || 'Paket içeriği başarıyla güncellendi.');
        await queryClient.invalidateQueries({ queryKey: ['getManagementPackageContent'] });
        await queryClient.invalidateQueries({ queryKey: ['getManagementPackageContentById', variables.id] });
      } else {
        toast.error(data?.error || 'Paket içeriği güncellenirken bir hata oluştu.');
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.error || 'Paket içeriği güncellenirken bir hata oluştu.');
    }
  });
};

export const useDeleteManagementPackageContentByIdMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: PackageContentApi.deleteManagementPackageContentById,
    onSuccess: async (data) => {
      if (data?.success) {
        toast.success(data.message || 'Paket içeriği başarıyla silindi.');
        await queryClient.invalidateQueries({ queryKey: ['getManagementPackageContent'] });
      } else {
        toast.error(data?.error || 'Paket içeriği silinirken bir hata oluştu.');
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.error || 'Paket içeriği silinirken bir hata oluştu.');
    }
  });
};
