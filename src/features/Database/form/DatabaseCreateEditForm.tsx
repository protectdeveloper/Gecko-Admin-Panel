'use client';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomTextInput from '@/components/inputs/CustomTextInput';
import { AppAlert } from '@/components/AppAlert';
import { usePostCreateDatabaseMutation } from '@/api/Database/Database.hook';

const DatabaseCreateEditForm = () => {
  const { mutateAsync: createDatabase } = usePostCreateDatabaseMutation();

  const DatabaseCreateEditFormSchema = z.object({
    databaseName: z.string().min(1, 'Veritabanı adı zorunludur')
  });

  type FormValues = z.infer<typeof DatabaseCreateEditFormSchema>;

  const form = useForm<FormValues>({
    values: {
      databaseName: ''
    },
    resolver: zodResolver(DatabaseCreateEditFormSchema)
  });

  const { handleSubmit, control } = form;

  const onSubmit = async (data: FormValues) => {
    const response = await createDatabase({ databaseName: data.databaseName });

    if (response?.success) {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    }
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex-1 flex flex-col overflow-auto gap-4">
        <Controller
          control={control}
          name="databaseName"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <CustomTextInput
              label={'Veritabanı Adı'}
              placeholder={'Veritabanı Adı Giriniz'}
              value={value}
              onChange={onChange}
              error={error?.message}
            />
          )}
        />
      </div>

      <div className="flex flex-row gap-2">
        <AppAlert.Close asChild>
          <Button variant="outline" className="flex-1">
            İptal
          </Button>
        </AppAlert.Close>
        <Button variant="default" className="flex-1" onClick={handleSubmit(onSubmit)}>
          Kaydet
        </Button>
      </div>
    </div>
  );
};

export default DatabaseCreateEditForm;
