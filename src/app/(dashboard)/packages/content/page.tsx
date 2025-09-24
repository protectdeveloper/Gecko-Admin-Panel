import { Metadata } from 'next';
import { Suspense } from 'react';
import { getDynamicMetadata } from '@/lib/getDynamicMetadata';
import PackagesContentPage from './PackagesContentPage';

export async function generateMetadata(): Promise<Metadata> {
  return getDynamicMetadata('packagesContent');
}

export default function Page() {
  return (
    <Suspense>
      <PackagesContentPage />
    </Suspense>
  );
}
