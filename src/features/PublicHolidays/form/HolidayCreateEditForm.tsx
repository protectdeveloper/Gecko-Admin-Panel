'use client';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { AppSheet } from '@/components/AppSheet';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomTextInput from '@/components/inputs/CustomTextInput';
import {
  useGetPublicHolidayByIdQuery,
  usePostCreatePublicHolidayMutation,
  usePutPublicHolidayByIdMutation
} from '@/api/PublicHoliday/PublicHoliday.hook';
import { CustomUiSingleDateTimePicker } from '@/components/inputs/CustomUiSingleDateTimePicker';

interface HolidayCreateEditFormProps {
  holidayId?: string;
}

const HolidayCreateEditForm = ({ holidayId }: HolidayCreateEditFormProps) => {
  const { mutateAsync: postCreateHoliday } = usePostCreatePublicHolidayMutation();
  const { mutateAsync: putUpdateHoliday } = usePutPublicHolidayByIdMutation();
  const { data: holidayDetailData } = useGetPublicHolidayByIdQuery(holidayId as string);

  const HolidayCreateEditFormSchema = z.object({
    holidayName: z.string().min(1, 'Tatıl Adı zorunludur.'),
    startTime: z.string().min(1, 'Başlangıç Zamanı zorunludur.'),
    endTime: z.string().min(1, 'Bitiş Zamanı zorunludur.')
  });

  type FormValues = z.infer<typeof HolidayCreateEditFormSchema>;

  const form = useForm<FormValues>({
    values: {
      holidayName: holidayDetailData?.data.holidayName || '',
      startTime: holidayDetailData?.data?.startTime
        ? new Date(new Date(holidayDetailData?.data?.startTime).getTime() + 3 * 60 * 60 * 1000).toISOString()
        : '',
      endTime: holidayDetailData?.data?.endTime
        ? new Date(new Date(holidayDetailData?.data?.endTime).getTime() + 3 * 60 * 60 * 1000).toISOString()
        : ''
    },
    resolver: zodResolver(HolidayCreateEditFormSchema)
  });

  const { handleSubmit, control, watch, setValue } = form;

  const onSubmit = async (data: FormValues) => {
    if (holidayId) {
      await handleEditHolidayPress(data);
    } else {
      await handleCreateHolidayPress(data);
    }
  };

  const handleCreateHolidayPress = async (data: FormValues) => {
    const response = await postCreateHoliday({
      holidayName: data.holidayName,
      startTime: data.startTime,
      endTime: data.endTime
    });

    if (response.success) {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    }
  };

  const handleEditHolidayPress = async (data: FormValues) => {
    if (!holidayId) return;

    const response = await putUpdateHoliday({
      id: holidayId,
      body: {
        holidayID: holidayId,
        holidayName: data.holidayName,
        startTime: data.startTime,
        endTime: data.endTime
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
          name="holidayName"
          render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
            <CustomTextInput
              label={'Tatıl Adı'}
              placeholder={'Tatıl Adı Giriniz'}
              value={value}
              onChange={onChange}
              error={error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name={'startTime'}
          render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
            <CustomUiSingleDateTimePicker
              value={value ? new Date(value) : null}
              onChange={(value) => {
                if (value) {
                  onChange(value.toISOString());
                }
              }}
              title={'Başlangıç Tarihi'}
              error={error?.message}
              minDate={new Date(Date.now() + 3 * 60 * 60 * 1000)}
              maxDate={watch('endTime') ? new Date(watch('endTime')) : undefined}
            />
          )}
        />

        <Controller
          control={control}
          name={'endTime'}
          render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
            <CustomUiSingleDateTimePicker
              value={value ? new Date(value) : null}
              onChange={(value) => {
                if (value) {
                  onChange(value.toISOString());
                }
              }}
              title={'Bitiş Tarihi'}
              error={error?.message}
              minDate={watch('startTime') ? new Date(watch('startTime')) : new Date(Date.now() + 3 * 60 * 60 * 1000)}
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

export default HolidayCreateEditForm;
