import { Metadata } from 'next';
import { Suspense } from 'react';
import { getDynamicMetadata } from '@/lib/getDynamicMetadata';
import AdminLogsPage from './AdminLogsPage';

export async function generateMetadata(): Promise<Metadata> {
  return getDynamicMetadata('adminLogs');
}

export default function Page() {
  return (
    <Suspense>
      <AdminLogsPage />
    </Suspense>
  );
}
