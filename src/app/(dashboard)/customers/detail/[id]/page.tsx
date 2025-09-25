import { Suspense } from 'react';
import CustomerDetailPage from './CustomerDetailPage';

export default function Page() {
  return (
    <Suspense>
      <CustomerDetailPage />
    </Suspense>
  );
}
