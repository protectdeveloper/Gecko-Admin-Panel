import React from 'react';
import CustomerDetailSidebarContent from '@/features/CustomerDetail/card/CustomerDetailSidebarContent';
import { getDynamicMetadata } from '@/lib/getDynamicMetadata';
import { Metadata } from 'next';

interface CustomersDetailLayoutProps {
  children: React.ReactNode;
}

export async function generateMetadata(): Promise<Metadata> {
  return getDynamicMetadata('customersDetail');
}

export default function CustomersDetailLayout({ children }: CustomersDetailLayoutProps) {
  return (
    <main className="w-full flex flex-col xl:flex-row gap-4">
      <CustomerDetailSidebarContent />

      <div className="flex-1 rounded-xl border border-border overflow-auto">{children}</div>
    </main>
  );
}
