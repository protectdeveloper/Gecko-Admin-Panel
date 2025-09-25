'use client';

import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { AppSheet } from '@/components/AppSheet';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomCheckbox from '@/components/inputs/CustomCheckbox';
import {
  useGetCustomerMachineByIdQuery,
  usePostCreateCustomerMachineMutation,
  usePutUpdateCustomerMachineByIdMutation
} from '@/api/CustomerMachine/CustomerMachine.hook';
import BadgeSlider from '@/components/inputs/BadgeSlider';
import { toast } from 'sonner';
import { useLocationPermission } from '@/hooks/useLocationPermission';
import { Spinner } from '@/components/ui/spinner';
import dynamic from 'next/dynamic';
import LocationPermissionRequest from './LocationPermissionRequest';
import { useGetMachinesQuery } from '@/api/Machine/Machine.hook';
import { useGetCustomersQuery } from '@/api/Customer/Customer.hook';
import { CustomSelectBox } from '@/components/inputs/CustomSelectBox';
import CustomTextInput from '@/components/inputs/CustomTextInput';
import CustomTextAreaInput from '@/components/inputs/CustomTextAreaInput';

interface CustomersMachinesCreateEditFormProps {
  customerMachineId?: string;
  customerId?: string | undefined;
  isDisabledCustomerSelect?: boolean;
}

const MapWithNoSSR = dynamic(() => import('./MapComponent'), {
  ssr: false,
  loading: () => <div>Harita yükleniyor...</div>
});

