'use client';
import { useGetCustomerUserValidateTokenQuery } from '@/api/Auth/Auth.hook';
import { deleteCookie, getCookie } from 'cookies-next';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || '';
  const { data, refetch } = useGetCustomerUserValidateTokenQuery();

  const validateToken = async () => {
    const token = getCookie('token');
    const isLogin = getCookie('isLogin');

    if (token && isLogin === 'true') {
      try {
        const res = await refetch();

        if (res.data?.error) {
          toast.error(res.data?.error);
          deleteCookie('token');
          deleteCookie('isLogin');
          window.location.href = '/auth/login';
        }
      } catch (error: any) {}
    }
  };

  useEffect(() => {
    if (pathname.includes('/auth')) {
      return;
    }

    validateToken();
  }, [pathname]);

  return <>{children}</>;
}
