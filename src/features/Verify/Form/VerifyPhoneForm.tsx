'use client';

import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Fragment, useEffect, useState } from 'react';
import { formatOTPTime } from '@/utils/formatTime';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import Logo from '../../../../public/assets/img/logo.png';
import LogoWhite from '../../../../public/assets/img/logo_white.png';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { useLoginStore } from '@/store/useLoginStore';
import {
  getMeSystemAdminDetailQueryOptions,
  useSystemAdminLoginMutation,
  useSystemAdminValidateMutation
} from '@/api/Auth/Auth.hook';
import { queryClient } from '@/providers/QueryProvider';
import { toast } from 'sonner';

const VerifyPhoneForm = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const router = useRouter();
  const { setUser } = useAuthStore();
  const { userName, password } = useLoginStore();

  const { mutateAsync: systemAdminValidate, isPending: isValidating } = useSystemAdminValidateMutation();
  const { mutateAsync: systemAdminLogin, isPending: isLoggingIn } = useSystemAdminLoginMutation();

  const [codeTime, setCodeTime] = useState<number>(() => {
    const expireTime = localStorage.getItem('verifyCodeExpire');
    if (expireTime) {
      const remaining = Math.max(0, Math.floor((parseInt(expireTime) - Date.now()) / 1000));
      return remaining;
    } else {
      const newExpire = Date.now() + 180 * 1000;
      localStorage.setItem('verifyCodeExpire', newExpire.toString());
      return 180;
    }
  });

  const VerifyPhoneFormSchema = z.object({
    verifyCode: z
      .string()
      .trim()
      .length(6, { message: t('login.verificationCodeError') })
      .regex(/^\d+$/, {
        message: t('login.verificationCodeNumericError')
      })
  });

  type FormValues = z.infer<typeof VerifyPhoneFormSchema>;

  const form = useForm<FormValues>({
    defaultValues: {
      verifyCode: ''
    },
    resolver: zodResolver(VerifyPhoneFormSchema)
  });

  const { handleSubmit, control, setValue } = form;

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await systemAdminValidate({
        verificationCode: data?.verifyCode
      });

      if (response?.data?.success) {
        const userData = await queryClient.fetchQuery(getMeSystemAdminDetailQueryOptions);
        setUser(userData.data);

        toast.success(t('login.successMessage'));
        router.push('/');
      } else {
      }
    } catch (error) {}
  };

  const handleOnSendAgainCode = async () => {
    const response = await systemAdminLogin({
      username: userName,
      password: password
    });

    if (response?.data?.success) {
      form.reset({ verifyCode: '' });
      const newExpire = Date.now() + 180 * 1000;
      localStorage.setItem('verifyCodeExpire', newExpire.toString());
      setCodeTime(180);
    }
  };

  useEffect(() => {
    if (codeTime <= 0) {
      localStorage.removeItem('verifyCodeExpire');
      return;
    }
    const interval = setInterval(() => {
      setCodeTime((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [codeTime]);

  return (
    <Card className="overflow-hidden p-0 bg-white/5 dark:bg-black/50 border-none">
      <CardContent className="grid p-0 md:grid-cols-2">
        <form
          className="p-6 md:p-8"
          onSubmit={handleSubmit(onSubmit)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSubmit(onSubmit)();
            }
          }}
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-xl font-bold text-foreground">Doğrulama Kodu Gönderildi</h1>
              <p className="text-base font-medium text-center text-muted-foreground">{formatOTPTime(codeTime)}</p>
            </div>

            <div className="flex flex-col gap-5">
              <Controller
                control={control}
                name="verifyCode"
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <div className="flex flex-col items-center space-y-3">
                    <InputOTP maxLength={6} value={value} onChange={onChange}>
                      <InputOTPGroup className="gap-1">
                        {[...Array(6)].map((_, i) => (
                          <Fragment key={i}>
                            <InputOTPSlot
                              key={i}
                              index={i}
                              className="w-10 h-10 text-base rounded-lg text-center border-1 bg-gray-50 border-border focus:border-primary outline-none"
                            />
                            {i < 5 && <InputOTPSeparator className="text-muted-foreground" key={`sep-${i}`} />}
                          </Fragment>
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                    {error && <span className="text-red-500 text-sm text-center">{error.message}</span>}
                  </div>
                )}
              />

              <div className="flex flex-col items-center gap-2">
                <Button
                  onClick={() => handleOnSendAgainCode()}
                  disabled={codeTime > 0 || isLoggingIn || isValidating}
                  className={cn('bg-input border-none text-foreground text-sm')}
                >
                  {t('login.resendCode')}
                </Button>
              </div>

              <div className="flex flex-row gap-2">
                <Button
                  className="flex-1"
                  variant={'outline'}
                  onClick={() => router.back()}
                  disabled={isLoggingIn || isValidating}
                >
                  {t('login.back')}
                </Button>

                <Button
                  className="flex-1"
                  onClick={handleSubmit(onSubmit)}
                  disabled={isLoggingIn || isValidating}
                  loading={isLoggingIn || isValidating}
                >
                  {t('login.continue')} <ArrowRight />
                </Button>
              </div>
            </div>
          </div>
        </form>

        <div className="bg-white/10 dark:bg-black/10 relative hidden md:block">
          <Image
            src={theme === 'dark' ? LogoWhite : Logo}
            width={150}
            height={150}
            alt="Image"
            className="absolute inset-0 h-full w-full object-contain p-10"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default VerifyPhoneForm;
