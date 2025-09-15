import { BaseAxiosService } from '../BaseAxiosService';
import { GenericResponse } from '../types';
import {
  GetSupportAdminTicketMessagesByIdDTO,
  GetSupportAdminTicketMessagesByIdParams,
  GetSupportAdminTicketsDTO,
  GetSupportAdminTicketsParams,
  PostSupportAdminTicketMessageParams,
  PostSupportAdminTicketMessagePhotoParams,
  PutSupportAdminTicketEditMessageParams
} from './Support.types';

export const SupportApi = {
  getSupportAdminTickets: async (params: GetSupportAdminTicketsParams): Promise<GetSupportAdminTicketsDTO> => {
    const response = await BaseAxiosService.get('/support/admin/tickets', { params });
    return response.data;
  },

  getSupportAdminTicketMessagesById: async (
    params: GetSupportAdminTicketMessagesByIdParams
  ): Promise<GetSupportAdminTicketMessagesByIdDTO> => {
    const response = await BaseAxiosService.get(`support/admin/ticket-messages/${params.ticketId}`, {
      params: {
        pageNumber: params.pageNumber,
        pageSize: params.pageSize
      }
    });
    return response.data;
  },

  postSupportAdminTicketSendMessage: async (params: PostSupportAdminTicketMessageParams): Promise<GenericResponse> => {
    const response = await BaseAxiosService.post(`/support/admin/ticket-messages`, params);
    return response.data;
  },

  putSupportAdminTicketEditMessage: async (params: PutSupportAdminTicketEditMessageParams): Promise<GenericResponse> => {
    const response = await BaseAxiosService.put(`/support/admin/ticket-messages`, params);
    return response.data;
  },

  deleteSupportAdminTicketDeleteMessage: async (messageID: string): Promise<GenericResponse> => {
    const response = await BaseAxiosService.delete(`/support/admin/ticket-messages/${messageID}`);
    return response.data;
  },

  postSupportAdminTicketSendMessagePhoto: async (params: PostSupportAdminTicketMessagePhotoParams) => {
    const response = await BaseAxiosService.post(`/support/admin/message/photo`, params);
    return response.data;
  }
};
