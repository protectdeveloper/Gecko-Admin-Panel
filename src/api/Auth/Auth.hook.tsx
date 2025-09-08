import { useMutation, useQuery } from '@tanstack/react-query';
import { AuthApi } from './Auth.api';
import { toast } from 'sonner';
import { setCookie, deleteCookie, getCookie } from 'cookies-next';
import { GetCustomersUserCheckReservationParams, GetCustomersVisitorPreviewParams } from './Auth.types';
import { useTranslation } from 'react-i18next';

export const useUserCustomerLoginRequestMutation = () => {
  return useMutation({
    mutationFn: AuthApi.postCustomerUserLogin,
    onSuccess: (data: any) => {
      if (data.data?.success) {
        if (data?.headers['x-authuserpretoken']) {
          setCookie('token', data.headers['x-authuserpretoken']);
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

export const useUserCustomerValidateMutation = () => {
  return useMutation({
    mutationFn: AuthApi.postCustomerUserValidate,
    onSuccess: (data: any) => {
      if (data.data?.success) {
        if (data?.headers['x-authusertoken']) {
          setCookie('token', data.headers['x-authusertoken']);
          setCookie('isLogin', 'true');
          deleteCookie('isSendVerifyCode');
          localStorage.removeItem('verifyCodeExpire');
        }
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

export const useUserCustomerForgotPasswordMutation = () => {
  return useMutation({
    mutationFn: AuthApi.postCustomerUserForgotPassword,
    onSuccess: (data: any) => {
      if (data?.success) {
        setCookie('isSendVerifyCode', 'true');

        toast.success(data?.message || 'Doğrulama kodu gönderildi');
      } else {
        toast.error(data?.message || 'Doğrulama kodu gönderilemedi, lütfen bilgilerinizi kontrol ediniz');
      }
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.error || 'Bilinmeyen bir hata oluştu, lütfen tekrar deneyiniz';
      toast.error(errorMessage);
    }
  });
};

export const useUserCustomerForgotPasswordCheckMutation = () => {
  return useMutation({
    mutationFn: AuthApi.postCustomerUserForgotPasswordCheck,
    onSuccess: (data: any) => {
      if (data?.success) {
        toast.success(data?.message || 'Doğrulama kodu kontrolü başarılı');
      } else {
        toast.error(data?.message || 'Doğrulama kodu kontrolü başarısız');
      }
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.error || 'Bilinmeyen bir hata oluştu, lütfen tekrar deneyiniz';
      toast.error(errorMessage);
    }
  });
};

export const useUserCustomerForgotPasswordConfirmMutation = () => {
  return useMutation({
    mutationFn: AuthApi.postCustomerUserForgotPasswordConfirm,
    onSuccess: (data: any) => {
      if (data?.success) {
        toast.success(data?.message || 'Şifre sıfırlama başarılı');
      } else {
        toast.error(data?.message || 'Şifre sıfırlama başarısız');
      }
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.error || 'Bilinmeyen bir hata oluştu, lütfen tekrar deneyiniz';
      toast.error(errorMessage);
    }
  });
};

export const getCustomerUserValidateTokenQueryOptions = {
  queryKey: ['getCustomerUserValidateToken'],
  queryFn: AuthApi.getCustomerUserValidateToken
};

export const useGetCustomerUserValidateTokenQuery = () => {
  const token = getCookie('token');
  const isLogin = getCookie('isLogin');
  return useQuery({
    ...getCustomerUserValidateTokenQueryOptions,
    enabled: !!token && isLogin === 'true'
  });
};

export const getMeUserDetailQueryOptions = {
  queryKey: ['getMeUserDetail'],
  queryFn: AuthApi.getMeUserDetail
};

export const useGetMeUserDetailQuery = () => {
  return useQuery(getMeUserDetailQueryOptions);
};

//! Auth Setup Page Hooks
export const getCustomersAuthUserCheckReservationQueryOptions = (params: GetCustomersUserCheckReservationParams) => ({
  queryKey: ['getCustomersAuthUserCheckReservation', params],
  queryFn: () => AuthApi.getCustomersAuthUserCheckReservation(params)
});
export const useGetCustomersAuthUserCheckReservationQuery = (params: GetCustomersUserCheckReservationParams) => {
  return useQuery(getCustomersAuthUserCheckReservationQueryOptions(params));
};

//! User Setup Page Hooks
export const getCustomersUserCheckReservationQueryOptions = (params: GetCustomersUserCheckReservationParams) => ({
  queryKey: ['getCustomersUserCheckReservation', params],
  queryFn: () => AuthApi.getCustomersUserCheckReservation(params)
});
export const useGetCustomersUserCheckReservationQuery = (params: GetCustomersUserCheckReservationParams) => {
  return useQuery(getCustomersUserCheckReservationQueryOptions(params));
};

export const useUserCustomerCompleteReservationMutation = () => {
  return useMutation({
    mutationFn: AuthApi.postCustomersUserCompleteReservation,
    onSuccess: (data: any) => {
      if (data?.success) {
        toast.success(data?.message);
      } else {
        toast.error(data?.message);
      }
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.error || 'Bilinmeyen bir hata oluştu, lütfen tekrar deneyiniz';
      toast.error(errorMessage);
    }
  });
};

export const useUserCustomerAuthUserCompleteReservationMutation = () => {
  return useMutation({
    mutationFn: AuthApi.postCustomersUserAuthUserCompleteReservation,
    onSuccess: (data: any) => {
      if (data?.success) {
        toast.success('Şifre oluşturma başarılı');
      } else {
        toast.error(data?.message || 'Şifre oluşturma başarısız');
      }
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.error || 'Bilinmeyen bir hata oluştu, lütfen tekrar deneyiniz';
      toast.error(errorMessage);
    }
  });
};

export const getCustomersVisitorPreviewQueryOptions = (params: GetCustomersVisitorPreviewParams) => ({
  queryKey: ['getCustomersVisitorPreview', params],
  queryFn: () => AuthApi.getCustomersVisitorPreview(params)
});
export const useGetCustomersVisitorPreviewQuery = (params: GetCustomersVisitorPreviewParams) => {
  return useQuery(getCustomersVisitorPreviewQueryOptions(params));
};
