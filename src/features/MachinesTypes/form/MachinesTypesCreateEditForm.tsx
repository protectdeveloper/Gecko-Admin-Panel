'use client';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { AppSheet } from '@/components/AppSheet';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomTextInput from '@/components/inputs/CustomTextInput';
import CustomCheckbox from '@/components/inputs/CustomCheckbox';
import {
  useGetMachineTypeByIdQuery,
  usePostCreateMachineTypeMutation,
  usePutUpdateMachineTypeByIdMutation
} from '@/api/MachineType/MachineType.hook';
import CustomTextAreaInput from '@/components/inputs/CustomTextAreaInput';
import { PhotoInput } from '@/components/inputs/PhotoInput';

interface MachinesTypesCreateEditFormProps {
  machineTypeId?: string;
}

const MachinesTypesCreateEditForm = ({ machineTypeId }: MachinesTypesCreateEditFormProps) => {
  const { data: machineTypesDetailData } = useGetMachineTypeByIdQuery(machineTypeId as string);
  const { mutateAsync: postCreateMachineType } = usePostCreateMachineTypeMutation();
  const { mutateAsync: putUpdateMachineType } = usePutUpdateMachineTypeByIdMutation();

  const MachinesTypesCreateEditFormSchema = z.object({
    typeName: z.string().min(2, 'En az 2 karakter olmalı'),
    systemName: z.string().min(2, 'En az 2 karakter olmalı'),
    description: z.string().min(2, 'En az 2 karakter olmalı'),
    photoOriginal: z.string().trim().optional(),
    photoThumbnail: z.string().trim().optional(),
    isActive: z.boolean().optional()
  });

  type FormValues = z.infer<typeof MachinesTypesCreateEditFormSchema>;

  const form = useForm<FormValues>({
    values: {
      typeName: machineTypesDetailData?.data.typeName || '',
      systemName: machineTypesDetailData?.data.systemName || '',
      description: machineTypesDetailData?.data.description || '',
      photoOriginal: machineTypesDetailData?.data.originalImage || '',
      photoThumbnail: machineTypesDetailData?.data.thumbnailImage || '',
      isActive: machineTypesDetailData?.data.isActive || false
    },
    resolver: zodResolver(MachinesTypesCreateEditFormSchema)
  });

  const { handleSubmit, control, watch, setValue } = form;

  const onSubmit = async (data: FormValues) => {
    if (machineTypeId) {
      await handleEditMachineTypePress(data);
    } else {
      await handleCreateMachineTypePress(data);
    }
  };

  const handleCreateMachineTypePress = async (data: FormValues) => {
    const response = await postCreateMachineType({
      typeName: data.typeName,
      systemName: data.systemName,
      description: data.description,
      originalImage: data.photoOriginal || '',
      thumbnailImage: data.photoThumbnail || '',
      isActive: data.isActive || false
    });

    if (response?.success) {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    }
  };

  const handleEditMachineTypePress = async (data: FormValues) => {
    if (!machineTypeId) return;

    const response = await putUpdateMachineType({
      id: machineTypeId,
      body: {
        machineTypeID: machineTypeId,
        typeName: data.typeName,
        systemName: data.systemName,
        description: data.description,
        originalImage: data.photoOriginal || '',
        thumbnailImage: data.photoThumbnail || '',
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
          name="photoOriginal"
          render={({ field: { onChange, value } }) => (
            <PhotoInput
              value={value}
              previewImage={watch('photoOriginal')}
              onChange={(result) => {
                onChange(result.originalImage);
                setValue('photoThumbnail', result.thumbnailImage);
              }}
              onDeletePhotoPress={() => {
                setValue('photoOriginal', '');
                setValue('photoThumbnail', '');
              }}
              firstName={'MachineType'}
              lastName={'MachineType'}
            />
          )}
        />

        <Controller
          control={control}
          name="typeName"
          render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
            <CustomTextInput
              label="Makine Tipi Adı"
              placeholder="Makine Tipi Adı"
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
              label="Sistem Adı"
              placeholder="Sistem Adı"
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
              value={value || ''}
              onChange={onChange}
              error={error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="isActive"
          render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
            <CustomCheckbox value={value || false} onChange={onChange} label={'Aktif Makine Tipi'} />
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

export default MachinesTypesCreateEditForm;
