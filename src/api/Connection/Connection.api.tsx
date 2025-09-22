import { BaseAxiosService } from '../BaseAxiosService';
import { GenericResponse } from '../types';
import {
  GetManagementConnectionByIdDTO,
  GetManagementConnectionCustomerByIdDTO,
  GetManagementConnectionCustomerByIdParams,
  GetManagementConnectionDTO,
  GetManagementConnectionParams,
  PostCreateManagementConnectionParams,
  PutManagementConnectionByIdParams
} from './Connection.types';

export const ConnectionApi = {
  getManagementConnection: async (params: GetManagementConnectionParams): Promise<GetManagementConnectionDTO> => {
    const response = await BaseAxiosService.get('/management/connection', { params });
    return response.data;
  },

  getManagementConnectionById: async (id: string): Promise<GetManagementConnectionByIdDTO> => {
    const response = await BaseAxiosService.get(`/management/connection/${id}`);
    return response.data;
  },

  postCreateManagementConnection: async (body: PostCreateManagementConnectionParams): Promise<GenericResponse> => {
    const response = await BaseAxiosService.post('/management/connection', body);
    return response.data;
  },

  putManagementConnectionById: async (id: string, body: PutManagementConnectionByIdParams): Promise<GenericResponse> => {
    const response = await BaseAxiosService.put(`/management/connection/${id}`, body);
    return response.data;
  },

  deleteManagementConnectionById: async (id: string): Promise<GenericResponse> => {
    const response = await BaseAxiosService.delete(`/management/connection/${id}`);
    return response.data;
  },

  getManagementConnectionCustomerByCustomerId: async (
    params: GetManagementConnectionCustomerByIdParams
  ): Promise<GetManagementConnectionCustomerByIdDTO> => {
    const response = await BaseAxiosService.get(`/management/connection/customer/${params.customerId}`, {
      params: { connectionType: params.connectionType, isActive: params.isActive }
    });
    return response.data;
  }
};
