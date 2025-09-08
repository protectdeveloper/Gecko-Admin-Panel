export type GetSupportUserTicketsParams = {
  subject?: string;
  status?: string;
  priority?: string;
  createdAt?: string;
  pageNumber?: number;
  pageSize?: number;
};

export type GetSupportUserTicketsDTO = {
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
    closedAt: null;
    isActive: true;
    lastMessage: {
      messageID: string;
      messageContent: string;
      senderType: 'user' | 'admin';
      createdAt: string;
    };
  }[];
  error: string | null;
  statusCode: number;
  count: number;
  totalCount: number;
  pageNumber: number;
  pageSize: number;
};

export type PostCreateSupportUserTicketsParams = {
  subject: string;
  description: string;
  priority: string;
};

export type PostSupportUserTicketMessageParams = {
  ticketID: string;
  messageContent: string;
  replyToMessageID?: string;
};

export type PutSupportUserTicketEditMessageParams = {
  messageID: string;
  messageContent: string;
};

export type GetSupportUserTicketMessagesByIdParams = {
  ticketId: string;
  pageNumber?: number;
  pageSize?: number;
};

export type GetSupportUserTicketMessagesByIdDTO = {
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

export type PostSupportUserTicketMessagePhotoParams = {
  ticketID: string;
  messageContent: string;
  images: {
    isUrl: boolean;
    image: string;
  }[];
};
