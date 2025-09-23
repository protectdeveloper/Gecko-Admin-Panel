'use client';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { AppSheet } from '@/components/AppSheet';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomTextInput from '@/components/inputs/CustomTextInput';
import CustomCheckbox from '@/components/inputs/CustomCheckbox';
import CustomTextAreaInput from '@/components/inputs/CustomTextAreaInput';
import PriceInput from '@/components/inputs/PriceInput';
import { useGetPackageByIdQuery, usePostCreatePackageMutation, usePutPackageByIdMutation } from '@/api/Package/Package.hook';

interface CustomerCreateEditFormProps {
  packageId?: string;
}

const PackagesCreateEditForm = ({ packageId }: CustomerCreateEditFormProps) => {
  const { mutateAsync: postCreatePackage } = usePostCreatePackageMutation();
  const { mutateAsync: putUpdatePackage } = usePutPackageByIdMutation();
  const { data: packageDetailData } = useGetPackageByIdQuery(packageId as string);

  const PackagesCreateEditFormSchema = z.object({
    packageName: z.string().min(1, 'Paket Adı zorunludur.'),
    description: z.string().optional(),
    totalPrice: z.string().regex(/^\d{1,9}([.,]\d{1,2})?$/, 'Geçerli bir fiyat giriniz.'),
    isActive: z.boolean().optional()
  });

  type FormValues = z.infer<typeof PackagesCreateEditFormSchema>;

  const form = useForm<FormValues>({
    values: {
      packageName: packageDetailData?.data.packageName || '',
      description: packageDetailData?.data.description || '',
      totalPrice: String(packageDetailData?.data.totalPrice || ''),
      isActive: packageDetailData?.data.isActive ?? true
    },
    resolver: zodResolver(PackagesCreateEditFormSchema)
  });

  const { handleSubmit, control, watch, setValue } = form;

  const onSubmit = async (data: FormValues) => {
    if (packageId) {
      await handleEditPackagePress(data);
    } else {
      await handleCreatePackagePress(data);
    }
  };

  const handleCreatePackagePress = async (data: FormValues) => {
    const response = await postCreatePackage({
      packageName: data.packageName,
      description: data.description || '',
      totalPrice: parseFloat(data.totalPrice.replace(',', '.')),
      isActive: data.isActive || false
    });

    if (response.success) {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    }
  };

  const handleEditPackagePress = async (data: FormValues) => {
    if (!packageId) return;

    const response = await putUpdatePackage({
      id: packageId,
      body: {
        packageID: packageId,
        packageName: data.packageName,
        description: data.description || '',
        totalPrice: parseFloat(data.totalPrice.replace(',', '.')),
        isActive: data.isActive || false
      }
    });

    if (response.success) {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    }
  };

  return (
    <div className="w-full flex flex-col px-4 gap-4 h-[92vh]">
      <div className="flex-1 flex flex-col overflow-auto gap-4">
        <Controller
          control={control}
          name="packageName"
          render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
            <CustomTextInput
              label={'Paket Adı'}
              placeholder={'Paket Adı Giriniz'}
              value={value}
              onChange={onChange}
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
              value={value || ''}
              onChange={onChange}
              error={error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="totalPrice"
          render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
            <PriceInput label={'Fiyat'} placeholder={'Fiyat Giriniz'} value={value} onChange={onChange} error={error?.message} />
          )}
        />

        <Controller
          control={control}
          name="isActive"
          render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
            <CustomCheckbox value={value || false} onChange={onChange} label={'Aktif Paket'} />
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

export default PackagesCreateEditForm;
