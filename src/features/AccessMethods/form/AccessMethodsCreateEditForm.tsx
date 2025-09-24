'use client';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { AppSheet } from '@/components/AppSheet';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomTextInput from '@/components/inputs/CustomTextInput';
import {
  useGetAccessMethodByIdQuery,
  usePostCreateAccessMethodMutation,
  usePutAccessMethodByIdMutation
} from '@/api/AccessMethod/AccessMethod.hook';
import CustomTextAreaInput from '@/components/inputs/CustomTextAreaInput';
import CustomCheckbox from '@/components/inputs/CustomCheckbox';

interface AccessMethodsCreateEditFormProps {
  accessMethodId?: string;
}

const AccessMethodsCreateEditForm = ({ accessMethodId }: AccessMethodsCreateEditFormProps) => {
  const { mutateAsync: postCreateAccessMethod } = usePostCreateAccessMethodMutation();
  const { mutateAsync: putUpdateAccessMethod } = usePutAccessMethodByIdMutation();
  const { data: accessMethodDetailData } = useGetAccessMethodByIdQuery(accessMethodId as string);

  const AccessMethodsCreateEditFormSchema = z.object({
    methodName: z.string().min(1, 'Geçiş Yöntemi Adı zorunludur.'),
    description: z.string().min(1, 'Açıklama zorunludur.'),
    systemName: z.string().min(1, 'Sistem Adı zorunludur.'),
    identifierCode: z.string().regex(/^\d{6}$/, 'Tanımlayıcı kod 6 haneli rakamlardan oluşmalıdır.'),
    isActive: z.boolean().optional()
  });

  type FormValues = z.infer<typeof AccessMethodsCreateEditFormSchema>;

  const form = useForm<FormValues>({
    values: {
      methodName: accessMethodDetailData?.data?.methodName || '',
      description: accessMethodDetailData?.data?.description || '',
      systemName: accessMethodDetailData?.data?.systemName || '',
      identifierCode: accessMethodDetailData?.data?.identifierCode || '',
      isActive: accessMethodDetailData?.data?.isActive || false
    },
    resolver: zodResolver(AccessMethodsCreateEditFormSchema)
  });

  const { handleSubmit, control } = form;

  const onSubmit = async (data: FormValues) => {
    if (accessMethodId) {
      await handleEditAccessMethodPress(data);
    } else {
      await handleCreateAccessMethodPress(data);
    }
  };

  const handleCreateAccessMethodPress = async (data: FormValues) => {
    const response = await postCreateAccessMethod({
      methodName: data.methodName,
      description: data.description,
      systemName: data.systemName,
      identifierCode: data.identifierCode,
      isActive: data.isActive || false,
      icon: ''
    });

    if (response?.success) {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    }
  };

  const handleEditAccessMethodPress = async (data: FormValues) => {
    if (!accessMethodId) return;

    const response = await putUpdateAccessMethod({
      id: accessMethodId,
      body: {
        accessMethodID: accessMethodId,
        methodName: data.methodName,
        description: data.description,
        systemName: data.systemName,
        identifierCode: data.identifierCode,
        isActive: data.isActive || false,
        icon: ''
      }
    });

    if (response?.success) {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    }
  };

  return (
    <div className="w-full flex flex-col px-4 gap-4 h-[92vh]">
      <div className="flex-1 flex flex-col overflow-auto gap-4">
        <Controller
          control={control}
          name="methodName"
          render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
            <CustomTextInput
              label={'Geçiş Yöntemi Adı'}
              placeholder={'Geçiş Yöntemi Adı Giriniz'}
              value={value}
              onChange={onChange}
              error={error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="systemName"
          render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
            <CustomTextInput
              label={'Sistem Adı'}
              placeholder={'Sistem Adı Giriniz'}
              value={value}
              onChange={(value) => onChange(value.toLowerCase())}
              error={error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
            <CustomTextAreaInput
              label={'Açıklama'}
              placeholder={'Açıklama Giriniz'}
              value={value}
              onChange={onChange}
              error={error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="identifierCode"
          render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
            <CustomTextInput
              label={'Tanımlayıcı Kod'}
              placeholder={'Tanımlayıcı Kod Giriniz'}
              value={value}
              onChange={onChange}
              error={error?.message}
              maxLength={6}
            />
          )}
        />

        <Controller
          control={control}
          name="isActive"
          render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
            <CustomCheckbox value={value || false} onChange={onChange} label={'Aktif Geçiş Yöntemi'} />
          )}
        />
      </div>

      <div className="flex flex-row gap-2">
        <AppSheet.Close asChild>
          <Button variant="outline" className="flex-1">
            İptal
          </Button>
        </AppSheet.Close>
        <Button variant="default" className="flex-1" onClick={handleSubmit(onSubmit)}>
          Kaydet
        </Button>
      </div>
    </div>
  );
};

export default AccessMethodsCreateEditForm;
