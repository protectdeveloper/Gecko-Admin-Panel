import { Metadata } from 'next';
import { Suspense } from 'react';
import { getDynamicMetadata } from '@/lib/getDynamicMetadata';
import CustomersPage from './CustomersPage';

export async function generateMetadata(): Promise<Metadata> {
  return getDynamicMetadata('customers');
}

export default function Page() {
  return (
    <Suspense>
      <CustomersPage />
    </Suspense>
  );
}
