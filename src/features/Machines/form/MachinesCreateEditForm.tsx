'use client';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { AppSheet } from '@/components/AppSheet';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomTextInput from '@/components/inputs/CustomTextInput';
import CustomCheckbox from '@/components/inputs/CustomCheckbox';
import { useGetMachineTypesQuery } from '@/api/MachineType/MachineType.hook';
import { CustomSelectBox } from '@/components/inputs/CustomSelectBox';
import {
  useGetMachineByIdQuery,
  usePostCreateMachineMutation,
  usePutUpdateMachineByIdMutation
} from '@/api/Machine/Machine.hook';

interface CustomerCreateEditFormProps {
  machineID?: string;
}

const MachinesCreateEditForm = ({ machineID }: CustomerCreateEditFormProps) => {
  const { data: machineDetailData } = useGetMachineByIdQuery(machineID as string);
  const { mutateAsync: postCreateMachine } = usePostCreateMachineMutation();
  const { mutateAsync: putUpdateMachine } = usePutUpdateMachineByIdMutation();
  const { data: machineTypesData } = useGetMachineTypesQuery({
    pageNumber: 1,
    pageSize: 1000
  });

  const MachinesCreateEditFormSchema = z
    .object({
      machineTypeID: z.string().min(1, 'Makine tipi zorunludur'),
      serialNumber: z.string().min(1, 'Seri numarası zorunludur'),
      eth0MacAddress: z.string().min(1, 'Eth0 MAC adresi zorunludur'),
      wlan0MacAddress: z.string().min(1, 'Wlan0 MAC adresi zorunludur'),
      simCardNumber: z.string().min(1, 'SIM Kart Numarası zorunludur'),
      firmwareVersion: z.string().min(1, 'Firmware versiyonu zorunludur'),
      ipAddress: z.string().min(1, 'IP adresi zorunludur'),
      connectionName: z.string().min(1, 'Bağlantı adı zorunludur'),
      passDelay: z.boolean().optional(),
      passDelayDuration: z.string().optional(),
      isOnline: z.boolean().optional(),
      antipassback: z.boolean().optional(),
      hasSound: z.boolean().optional(),
      volumeLevel: z.string().optional(),
      entryReadingEnabled: z.boolean().optional(),
      exitReadingEnabled: z.boolean().optional(),
      relayTriggerDuration: z.string().regex(/^\d$/, 'Röle tetikleme süresi rakamlardan oluşmalıdır'),
      timerInterval: z.string().regex(/^\d$/, 'Zamanlayıcı aralığı rakamlardan oluşmalıdır'),
      restartTime: z.string().regex(/^\d$/, 'Yeniden başlatma süresi rakamlardan oluşmalıdır'),
      isActive: z.boolean().optional()
    })
    .refine(
      (data) => {
        if (data.passDelay) {
          return typeof data.passDelayDuration === 'string' && /^\d+$/.test(data.passDelayDuration);
        }
        return true;
      },
      {
        message: 'Pass Delay Süresi zorunlu ve rakamlardan oluşmalıdır',
        path: ['passDelayDuration']
      }
    )
    .refine(
      (data) => {
        if (data.hasSound) {
          return typeof data.volumeLevel === 'string' && /^\d+$/.test(data.volumeLevel);
        }
        return true;
      },
      {
        message: 'Ses seviyesi zorunlu ve rakamlardan oluşmalıdır',
        path: ['volumeLevel']
      }
    );

  type FormValues = z.infer<typeof MachinesCreateEditFormSchema>;

  const form = useForm<FormValues>({
    values: {
      machineTypeID: machineDetailData?.data?.machineTypeID || '',
      serialNumber: machineDetailData?.data?.serialNumber || '',
      eth0MacAddress: machineDetailData?.data?.eth0MacAddress || '',
      wlan0MacAddress: machineDetailData?.data?.wlan0MacAddress || '',
      simCardNumber: machineDetailData?.data?.simCardNumber || '',
      firmwareVersion: machineDetailData?.data?.firmwareVersion || '',
      ipAddress: machineDetailData?.data?.ipAddress || '',
      connectionName: machineDetailData?.data?.connectionName || '',
      passDelay: machineDetailData?.data?.passDelay || false,
      passDelayDuration: String(machineDetailData?.data?.passDelayDuration || '0'),
      isOnline: machineDetailData?.data?.isOnline || false,
      antipassback: machineDetailData?.data?.antipassback || false,
      hasSound: machineDetailData?.data?.hasSound || false,
      volumeLevel: String(machineDetailData?.data?.volumeLevel || '0'),
      entryReadingEnabled: machineDetailData?.data?.entryReadingEnabled || false,
      exitReadingEnabled: machineDetailData?.data?.exitReadingEnabled || false,
      relayTriggerDuration: String(machineDetailData?.data?.relayTriggerDuration || '0'),
      timerInterval: machineDetailData?.data?.timerInterval === 'Empty' ? '' : machineDetailData?.data?.timerInterval || '0',
      restartTime: machineDetailData?.data?.restartTime === 'Empty' ? '' : machineDetailData?.data?.restartTime || '0',
      isActive: machineDetailData?.data?.isActive || false
    },
    resolver: zodResolver(MachinesCreateEditFormSchema)
  });

  const { handleSubmit, control, watch, setValue } = form;

  const onSubmit = async (data: FormValues) => {
    if (machineID) {
      await handleEditMachinePress(data);
    } else {
      await handleCreateMachinePress(data);
    }
  };

  const handleCreateMachinePress = async (data: FormValues) => {
    const response = await postCreateMachine({
      machineTypeID: data.machineTypeID,
      serialNumber: data.serialNumber,
      eth0MacAddress: data.eth0MacAddress,
      wlan0MacAddress: data.wlan0MacAddress,
      simCardNumber: data.simCardNumber,
      firmwareVersion: data.firmwareVersion,
      ipAddress: data.ipAddress,
      connectionName: data.connectionName,
      passDelay: data.passDelay || false,
      passDelayDuration: data.passDelay ? Number(data.passDelayDuration) : 0,
      isOnline: data.isOnline || false,
      antipassback: data.antipassback || false,
      hasSound: data.hasSound || false,
      volumeLevel: data.hasSound ? Number(data.volumeLevel) : 0,
      entryReadingEnabled: data.entryReadingEnabled || false,
      exitReadingEnabled: data.exitReadingEnabled || false,
      relayTriggerDuration: Number(data.relayTriggerDuration) || 0,
      timerInterval: data.timerInterval || '0',
      restartTime: data.restartTime || '0',
      isActive: data.isActive || false
    });

    if (response?.success) {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    }
  };

  const handleEditMachinePress = async (data: FormValues) => {
    if (!machineID) return;

    const response = await putUpdateMachine({
      id: machineID as string,
      body: {
        machineID: machineID as string,
        machineTypeID: data.machineTypeID,
        serialNumber: data.serialNumber,
        eth0MacAddress: data.eth0MacAddress,
        wlan0MacAddress: data.wlan0MacAddress,
        simCardNumber: data.simCardNumber,
        firmwareVersion: data.firmwareVersion,
        ipAddress: data.ipAddress,
        connectionName: data.connectionName,
        passDelay: data.passDelay || false,
        passDelayDuration: Number(data.passDelayDuration || 0) || 0,
        isOnline: data.isOnline || false,
        antipassback: data.antipassback || false,
        hasSound: data.hasSound || false,
        volumeLevel: Number(data.volumeLevel || 0) || 0,
        entryReadingEnabled: data.entryReadingEnabled || false,
        exitReadingEnabled: data.exitReadingEnabled || false,
        relayTriggerDuration: Number(data.relayTriggerDuration || 0) || 0,
        timerInterval: data.timerInterval || '0',
        restartTime: data.restartTime || '0',
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
          name="machineTypeID"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <CustomSelectBox
              title={'Makine Tipi'}
              placeholder={'Makine Tipi Seçiniz'}
              value={value}
              onValueChange={onChange}
              error={error?.message}
              className="w-full"
              data={
                machineTypesData?.data?.map((type) => ({
                  label: type?.typeName,
                  value: type?.machineTypeID
                })) || []
              }
            />
          )}
        />

        <Controller
          control={control}
          name="connectionName"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <CustomTextInput
              label={'Bağlantı Adı'}
              placeholder={'Bağlantı Adı Giriniz'}
              value={value}
              onChange={onChange}
              error={error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="serialNumber"
          render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
            <CustomTextInput
              label={'Seri Numarası'}
              placeholder={'Seri Numarası Giriniz'}
              value={value}
              onChange={onChange}
              error={error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="eth0MacAddress"
          render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
            <CustomTextInput
              label={'Ethernet 0 MAC Adresi'}
              placeholder={'Ethernet 0 MAC Adresi Giriniz'}
              value={value}
              onChange={onChange}
              error={error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="wlan0MacAddress"
          render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
            <CustomTextInput
              label={'Ethernet 1 MAC Adresi'}
              placeholder={'Ethernet 1 MAC Adresi Giriniz'}
              value={value}
              onChange={onChange}
              error={error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="simCardNumber"
          render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
            <CustomTextInput
              label={'SIM Kart Numarası'}
              placeholder={'SIM Kart Numarası Giriniz'}
              value={value}
              onChange={onChange}
              error={error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="ipAddress"
          render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
            <CustomTextInput
              label={'IP Adresi'}
              placeholder={'IP Adresi Giriniz'}
              value={value}
              onChange={onChange}
              error={error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="firmwareVersion"
          render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
            <CustomTextInput
              label={'Firmware Versiyonu'}
              placeholder={'Firmware Versiyonu Giriniz'}
              value={value}
              onChange={onChange}
              error={error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="relayTriggerDuration"
          render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
            <CustomTextInput
              label={'Röle Tetikleme Süresi'}
              placeholder={'Röle Tetikleme Süresi Giriniz'}
              value={value}
              onChange={onChange}
              error={error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="timerInterval"
          render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
            <CustomTextInput
              label={'Zamanlayıcı Aralığı'}
              placeholder={'Zamanlayıcı Aralığı Giriniz'}
              value={value}
              onChange={onChange}
              error={error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="restartTime"
          render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
            <CustomTextInput
              label={'Yeniden Başlatma Süresi'}
              placeholder={'Yeniden Başlatma Süresi Giriniz'}
              value={value}
              onChange={onChange}
              error={error?.message}
            />
          )}
        />

        <div className="w-full flex flex-col items-start gap-2 ">
          <Controller
            control={control}
            name="passDelay"
            render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
              <CustomCheckbox value={value || false} onChange={onChange} label={'Pass Delay'} />
            )}
          />

          {watch('passDelay') && (
            <Controller
              control={control}
              name="passDelayDuration"
              render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
                <CustomTextInput
                  placeholder={'Pass Delay Süresi Giriniz'}
                  value={value || ''}
                  onChange={onChange}
                  error={error?.message}
                  unit={'sn'}
                  className="w-full"
                />
              )}
            />
          )}
        </div>

        <div className="w-full flex flex-col items-start gap-2 ">
          <Controller
            control={control}
            name="hasSound"
            render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
              <CustomCheckbox value={value || false} onChange={onChange} label={'Ses'} />
            )}
          />

          {watch('hasSound') && (
            <Controller
              control={control}
              name="volumeLevel"
              render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
                <CustomTextInput
                  placeholder={'Ses Seviyesi Giriniz'}
                  value={value || ''}
                  onChange={onChange}
                  error={error?.message}
                  className="w-full"
                />
              )}
            />
          )}
        </div>

        <Controller
          control={control}
          name="antipassback"
          render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
            <CustomCheckbox value={value || false} onChange={onChange} label={'Antipassback'} />
          )}
        />

        <Controller
          control={control}
          name="entryReadingEnabled"
          render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
            <CustomCheckbox value={value || false} onChange={onChange} label={'Giriş Okuma'} />
          )}
        />

        <Controller
          control={control}
          name="exitReadingEnabled"
          render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
            <CustomCheckbox value={value || false} onChange={onChange} label={'Çıkış Okuma'} />
          )}
        />

        <Controller
          control={control}
          name="isOnline"
          render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
            <CustomCheckbox value={value || false} onChange={onChange} label={'Online'} />
          )}
        />

        <Controller
          control={control}
          name="isActive"
          render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
            <CustomCheckbox value={value || false} onChange={onChange} label={'Aktif Makine'} />
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

export default MachinesCreateEditForm;
