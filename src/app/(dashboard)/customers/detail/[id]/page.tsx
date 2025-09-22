import { Metadata } from 'next';
import { Suspense } from 'react';
import { getDynamicMetadata } from '@/lib/getDynamicMetadata';
import CustomerDetailPage from './CustomerDetailPage';

export async function generateMetadata(): Promise<Metadata> {
  return getDynamicMetadata('customers');
}

export default function Page() {
  return (
    <Suspense>
      <CustomerDetailPage />
    </Suspense>
  );
}
