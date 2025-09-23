import { BaseAxiosService } from '../BaseAxiosService';
import { GenericResponse } from '../types';
import {
  PostCreateManagementCustomerContactParams,
  GetManagementCustomerContactDTO,
  GetManagementCustomerContactParams,
  GetManagementCustomerContactByIdDTO,
  PutManagementCustomerContactByIdParams,
  GetManagementCustomerContactByCustomerIdParams,
  GetManagementCustomerContactByCustomerIdDTO
} from './CustomerContact.types';

export const CustomerContactApi = {
  getManagementCustomerContact: async (params: GetManagementCustomerContactParams): Promise<GetManagementCustomerContactDTO> => {
    const response = await BaseAxiosService.get('/management/customer-contact', { params });
    return response.data;
  },

  getManagementCustomerContactById: async (id: string): Promise<GetManagementCustomerContactByIdDTO> => {
    const response = await BaseAxiosService.get(`/management/customer-contact/${id}`);
    return response.data;
  },

  postCreateManagementCustomerContact: async (body: PostCreateManagementCustomerContactParams): Promise<GenericResponse> => {
    const response = await BaseAxiosService.post('/management/customer-contact', body);
    return response.data;
  },

  putManagementCustomerContactById: async (
    id: string,
    body: PutManagementCustomerContactByIdParams
  ): Promise<GenericResponse> => {
    const response = await BaseAxiosService.put(`/management/customer-contact/${id}`, body);
    return response.data;
  },

  deleteManagementCustomerContactById: async (id: string): Promise<GenericResponse> => {
    const response = await BaseAxiosService.delete(`/management/customer-contact/${id}`);
    return response.data;
  },

  getManagementCustomerContactByCustomerId: async (
    params: GetManagementCustomerContactByCustomerIdParams
  ): Promise<GetManagementCustomerContactByCustomerIdDTO> => {
    const response = await BaseAxiosService.get(`/management/customer-contact/${params.customerId}`, {
      params: { contactKey: params.contactKey }
    });
    return response.data;
  }
};
