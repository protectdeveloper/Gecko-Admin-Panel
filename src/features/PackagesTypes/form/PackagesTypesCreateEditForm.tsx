'use client';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { AppSheet } from '@/components/AppSheet';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomTextInput from '@/components/inputs/CustomTextInput';
import CustomCheckbox from '@/components/inputs/CustomCheckbox';
import CustomTextAreaInput from '@/components/inputs/CustomTextAreaInput';
import {
  useGetPackageTypeByIdQuery,
  usePostCreatePackageTypeMutation,
  usePutPackageTypeByIdMutation
} from '@/api/PackageType/PackageType.hook';

interface PackagesTypesCreateEditFormProps {
  packageTypeId?: string;
}

const PackagesTypesCreateEditForm = ({ packageTypeId }: PackagesTypesCreateEditFormProps) => {
  const { mutateAsync: postCreatePackageType } = usePostCreatePackageTypeMutation();
  const { mutateAsync: putUpdatePackageType } = usePutPackageTypeByIdMutation();
  const { data: packageTypeDetailData } = useGetPackageTypeByIdQuery(packageTypeId as string);

  const PackagesTypesCreateEditForm = z.object({
    typeName: z.string().min(1, 'Paket Tipi zorunludur.'),
    systemName: z.string().min(1, 'Sistem Adı zorunludur.'),
    description: z.string().min(1, 'Açıklama zorunludur.'),
    categoryName: z.string().min(1, 'Kategori Adı zorunludur.'),
    isActive: z.boolean().optional()
  });

  type FormValues = z.infer<typeof PackagesTypesCreateEditForm>;

  const form = useForm<FormValues>({
    values: {
      typeName: packageTypeDetailData?.data.typeName || '',
      systemName: packageTypeDetailData?.data.systemName || '',
      description: packageTypeDetailData?.data.description || '',
      categoryName: packageTypeDetailData?.data.categoryName || '',
      isActive: packageTypeDetailData?.data.isActive || false
    },
    resolver: zodResolver(PackagesTypesCreateEditForm)
  });

  const { handleSubmit, control } = form;

  const onSubmit = async (data: FormValues) => {
    if (packageTypeId) {
      await handleEditPackageTypePress(data);
    } else {
      await handleCreatePackageTypePress(data);
    }
  };

  const handleCreatePackageTypePress = async (data: FormValues) => {
    const response = await postCreatePackageType({
      typeName: data.typeName,
      systemName: data.systemName,
      description: data.description,
      categoryName: data.categoryName,
      isActive: data.isActive || false
    });

    if (response?.success) {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    }
  };

  const handleEditPackageTypePress = async (data: FormValues) => {
    if (!packageTypeId) return;

    const response = await putUpdatePackageType({
      id: packageTypeId,
      body: {
        packageTypeID: packageTypeId,
        typeName: data.typeName,
        systemName: data.systemName,
        description: data.description,
        categoryName: data.categoryName,
        isActive: data.isActive || false
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
          name="typeName"
          render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
            <CustomTextInput
              label={'Paket Tipi'}
              placeholder={'Paket Tipi Giriniz'}
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
              value={value}
              onChange={onChange}
              error={error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="categoryName"
          render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
            <CustomTextInput
              label={'Kategori Adı'}
              placeholder={'Kategori Adı Giriniz'}
              value={value}
              onChange={onChange}
              error={error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="isActive"
          render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
            <CustomCheckbox value={value || false} onChange={onChange} label={'Aktif Paket Tipi'} />
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

export default PackagesTypesCreateEditForm;
