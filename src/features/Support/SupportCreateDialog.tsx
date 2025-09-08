import z from 'zod';
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCirclePlus } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import CustomTextInput from '@/components/inputs/CustomTextInput';
import { CustomSelectBox } from '@/components/inputs/CustomSelectBox';
import CustomTextAreaInput from '@/components/inputs/CustomTextAreaInput';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import MultiPhotoInput from '@/components/inputs/MultiPhotoInput';
import { useTranslation } from 'react-i18next';

const SupportCreateDialog = () => {
  const { t } = useTranslation();

  const SupportCreateSchema = z.object({
    photos: z.array(z.object({ image: z.string(), isUrl: z.boolean() })).optional(),
    requestTitle: z.string().min(1, t('support.supportTitleRequired')),
    requestType: z.string().min(1, t('support.supportTypeRequired')),
    requestUrgencyStatus: z.string().min(1, t('support.requestUrgencyStatusRequired')),
    requestDescription: z.string().min(10, t('support.supportDescriptionRequired'))
  });

  type FormValues = z.infer<typeof SupportCreateSchema>;

  const form = useForm<FormValues>({
    defaultValues: {
      photos: [],
      requestTitle: '',
      requestType: '',
      requestDescription: '',
      requestUrgencyStatus: ''
    },
    resolver: zodResolver(SupportCreateSchema)
  });

  const { handleSubmit, control } = form;

  const onSubmit = async (data: FormValues) => {
    // Handle form submission
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size={'default'} className="shadow-sm" disabled={true}>
          <MessageCirclePlus />
          <span className="hidden md:inline">{t('support.supportTitleCreate')}</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl w-full rounded-xl overflow-auto max-h-screen">
        <DialogHeader>
          <DialogTitle>{t('support.supportTitleCreate')}</DialogTitle>
          <DialogDescription>{t('support.supportDescriptionCreate')}</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <Controller
            control={control}
            name="photos"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <div className="flex flex-col gap-2">
                <MultiPhotoInput value={value || []} onChange={onChange} limit={3} viewMode="carousel" />
                <span className="text-sm text-muted-foreground">{t('support.photoLimitDescription')}</span>
              </div>
            )}
          />

          <Controller
            control={control}
            name="requestType"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <CustomSelectBox
                title={t('support.supportTypeTitle')}
                data={[
                  { value: 'technical', label: 'Teknik Destek' },
                  { value: 'billing', label: 'Faturalama' },
                  { value: 'general', label: 'Genel' }
                ]}
                value={value}
                onValueChange={onChange}
                placeholder={t('support.supportTypePlaceholder')}
                className="w-full"
                error={error?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="requestUrgencyStatus"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <CustomSelectBox
                title={t('support.requestUrgencyStatusTitle')}
                data={[
                  { label: t('support.lowStatus'), value: 'low' },
                  { label: t('support.normalStatus'), value: 'normal' },
                  { label: t('support.urgentStatus'), value: 'urgent' },
                  { label: t('support.criticalStatus'), value: 'critical' }
                ]}
                value={value}
                onValueChange={onChange}
                placeholder={t('support.requestUrgencyStatusPlaceholder')}
                className="w-full"
                error={error?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="requestTitle"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <CustomTextInput
                label={t('support.supportTitle')}
                value={value}
                onChange={onChange}
                placeholder={t('support.supportTitlePlaceholder')}
                error={error?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="requestDescription"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <CustomTextAreaInput
                label={t('support.supportDescriptionTitle')}
                value={value}
                onChange={onChange}
                placeholder={t('support.supportDescriptionPlaceholder')}
                error={error?.message}
              />
            )}
          />
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
              form.reset();
            }}
          >
            {t('support.cancel')}
          </Button>

          <Button onClick={handleSubmit(onSubmit)} variant="default">
            {t('support.create')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SupportCreateDialog;
