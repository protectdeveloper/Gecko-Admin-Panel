import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { formatAvatarFallback } from '@/utils/formatAvatarFallback';
import { GetManagementCustomerByIdDTO } from '@/api/Customer/Customer.types';

interface CustomerInfoCardProps {
  customerData: GetManagementCustomerByIdDTO['data'];
}

const CustomerInfoCard = ({ customerData }: CustomerInfoCardProps) => {
  return (
    <div className="flex items-center gap-3">
      <Avatar className="h-12 w-12">
        <AvatarImage src={customerData?.logo || undefined} alt="User Avatar" />
        <AvatarFallback>
          {formatAvatarFallback(customerData?.customerName?.split(' ')[0], customerData?.customerName?.split(' ')[1])}
        </AvatarFallback>
      </Avatar>

      <span className="font-medium">
        {customerData?.customerName} - {customerData?.customerCode}
      </span>

      <Badge variant="outline">{customerData?.isActive ? 'Aktif' : 'Pasif'}</Badge>
    </div>
  );
};

export default CustomerInfoCard;
