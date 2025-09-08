import { BaseAxiosService } from '../BaseAxiosService';
import { GenericResponse } from '../types';
import {
  GetSupportUserTicketMessagesByIdDTO,
  GetSupportUserTicketMessagesByIdParams,
  GetSupportUserTicketsDTO,
  GetSupportUserTicketsParams,
  PostCreateSupportUserTicketsParams,
  PostSupportUserTicketMessageParams,
  PostSupportUserTicketMessagePhotoParams,
  PutSupportUserTicketEditMessageParams
} from './Support.types';

export const SupportApi = {
  getSupportUserTickets: async (params: GetSupportUserTicketsParams): Promise<GetSupportUserTicketsDTO> => {
    const response = await BaseAxiosService.get('/support/user/tickets', { params });
    return response.data;
  },

  postCreateSupportUserTickets: async (params: PostCreateSupportUserTicketsParams): Promise<GenericResponse> => {
    const response = await BaseAxiosService.post(`/support/user/tickets`, params);
    return response.data;
  },

  getSupportUserTicketMessagesById: async (
    params: GetSupportUserTicketMessagesByIdParams
  ): Promise<GetSupportUserTicketMessagesByIdDTO> => {
    const response = await BaseAxiosService.get(`support/user/ticket-messages/${params.ticketId}`, {
      params: {
        pageNumber: params.pageNumber,
        pageSize: params.pageSize
      }
    });
    return response.data;
  },

  postSupportUserTicketSendMessage: async (params: PostSupportUserTicketMessageParams): Promise<GenericResponse> => {
    const response = await BaseAxiosService.post(`/support/user/ticket-messages`, params);
    return response.data;
  },

  putSupportUserTicketEditMessage: async (params: PutSupportUserTicketEditMessageParams): Promise<GenericResponse> => {
    const response = await BaseAxiosService.put(`/support/user/ticket-messages`, params);
    return response.data;
  },

  deleteSupportUserTicketDeleteMessage: async (messageID: string): Promise<GenericResponse> => {
    const response = await BaseAxiosService.delete(`/support/user/ticket-messages/${messageID}`);
    return response.data;
  },

  postSupportUserTicketSendMessagePhoto: async (params: PostSupportUserTicketMessagePhotoParams) => {
    const response = await BaseAxiosService.post(`/support/user/message/photo`, params);
    return response.data;
  }
};
