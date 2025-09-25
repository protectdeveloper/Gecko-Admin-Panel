import { Metadata } from 'next';
import { Suspense } from 'react';
import { getDynamicMetadata } from '@/lib/getDynamicMetadata';
import CustomersMachinesPage from './CustomersMachinesPage';

export async function generateMetadata(): Promise<Metadata> {
  return getDynamicMetadata('customersMachines');
}

export default function Page() {
  return (
    <Suspense>
      <CustomersMachinesPage />
    </Suspense>
  );
}
