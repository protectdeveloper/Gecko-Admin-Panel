import { Metadata } from 'next';
import { Suspense } from 'react';
import { getDynamicMetadata } from '@/lib/getDynamicMetadata';
import HomePage from './HomePage';

export async function generateMetadata(): Promise<Metadata> {
  return getDynamicMetadata('home');
}

export default function Page() {
  return (
    <Suspense>
      <HomePage />
    </Suspense>
  );
}
