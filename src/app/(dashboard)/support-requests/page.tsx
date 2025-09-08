import { Metadata } from 'next';
import { Suspense } from 'react';
import { getDynamicMetadata } from '@/lib/getDynamicMetadata';
import SupportRequestsPage from './SupportRequestsPage';

export async function generateMetadata(): Promise<Metadata> {
  return getDynamicMetadata('support');
}

export default function Page() {
  return (
    <Suspense>
      <SupportRequestsPage />
    </Suspense>
  );
}
