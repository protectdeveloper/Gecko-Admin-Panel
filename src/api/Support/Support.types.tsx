export type GetSupportAdminTicketsParams = {
  subject?: string;
  status?: string;
  priority?: string;
  createdAt?: string;
  pageNumber?: number;
  pageSize?: number;
  customerId?: string;
};

export type GetSupportAdminTicketsDTO = {
  success: true;
  message: string;
  data: {
    ticketID: string;
    subject: string;
    description: string;
    status: string;
    priority: string;
    createdAt: string;
    updatedAt: string;
    closedAt: string | null;
    isActive: boolean;
    customerID: string;
    userID: string;
    lastMessage: {
      messageID: string;
      messageContent: string;
      senderType: 'user' | 'admin';
      createdAt: string;
    };
    customer: {
      customerName: string;
      customerCode: string;
      logo: string | null;
      isActive: boolean;
    };
    user: {
      firstName: string;
      lastName: string;
      fullName: string;
      email: string;
      phoneNumber: string;
      username: string;
      isActive: boolean;
      isSuperUser: boolean;
    };
    role: {
      roleID: string;
      roleName: string;
      description: string;
      isActive: boolean;
      isDefault: boolean;
    };
  }[];
  error: string | null;
  statusCode: number;
  count: number;
  totalCount: number;
  pageNumber: number;
  pageSize: number;
};

export type PostSupportAdminTicketMessageParams = {
  ticketID: string;
  messageContent: string;
  isInternal?: boolean;
  replyToMessageID?: string;
};

export type PutSupportAdminTicketEditMessageParams = {
  messageID: string;
  messageContent: string;
};

export type GetSupportAdminTicketMessagesByIdParams = {
  ticketId: string;
  pageNumber?: number;
  pageSize?: number;
  includeInternal?: boolean;
};

export type GetSupportAdminTicketMessagesByIdDTO = {
  success: boolean;
  message: string;
  data: {
    messageID: string;
    ticketID: string;
    senderType: 'user' | 'admin';
    messageContent: string;
    createdAt: string;
    replyToMessage: {
      messageID: string;
      messageContent: string;
      senderType: 'user' | 'admin';
      createdAt: string;
    };
    photos: {
      ticketMessagePhotoID: string;
      isUrl: boolean;
      image: string;
    }[];
  }[];
  error: string | null;
  statusCode: number;
  count: number;
  totalCount: number;
  pageNumber: number;
  pageSize: number;
};

export type PostSupportAdminTicketMessagePhotoParams = {
  ticketID: string;
  messageContent: string;
  isInternal: boolean;
  images: {
    isUrl: boolean;
    image: string;
  }[];
};
