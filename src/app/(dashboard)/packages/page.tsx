import { Metadata } from 'next';
import { Suspense } from 'react';
import { getDynamicMetadata } from '@/lib/getDynamicMetadata';
import PackagesPage from './PackagesPage';

export async function generateMetadata(): Promise<Metadata> {
  return getDynamicMetadata('packages');
}

export default function Page() {
  return (
    <Suspense>
      <PackagesPage />
    </Suspense>
  );
}