const CustomersMachinesCreateEditForm = ({
  customerMachineId,
  customerId = undefined,
  isDisabledCustomerSelect = false
}: CustomersMachinesCreateEditFormProps) => {
  const { data: machinesData } = useGetMachinesQuery({
    pageNumber: 1,
    pageSize: 1000
  });
  const { data: customersData } = useGetCustomersQuery({
    pageNumber: 1,
    pageSize: 1000
  });
  const { hasPermission, isChecking } = useLocationPermission();
  const { data: customerMachineDetailData } = useGetCustomerMachineByIdQuery(customerMachineId as string);
  const { mutateAsync: postCreateCustomerMachine } = usePostCreateCustomerMachineMutation();
  const { mutateAsync: putUpdateCustomerMachine } = usePutUpdateCustomerMachineByIdMutation();

  const CustomersMachinesCreateEditFormSchema = z.object({
    customerID: z.string().min(1, 'Müşteri ID zorunludur'),
    machineID: z.string().min(1, 'Makine ID zorunludur'),
    machineName: z.string().min(1, 'Makine adı zorunludur'),
    description: z.string().min(1, 'Açıklama zorunludur'),
    assemblyName: z.string().min(1, 'Montaj adı zorunludur'),
    position: z
      .tuple([z.number(), z.number()])
      .refine((val) => Array.isArray(val) && val.length === 2, { message: 'Geçerli bir konum seçin' }),
    tolerance: z.array(z.number()).min(1, 'Makine toleransı zorunludur').max(300, 'Makine toleransı maksimum 300 olmalıdır'),
    isActive: z.boolean().optional(),
    isOnline: z.boolean().optional(),
    isTasEnabled: z.boolean().optional()
  });

  type FormValues = z.infer<typeof CustomersMachinesCreateEditFormSchema>;

  const form = useForm<FormValues>({
    values: {
      customerID: customerMachineDetailData?.data.customerID || customerId || '',
      machineID: customerMachineDetailData?.data.machineID || '',
      machineName: customerMachineDetailData?.data.machineName || '',
      description: customerMachineDetailData?.data.description || '',
      assemblyName: customerMachineDetailData?.data.assemblyName || '',
      isActive: customerMachineDetailData?.data.isActive || false,
      isOnline: customerMachineDetailData?.data.isOnline || false,
      position: [customerMachineDetailData?.data?.latitude || 41, customerMachineDetailData?.data?.longitude || 29],
      tolerance: [customerMachineDetailData?.data?.tolerance || 1],
      isTasEnabled: customerMachineDetailData?.data.isTasEnabled || false
    },
    resolver: zodResolver(CustomersMachinesCreateEditFormSchema)
  });

  const { handleSubmit, control, watch, setValue } = form;

  const onSubmit = async (data: FormValues) => {
    if (customerMachineId) {
      await handleEditCustomerMachinePress(data);
    } else {
      await handleCreateCustomerMachinePress(data);
    }
  };

  const handleCreateCustomerMachinePress = async (data: FormValues) => {
    const response = await postCreateCustomerMachine({
      customerID: data.customerID,
      machineID: data.machineID,
      machineName: data.machineName,
      description: data.description,
      assemblyName: data.assemblyName,
      isActive: data.isActive || false,
      isOnline: data.isOnline || false,
      latitude: data.position[0] || 0,
      longitude: data.position[1] || 0,
      tolerance: data.tolerance[0] || 0,
      isTasEnabled: data.isTasEnabled || false
    });

    if (response?.success) {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    }
  };

  const handleEditCustomerMachinePress = async (data: FormValues) => {
    const response = await putUpdateCustomerMachine({
      id: customerMachineId as string,
      body: {
        customerMachineID: customerMachineId as string,
        customerID: data.customerID,
        machineID: data.machineID,
        machineName: data.machineName,
        description: data.description,
        assemblyName: data.assemblyName,
        isActive: data.isActive || false,
        isOnline: data.isOnline || false,
        latitude: data.position[0] || 0,
        longitude: data.position[1] || 0,
        tolerance: data.tolerance[0] || 0,
        isTasEnabled: data.isTasEnabled || false
      }
    });

    if (response?.success) {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    }
  };

  const handleSelectCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setValue('position', [latitude, longitude]);
        },
        (error) => {
          toast.error('Konum hatası' + `: ${error.message}`);
        }
      );
    } else {
      toast.error('Tarayıcı konum desteğini desteklemiyor');
    }
  };

  return (
    <div className="w-full flex flex-col px-4 gap-4 h-[92vh]">
      <div className="flex-1 flex flex-col overflow-auto gap-4">
        <Controller
          control={control}
          name="customerID"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <CustomSelectBox
              value={value}
              onValueChange={(value) => onChange(value)}
              title="Firma"
              placeholder="Firma Seçin"
              data={customersData?.data.map((customer) => ({ value: customer.customerID, label: customer.customerName })) || []}
              error={error?.message}
              disabled={isDisabledCustomerSelect}
              className="w-full"
            />
          )}
        />

        <Controller
          control={control}
          name="machineName"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <CustomTextInput
              value={value}
              onChange={onChange}
              label="Makine Adı"
              placeholder="Makine Adı Girin"
              error={error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="machineID"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <CustomSelectBox
              value={value}
              onValueChange={(value) => onChange(value)}
              title="Makine"
              placeholder="Makine Seçin"
              data={machinesData?.data.map((machine) => ({ value: machine.machineID, label: machine.connectionName })) || []}
              error={error?.message}
              className="w-full"
            />
          )}
        />

        <Controller
          control={control}
          name="assemblyName"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <CustomTextInput
              value={value}
              onChange={onChange}
              label="Montaj Adı"
              placeholder="Montaj Adı Girin"
              error={error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <CustomTextAreaInput
              value={value}
              onChange={onChange}
              label="Açıklama"
              placeholder="Açıklama Girin"
              error={error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="position"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <div className="w-full min-h-[300px] max-h-[300px] flex flex-col gap-3">
              {isChecking ? (
                <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                  <Spinner className="text-primary" />
                  <p>Konum izni durumu kontrol ediliyor... Lütfen bekleyin ve ardından konumunuzu seçin.</p>
                </div>
              ) : hasPermission ? (
                <MapWithNoSSR
                  position={Array.isArray(value) && value.length === 2 ? [value[0], value[1]] : [0, 0]}
                  onPositionChange={onChange}
                  onToleranceChange={(tolerance) => setValue('tolerance', [tolerance])}
                  tolerance={watch('tolerance')[0]}
                />
              ) : (
                <LocationPermissionRequest />
              )}

              {error && <p className="text-xs text-red-500">{error?.message}</p>}
            </div>
          )}
        />

        <Controller
          control={control}
          name="tolerance"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2 pb-7">
                <span className="text-sm font-medium text-muted-foreground">Makine Toleransı (metre) - {value}m</span>
                <BadgeSlider value={value} onValueChange={(value) => onChange(value)} max={300} min={1} step={1} bageText="m" />
              </div>

              {error && <p className="text-xs text-red-500">{error?.message}</p>}
            </div>
          )}
        />

        <Controller
          control={control}
          name="isActive"
          render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
            <CustomCheckbox value={value || false} onChange={onChange} label={'Aktif Firma Makinesi'} />
          )}
        />

        <Button onClick={handleSelectCurrentLocation}>Mevcut Konumu Kullan</Button>
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

export default CustomersMachinesCreateEditForm;
