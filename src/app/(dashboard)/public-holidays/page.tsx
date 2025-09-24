import { Metadata } from 'next';
import { Suspense } from 'react';
import { getDynamicMetadata } from '@/lib/getDynamicMetadata';
import PublicHolidaysPage from './PublicHolidaysPage';

export async function generateMetadata(): Promise<Metadata> {
  return getDynamicMetadata('publicHolidays');
}

export default function Page() {
  return (
    <Suspense>
      <PublicHolidaysPage />
    </Suspense>
  );
}
