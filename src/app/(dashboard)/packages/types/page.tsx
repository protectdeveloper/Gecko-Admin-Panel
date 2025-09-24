import { Metadata } from 'next';
import { Suspense } from 'react';
import { getDynamicMetadata } from '@/lib/getDynamicMetadata';
import PackagesTypesPage from './PackagesTypesPage';

export async function generateMetadata(): Promise<Metadata> {
  return getDynamicMetadata('packagesTypes');
}

export default function Page() {
  return (
    <Suspense>
      <PackagesTypesPage />
    </Suspense>
  );
}
