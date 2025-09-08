'use client';
import { z } from 'zod';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent } from '@/components/ui/card';
import LogoWhite from '../../../../public/assets/img/logo_white.png';
import CustomUiTextInput from '@/components/inputs/CustomUiTextInput';

const LoginPage = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const LoginSchema = z.object({
    userName: z
      .string()
      .trim()
      .min(3, { message: t('login.usernameError') }),
    password: z
      .string()
      .trim()
      .min(6, { message: t('login.passwordError') })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\w\W]{6,}$/, {
        message: t('login.passwordComplexityError')
      })
  });

  type FormValues = z.infer<typeof LoginSchema>;

  const form = useForm<FormValues>({
    values: {
      userName: '',
      password: ''
    },
    resolver: zodResolver(LoginSchema)
  });

  const { handleSubmit, control, setValue } = form;

  const onSubmit = async (data: FormValues) => {};

  return (
    <div className={cn('flex flex-col gap-6')}>
      <Card className="overflow-hidden p-0 bg-black/50">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8 ">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col items-center text-center pb-4">
                <h1 className="text-2xl font-bold">Gecko Admin Panel</h1>
                <p className="text-muted-foreground text-balance">Hoş geldiniz! Lütfen giriş yapın.</p>
              </div>

              <Controller
                control={control}
                name="userName"
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <CustomUiTextInput
                    type="text"
                    label={t('login.username')}
                    value={value}
                    onChange={onChange}
                    placeholder={t('login.usernamePlaceholder')}
                    error={error?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <CustomUiTextInput
                    type="password"
                    label={t('login.password')}
                    value={value}
                    onChange={onChange}
                    placeholder={t('login.passwordPlaceholder')}
                    error={error?.message}
                  />
                )}
              />

              <Button variant={'default'} className="w-full" onClick={handleSubmit(onSubmit)}>
                {t('login.loginButton')}
              </Button>
            </div>
          </form>

          <div className="bg-black/10 relative hidden md:block">
            <Image
              src={LogoWhite}
              width={150}
              height={150}
              alt="Image"
              className="absolute inset-0 h-full w-full object-contain p-10"
            />
          </div>
        </CardContent>
      </Card>

      <div className="text-black *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to the Gecko Admin Panel <a href="#">Terms of Service</a> and{' '}
        <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
};

export default LoginPage;
