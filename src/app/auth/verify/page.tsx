import { Metadata } from 'next';
import { Suspense } from 'react';
import VerifyPage from './VerifyPage';
import { getDynamicMetadata } from '@/lib/getDynamicMetadata';

export async function generateMetadata(): Promise<Metadata> {
  return getDynamicMetadata('verify');
}

export default function Page() {
  return (
    <Suspense>
      <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10 bg-gradient-to-br from-gray-500 via-blue-800 to-gray-500">
        <div className="w-full max-w-sm md:max-w-3xl">
          <VerifyPage />
        </div>
      </div>
    </Suspense>
  );
}
