import { Metadata } from 'next';
import { Suspense } from 'react';
import LoginPage from './LoginPage';
import { getDynamicMetadata } from '@/lib/getDynamicMetadata';

export async function generateMetadata(): Promise<Metadata> {
  return getDynamicMetadata('login');
}

export default function Page() {
  return (
    <Suspense>
      <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm md:max-w-3xl">
          <LoginPage />
        </div>
      </div>
    </Suspense>
  );
}
