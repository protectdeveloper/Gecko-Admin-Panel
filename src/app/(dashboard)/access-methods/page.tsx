import { Metadata } from 'next';
import { Suspense } from 'react';
import { getDynamicMetadata } from '@/lib/getDynamicMetadata';
import AccessMethodsPage from './AccessMethodsPage';

export async function generateMetadata(): Promise<Metadata> {
  return getDynamicMetadata('accessMethods');
}

export default function Page() {
  return (
    <Suspense>
      <AccessMethodsPage />
    </Suspense>
  );
}
