'use client';

import { useRouter } from 'next/navigation';
import { useLoginStore } from '@/store/useLoginStore';
import { queryClient } from '@/providers/QueryProvider';
import { useAuthStore } from '@/store/useAuthStore';
import { toast } from 'sonner';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  getMeSystemAdminDetailQueryOptions,
  useSystemAdminLoginMutation,
  useSystemAdminValidateMutation
} from '@/api/Auth/Auth.hook';
import VerifyPhoneForm from '@/features/Verify/Form/VerifyPhoneForm';

const VerifyPage = () => {
  return (
    <div className={'flex flex-col gap-6'}>
      <VerifyPhoneForm />
    </div>
  );
};

export default VerifyPage;
