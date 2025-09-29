import axios from 'axios';
import { getCookie } from 'cookies-next';
import qs from 'qs';

const isServer = typeof window === 'undefined';
import { deleteCookie } from 'cookies-next';
import { toast } from 'sonner';

export const BaseAxiosService = axios.create({
  baseURL: 'https://gw.gecko.tr/',
  timeout: 20000,
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' })
});

BaseAxiosService.interceptors.request.use(
  async (config) => {
    let token;

    if (isServer) {
      const { cookies } = await import('next/headers');
      const cookieStore = await cookies();
      token = cookieStore.get('token')?.value;
    } else {
      token = getCookie('token');
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    if (error?.response?.status === 401) {
      // Token geçersiz, kullanıcıyı login sayfasına at
      deleteCookie('token');
      deleteCookie('isLogin');

      if (!isServer) {
        toast.error(error?.response?.error || 'Oturumunuz sonlandı. Lütfen tekrar giriş yapın.');
        window.location.href = '/auth/login';
      }
    }

    return Promise.reject(error);
  }
);

BaseAxiosService.interceptors.response.use(
  (response) => {
    if (response?.data?.statusCode === 401) {
      deleteCookie('token');
      deleteCookie('isLogin');
      window.location.href = '/auth/login';
      toast.error(response?.data?.error || 'Oturumunuz sonlandı. Lütfen tekrar giriş yapın.');

      return Promise.reject(new Error('Unauthorized'));
    }

    return response;
  },
  (error) => {
    if (error?.response?.status === 401) {
      deleteCookie('token');
      deleteCookie('isLogin');

      window.location.href = '/auth/login';
      toast.error(error?.response?.data?.error || 'Oturumunuz sonlandı. Lütfen tekrar giriş yapın.');
      return Promise.reject(new Error('Unauthorized'));
    }

    if (error?.response.status === 500) {
      toast.error(error?.response?.data?.message || error?.message || 'Bir hata oluştu. Lütfen tekrar deneyin.');
      return Promise.reject(new Error(error?.response?.data?.message || 'Internal Server Error'));
    }

    return Promise.reject(error);
  }
);
