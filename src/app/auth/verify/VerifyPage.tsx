'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Logo from '../../../../public/assets/img/logo.png';
import LogoWhite from '../../../../public/assets/img/logo_white.png';
import { useLoginStore } from '@/store/useLoginStore';
import { queryClient } from '@/providers/QueryProvider';
import { useAuthStore } from '@/store/useAuthStore';
import { toast } from 'sonner';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'next-themes';
import { LanguageToggle } from '@/components/ui/language-toggle';
import { ModeToggle } from '@/components/sidebar/theme-dropdown';
import { setCookie } from 'cookies-next';
import {
  getMeSystemAdminDetailQueryOptions,
  useSystemAdminLoginMutation,
  useSystemAdminValidateMutation
} from '@/api/Auth/Auth.hook';
import VerifyPhoneForm from '@/features/Verify/Form/VerifyPhoneForm';

const VerifyPage = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { setUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const { userName, password } = useLoginStore();

  const { mutateAsync: systemAdminValidate, isPending: isValidating } = useSystemAdminValidateMutation();
  const { mutateAsync: systemAdminLogin, isPending: isLoggingIn } = useSystemAdminLoginMutation();

  const handleVerifyPhonePress = async (data: any) => {
    try {
      setIsLoading(true);

      const response = await systemAdminValidate({
        verificationCode: data?.verifyCode
      });

      if (response?.data?.success) {
        const userData = await queryClient.fetchQuery(getMeSystemAdminDetailQueryOptions);
        setUser(userData.data);
        setIsLoading(false);
        toast.success(t('login.successMessage'));
        router.push('/');
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleOnSendAgainCode = async () => {
    const response = await systemAdminLogin({
      username: userName,
      password: password
    });
  };

  return (
    <div className={'flex flex-col gap-6'}>
      <VerifyPhoneForm
        onPress={(data) => handleVerifyPhonePress(data)}
        onGoBack={() => router.back()}
        onSendAgainCode={() => handleOnSendAgainCode()}
        isLoading={isLoading || isLoggingIn || isValidating}
      />
    </div>
  );
};

export default VerifyPage;
