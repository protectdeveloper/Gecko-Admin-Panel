import { useMutation, useQuery } from '@tanstack/react-query';
import { AuthApi } from './Auth.api';
import { toast } from 'sonner';
import { setCookie, deleteCookie, getCookie } from 'cookies-next';

export const useSystemAdminLoginMutation = () => {
  return useMutation({
    mutationFn: AuthApi.postSystemAdminLogin,
    onSuccess: (data: any) => {
      if (data.data?.success) {
        if (data?.headers['x-adminpretoken']) {
          setCookie('token', data.headers['x-adminpretoken']);
          setCookie('isLogin', 'false');
          setCookie('isSendVerifyCode', 'true');
        }
        toast.success('Doğrulama kodu gönderildi');
      } else {
        toast.error(data.data?.message || 'Doğrulama kodu gönderilemedi, lütfen bilgilerinizi kontrol ediniz');
      }
    },

    onError: (error: any) => {
      const errorMessage = error?.response?.data?.data?.error || 'Bilinmeyen bir hata oluştu, lütfen tekrar deneyiniz';
      toast.error(errorMessage);
    }
  });
};

export const useSystemAdminValidateMutation = () => {
  return useMutation({
    mutationFn: AuthApi.postSystemAdminValidate,
    onSuccess: (data: any) => {
      if (data.data?.success) {
        if (data?.headers['x-admintoken']) {
          setCookie('token', data.headers['x-admintoken']);
          setCookie('isLogin', 'true');
          deleteCookie('isSendVerifyCode');
          localStorage.removeItem('verifyCodeExpire');
        }
      } else {
        toast.error(data.data?.message || 'Doğrulama başarısız, lütfen kodunuzu kontrol ediniz');
      }
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.data?.error || 'Bilinmeyen bir hata oluştu, lütfen tekrar deneyiniz';
      toast.error(errorMessage);
    }
  });
};

export const getMeSystemAdminDetailQueryOptions = {
  queryKey: ['getMeSystemAdminDetail'],
  queryFn: AuthApi.getMeSystemAdminDetail
};

export const useGetMeSystemAdminDetailQuery = () => {
  return useQuery(getMeSystemAdminDetailQueryOptions);
};
