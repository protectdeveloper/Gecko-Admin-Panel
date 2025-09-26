'use client';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { AppSheet } from '@/components/AppSheet';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PhotoInput } from '@/components/inputs/PhotoInput';
import CustomTextInput from '@/components/inputs/CustomTextInput';
import {
  useGetCustomerByIdQuery,
  usePostCreateCustomerMutation,
  usePutUpdateCustomerByIdMutation
} from '@/api/Customer/Customer.hook';
import CustomCheckbox from '@/components/inputs/CustomCheckbox';

interface CustomerCreateEditFormProps {
  customerId?: string;
}

const CustomerCreateEditForm = ({ customerId }: CustomerCreateEditFormProps) => {
  const { data: customerData } = useGetCustomerByIdQuery(customerId as string);
  const { mutateAsync: postCreateCustomer } = usePostCreateCustomerMutation();
  const { mutateAsync: putUpdateCustomer } = usePutUpdateCustomerByIdMutation();

  const CustomerCreateEditFormSchema = z.object({
    logo: z.string().optional(),
    customerName: z.string().min(1, 'Firma adı zorunludur'),
    customerCode: z.string().regex(/^\d{6}$/, 'Firma kodu 6 haneli rakamlardan oluşmalıdır'),
    isActive: z.boolean().optional()
  });

  type FormValues = z.infer<typeof CustomerCreateEditFormSchema>;

  const form = useForm<FormValues>({
    values: {
      logo: customerData?.data.logo || '',
      customerName: customerData?.data.customerName || '',
      customerCode: customerData?.data.customerCode || '',
      isActive: customerData?.data.isActive || false
    },
    resolver: zodResolver(CustomerCreateEditFormSchema)
  });

  const { handleSubmit, control, watch, setValue } = form;

  const onSubmit = async (data: FormValues) => {
    if (customerId) {
      await handleEditCustomerPress(data);
    } else {
      await handleCreateCustomerPress(data);
    }
  };

  const handleCreateCustomerPress = async (data: FormValues) => {
    const response = await postCreateCustomer({
      isActive: data.isActive || false,
      customerCode: data.customerCode,
      customerName: data.customerName,
      logo: data.logo || ''
    });

    if (response.success) {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      setValue('customerName', '');
      setValue('customerCode', '');
      setValue('logo', '');
    }
  };

  const handleEditCustomerPress = async (data: FormValues) => {
    const response = await putUpdateCustomer({
      id: customerId as string,
      body: {
        customerID: customerId as string,
        isActive: data.isActive || false,
        customerCode: data.customerCode,
        customerName: data.customerName,
        logo: data.logo || ''
      }
    });

    if (response.success) {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      setValue('customerName', '');
      setValue('customerCode', '');
      setValue('logo', '');
    }
  };

  return (
    <div className="w-full flex flex-col px-4 gap-4 h-[92vh]">
      <div className="flex-1 flex flex-col overflow-auto gap-4">
        <Controller
          control={control}
          name="logo"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <div className="w-full flex flex-col items-center gap-3">
              <PhotoInput
                value={value}
                onChange={(result) => {
                  onChange(result.thumbnailImage);
                }}
                firstName={watch('customerName')?.split(' ')[0] || ''}
                lastName={watch('customerName')?.split(' ')[1] || ''}
                onDeletePhotoPress={() => setValue('logo', '')}
              />
            </div>
          )}
        />

        <Controller
          control={control}
          name="customerName"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <CustomTextInput
              label={'Firma Adı'}
              placeholder={'Firma Adı Giriniz'}
              value={value}
              onChange={onChange}
              error={error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="customerCode"
          render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
            <CustomTextInput
              label={'Firma Kodu'}
              placeholder={'Firma Kodu Giriniz'}
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
            <CustomCheckbox value={value || false} onChange={onChange} label={'Aktif Firma'} />
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

export default CustomerCreateEditForm;
