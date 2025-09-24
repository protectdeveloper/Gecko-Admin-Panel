import { toast } from 'sonner';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { GetManagementPublicHolidayParams, PutManagementPublicHolidayByIdParams } from './PublicHoliday.types';
import { PublicHolidayApi } from './PublicHoliday.api';

export const getManagementPublicHolidayQueryOptions = (params: GetManagementPublicHolidayParams) => ({
  queryKey: ['getManagementPublicHoliday', params],
  queryFn: () => PublicHolidayApi.getManagementPublicHoliday(params)
});

export const useGetPublicHolidayQuery = (params: GetManagementPublicHolidayParams) => {
  return useQuery(getManagementPublicHolidayQueryOptions(params));
};

export const getManagementPublicHolidayByIdQueryOptions = (id: string) => ({
  queryKey: ['getManagementPublicHolidayById', id],
  queryFn: () => PublicHolidayApi.getManagementPublicHolidayById(id),
  enabled: !!id
});

export const useGetPublicHolidayByIdQuery = (id: string) => {
  return useQuery(getManagementPublicHolidayByIdQueryOptions(id));
};

export const usePostCreatePublicHolidayMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: PublicHolidayApi.postCreateManagementPublicHoliday,
    onSuccess: async (data, variables) => {
      if (data?.success) {
        toast.success(data.message || 'Tatil başarıyla oluşturuldu.');
        await queryClient.invalidateQueries({ queryKey: ['getManagementPublicHoliday'] });
      } else {
        toast.error(data?.error || 'Tatil oluşturulurken bir hata oluştu.');
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.error || 'Tatil oluşturulurken bir hata oluştu.');
    }
  });
};

export const usePutPublicHolidayByIdMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, body }: { id: string; body: PutManagementPublicHolidayByIdParams }) =>
      PublicHolidayApi.putManagementPublicHolidayById(id, body),
    onSuccess: async (data, variables) => {
      if (data?.success) {
        toast.success(data.message || 'Tatil başarıyla güncellendi.');
        await queryClient.invalidateQueries({ queryKey: ['getManagementPublicHoliday'] });
        await queryClient.invalidateQueries({ queryKey: ['getManagementPublicHolidayById', variables.id] });
      } else {
        toast.error(data?.error || 'Tatil güncellenirken bir hata oluştu.');
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.error || 'Tatil güncellenirken bir hata oluştu.');
    }
  });
};

export const useDeletePublicHolidayByIdMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: PublicHolidayApi.deleteManagementPublicHolidayById,
    onSuccess: async (data) => {
      if (data?.success) {
        toast.success(data.message || 'Tatil başarıyla silindi.');
        await queryClient.invalidateQueries({ queryKey: ['getManagementPublicHoliday'] });
      } else {
        toast.error(data?.error || 'Tatil silinirken bir hata oluştu.');
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.error || 'Tatil silinirken bir hata oluştu.');
    }
  });
};

export const getManagementPublicHolidayByYearQueryOptions = (year: number) => ({
  queryKey: ['getManagementPublicHolidayByYear', year],
  queryFn: () => PublicHolidayApi.getManagementPublicHolidayByYear(year),
  enabled: !!year
});

export const useGetPublicHolidayByYearQuery = (year: number) => {
  return useQuery(getManagementPublicHolidayByYearQueryOptions(year));
};
