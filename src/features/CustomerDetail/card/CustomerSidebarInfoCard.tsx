import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { formatAvatarFallback } from '@/utils/formatAvatarFallback';
import { GetManagementCustomerByIdDTO } from '@/api/Customer/Customer.types';
import { AppPreviewAvatar } from '@/components/modals/AppPreviewAvatar';
import { PhotoInput } from '@/components/inputs/PhotoInput';

interface CustomerSidebarInfoCardProps {
  customerData: GetManagementCustomerByIdDTO['data'];
}

const CustomerSidebarInfoCard = ({ customerData }: CustomerSidebarInfoCardProps) => {
  return (
    <div className="flex flex-col items-center gap-3 relative">
      <AppPreviewAvatar.Dialog>
        <AppPreviewAvatar.Trigger>
          <Avatar className="h-24 w-24 cursor-pointer">
            <AvatarImage src={customerData?.logo || undefined} alt="User Avatar" />
            <AvatarFallback>
              {formatAvatarFallback(customerData?.customerName?.split(' ')[0], customerData?.customerName?.split(' ')[1])}
            </AvatarFallback>
          </Avatar>
        </AppPreviewAvatar.Trigger>
        <AppPreviewAvatar.Content
          previewImage={customerData?.logo || undefined}
          title={customerData?.customerName || 'Müşteri'}
          description={`${customerData?.customerName} - ${customerData?.customerCode}`}
        />
      </AppPreviewAvatar.Dialog>

      <Badge variant="outline" className="absolute top-0 right-0">
        {customerData?.isActive ? 'Aktif' : 'Pasif'}
      </Badge>

      <span className="font-medium">
        {customerData?.customerName} - {customerData?.customerCode}
      </span>
    </div>
  );
};

export default CustomerSidebarInfoCard;
