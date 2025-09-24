import { Metadata } from 'next';
import { Suspense } from 'react';
import { getDynamicMetadata } from '@/lib/getDynamicMetadata';
import ConnectionsPage from './ConnectionsPage';

export async function generateMetadata(): Promise<Metadata> {
  return getDynamicMetadata('connections');
}

export default function Page() {
  return (
    <Suspense>
      <ConnectionsPage />
    </Suspense>
  );
}
