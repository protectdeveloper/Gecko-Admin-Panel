import { toast } from 'sonner';
import { DatabaseApi } from './Database.api';
import { useMutation } from '@tanstack/react-query';

export const usePostCreateDatabaseMutation = () => {
  return useMutation({
    mutationFn: DatabaseApi.postCreateDatabase,
    onSuccess: async (data) => {
      if (data?.success) {
        toast.success(data.message || 'Veritabanı başarıyla oluşturuldu.');
      } else {
        toast.error(data?.error || 'Veritabanı oluşturulurken bir hata oluştu.');
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.error || 'Veritabanı oluşturulurken bir hata oluştu.');
    }
  });
};
