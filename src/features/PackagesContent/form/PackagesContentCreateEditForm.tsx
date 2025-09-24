'use client';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { AppSheet } from '@/components/AppSheet';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import PriceInput from '@/components/inputs/PriceInput';
import { useGetPackageQuery } from '@/api/Package/Package.hook';
import {
  useGetPackageContentByIdQuery,
  usePostCreatePackageContentMutation,
  usePutPackageContentByIdMutation
} from '@/api/PackageContent/PackageContent.hook';
import { useGetPackageTypeQuery } from '@/api/PackageType/PackageType.hook';
import { CustomSelectBox } from '@/components/inputs/CustomSelectBox';

interface PackagesContentCreateEditFormProps {
  packageContentId?: string;
}

const PackagesContentCreateEditForm = ({ packageContentId }: PackagesContentCreateEditFormProps) => {
  const { mutateAsync: postCreatePackageContent } = usePostCreatePackageContentMutation();
  const { mutateAsync: putUpdatePackageContent } = usePutPackageContentByIdMutation();
  const { data: packageContentDetailData } = useGetPackageContentByIdQuery(packageContentId as string);
  const { data: packageData } = useGetPackageQuery({
    pageNumber: 1,
    pageSize: 1000
  });
  const { data: packageTypeData } = useGetPackageTypeQuery({
    pageNumber: 1,
    pageSize: 1000
  });

  const PackagesCreateEditFormSchema = z.object({
    packageID: z.string().min(1, 'Paket zorunludur.'),
    packageTypeId: z.string().min(1, 'Paket tipi zorunludur.'),
    quantity: z.string().regex(/^\d{1,9}([.,]\d{1,2})?$/, 'Geçerli bir miktar giriniz.'),
    unitPrice: z.string().regex(/^\d{1,9}([.,]\d{1,2})?$/, 'Geçerli bir adet fiyatı giriniz.')
  });

  type FormValues = z.infer<typeof PackagesCreateEditFormSchema>;

  const form = useForm<FormValues>({
    values: {
      packageID: packageContentDetailData?.data.packageID || '',
      packageTypeId: packageContentDetailData?.data.packageTypeID || '',
      quantity: packageContentDetailData?.data.quantity?.toString() || '',
      unitPrice: packageContentDetailData?.data.unitPrice?.toString() || ''
    },
    resolver: zodResolver(PackagesCreateEditFormSchema)
  });

  const { handleSubmit, control } = form;

  const onSubmit = async (data: FormValues) => {
    if (packageContentId) {
      await handleEditPackageContentPress(data);
    } else {
      await handleCreatePackageContentPress(data);
    }
  };

  const handleCreatePackageContentPress = async (data: FormValues) => {
    const response = await postCreatePackageContent({
      packageID: data.packageID,
      packageTypeID: data.packageTypeId,
      quantity: parseFloat(data.quantity.replace(',', '.')),
      unitPrice: parseFloat(data.unitPrice.replace(',', '.'))
    });
    if (response.success) {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    }
  };

  const handleEditPackageContentPress = async (data: FormValues) => {
    if (!packageContentId) return;

    const response = await putUpdatePackageContent({
      id: packageContentId,
      body: {
        packageContentID: packageContentId,
        packageID: data.packageID,
        packageTypeID: data.packageTypeId,
        quantity: parseFloat(data.quantity.replace(',', '.')),
        unitPrice: parseFloat(data.unitPrice.replace(',', '.'))
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
          name="packageID"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <CustomSelectBox
              title={'Paket'}
              placeholder={'Paket Seçiniz'}
              value={value}
              onValueChange={onChange}
              error={error?.message}
              className="w-full"
              data={
                packageData?.data?.map((type) => ({
                  label: type?.packageName,
                  value: type?.packageID
                })) || []
              }
            />
          )}
        />

        <Controller
          control={control}
          name="packageTypeId"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <CustomSelectBox
              title={'Paket Tipi'}
              placeholder={'Paket Tipi Seçiniz'}
              value={value}
              onValueChange={onChange}
              error={error?.message}
              className="w-full"
              data={
                packageTypeData?.data?.map((type) => ({
                  label: type?.typeName,
                  value: type?.packageTypeID
                })) || []
              }
            />
          )}
        />

        <Controller
          control={control}
          name="quantity"
          render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
            <PriceInput
              label={'Miktar'}
              placeholder={'Miktar Giriniz'}
              value={value}
              onChange={onChange}
              error={error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="unitPrice"
          render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
            <PriceInput
              label={'Adet Fiyatı'}
              placeholder={'Adet Fiyatı Giriniz'}
              value={value}
              onChange={onChange}
              error={error?.message}
            />
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

export default PackagesContentCreateEditForm;
