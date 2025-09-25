'use client';
import { useDeleteCustomerByIdMutation, useGetCustomerByIdQuery } from '@/api/Customer/Customer.hook';
import { AppSheet } from '@/components/AppSheet';
import { Button } from '@/components/ui/button';
import { Menu, Pencil, Trash2 } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React, { Fragment } from 'react';
import CustomerInfoCard from './CustomerInfoCard';
import CustomerSidebarInfoCard from './CustomerSidebarInfoCard';
import { AppAlert } from '@/components/AppAlert';
import CustomerCreateEditForm from '@/features/Customers/form/CustomerCreateEditForm';

const CustomerDetailSidebarContent = () => {
  const pathname = usePathname() || '';
  const customerId = pathname.split('/').pop() || '';

  const { data: customerData } = useGetCustomerByIdQuery(customerId as string);
  const { mutateAsync: deleteCustomer } = useDeleteCustomerByIdMutation();

  const handleDeleteCustomerPress = async (customerId: string) => {
    const response = await deleteCustomer(customerId);
    if (response?.success) {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    }
  };

  return (
    <Fragment>
      <div className="xl:hidden flex items-center gap-3">
        <AppSheet.Sheet>
          <AppSheet.Trigger asChild>
            <Button variant={'outline'} size={'icon'} className="xl:hidden w-min h-min p-2" aria-label="Menüyü Aç/Kapat">
              <Menu size={20} />
            </Button>
          </AppSheet.Trigger>
          <AppSheet.Content side="left" title={'Firma Bilgileri'}>
            <div className="w-full px-4">
              <CustomerInfoCard customerData={customerData?.data!!} />
            </div>
          </AppSheet.Content>
        </AppSheet.Sheet>

        <CustomerInfoCard customerData={customerData?.data!!} />
      </div>

      <div className="hidden xl:block sticky top-[85px] h-[calc(100vh-105px)] self-start w-sm bg-card border border-border p-4 rounded-xl overflow-y-auto">
        <nav className="w-full space-y-2">
          <CustomerSidebarInfoCard customerData={customerData?.data!!} />

          <div className="flex items-center justify-center gap-2">
            <AppSheet.Sheet>
              <AppSheet.Trigger asChild>
                <Button variant="outline" size="icon">
                  <Pencil size={20} />
                </Button>
              </AppSheet.Trigger>
              <AppSheet.Content title={'Firma Düzenle'}>
                <CustomerCreateEditForm customerId={customerId} />
              </AppSheet.Content>
            </AppSheet.Sheet>

            <AppAlert.AlertDialog>
              <AppAlert.Trigger asChild>
                <Button variant="outline" size="icon">
                  <Trash2 size={20} />
                </Button>
              </AppAlert.Trigger>
              <AppAlert.Content
                title={'Firma Sil'}
                description={` ${customerData?.data?.customerName} adlı firmayı silmek istediğinize emin misiniz ?`}
              >
                <AppAlert.Footer>
                  <AppAlert.Close asChild>
                    <Button variant="outline">{'İptal'}</Button>
                  </AppAlert.Close>

                  <Button onClick={() => handleDeleteCustomerPress(customerId)} variant="destructive" className="text-white">
                    {'Sil'}
                  </Button>
                </AppAlert.Footer>
              </AppAlert.Content>
            </AppAlert.AlertDialog>
          </div>
        </nav>
      </div>
    </Fragment>
  );
};

export default CustomerDetailSidebarContent;
