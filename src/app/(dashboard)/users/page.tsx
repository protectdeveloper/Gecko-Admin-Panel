import { Metadata } from 'next';
import { Suspense } from 'react';
import { getDynamicMetadata } from '@/lib/getDynamicMetadata';
import AllUsersPage from './AllUsersPage';

export async function generateMetadata(): Promise<Metadata> {
  return getDynamicMetadata('users');
}

export default function Page() {
  return (
    <Suspense>
      <AllUsersPage />
    </Suspense>
  );
}
