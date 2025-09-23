import { Metadata } from 'next';
import { Suspense } from 'react';
import { getDynamicMetadata } from '@/lib/getDynamicMetadata';
import MachinesPage from './MachinesPage';

export async function generateMetadata(): Promise<Metadata> {
  return getDynamicMetadata('machines');
}

export default function Page() {
  return (
    <Suspense>
      <MachinesPage />
    </Suspense>
  );
}
