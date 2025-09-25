import { Metadata } from 'next';
import { Suspense } from 'react';
import { getDynamicMetadata } from '@/lib/getDynamicMetadata';
import MachinesTypesPage from './MachinesTypesPage';

export async function generateMetadata(): Promise<Metadata> {
  return getDynamicMetadata('machinesTypes');
}

export default function Page() {
  return (
    <Suspense>
      <MachinesTypesPage />
    </Suspense>
  );
}
