'use client';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { AppSheet } from '@/components/AppSheet';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomTextInput from '@/components/inputs/CustomTextInput';
import {
  useGetConnectionByIdQuery,
  usePostCreateConnectionMutation,
  usePutConnectionByIdMutation
} from '@/api/Connection/Connection.hook';
import { useGetCustomersQuery } from '@/api/Customer/Customer.hook';
import { CustomSelectBox } from '@/components/inputs/CustomSelectBox';
import CustomCheckbox from '@/components/inputs/CustomCheckbox';

interface ConnectionsCreateEditFormProps {
  connectionId?: string;
}

const ConnectionsCreateEditForm = ({ connectionId }: ConnectionsCreateEditFormProps) => {
  const { mutateAsync: putUpdateConnection } = usePutConnectionByIdMutation();
  const { mutateAsync: postCreateConnection } = usePostCreateConnectionMutation();
  const { data: customersData } = useGetCustomersQuery({ pageNumber: 1, pageSize: 1000 });
  const { data: connectionDetailData } = useGetConnectionByIdQuery(connectionId as string);

  const ConnectionsCreateEditFormSchema = z.object({
    customerId: z.string().min(1, 'Firma zorunludur.'),
    connectionType: z.string().min(1, 'Bağlantı türü zorunludur.'),
    connectionString: z.string().min(1, 'Bağlantı dizesi zorunludur.'),
    isActive: z.boolean().optional()
  });

  type FormValues = z.infer<typeof ConnectionsCreateEditFormSchema>;

  const form = useForm<FormValues>({
    values: {
      connectionType: connectionDetailData?.data?.connectionType || '',
      connectionString: connectionDetailData?.data?.connectionString || '',
      customerId: connectionDetailData?.data?.customerID || '',
      isActive: connectionDetailData?.data?.isActive || true
    },
    resolver: zodResolver(ConnectionsCreateEditFormSchema)
  });

  const { handleSubmit, control } = form;

  const onSubmit = async (data: FormValues) => {
    if (connectionId) {
      await handleEditConnectionPress(data);
    } else {
      await handleCreateConnectionPress(data);
    }
  };

  const handleCreateConnectionPress = async (data: FormValues) => {
    const response = await postCreateConnection({
      customerID: data.customerId,
      connectionType: data.connectionType,
      connectionString: data.connectionString,
      isActive: data.isActive || false
    });

    if (response?.success) {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    }
  };

  const handleEditConnectionPress = async (data: FormValues) => {
    if (!connectionId) return;

    const response = await putUpdateConnection({
      id: connectionId,
      body: {
        connectionID: connectionId,
        customerID: data.customerId,
        connectionType: data.connectionType,
        connectionString: data.connectionString,
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
          name="customerId"
          render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
            <CustomSelectBox
              title={'Firma'}
              placeholder={'Firma Seçiniz'}
              value={value}
              onValueChange={onChange}
              data={
                customersData?.data.map((customer) => ({
                  label: customer.customerName,
                  value: customer.customerID
                })) || []
              }
              error={error?.message}
              className="w-full"
            />
          )}
        />

        <Controller
          control={control}
          name="connectionType"
          render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
            <CustomTextInput
              label={'Bağlantı Türü'}
              placeholder={'Bağlantı Türü Giriniz'}
              value={value}
              onChange={onChange}
              error={error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="connectionString"
          render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
            <CustomTextInput
              label={'Bağlantı Dizesi'}
              placeholder={'Bağlantı Dizesi Giriniz'}
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
            <CustomCheckbox value={value || false} onChange={onChange} label={'Aktif Bağlantı'} />
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

export default ConnectionsCreateEditForm;
