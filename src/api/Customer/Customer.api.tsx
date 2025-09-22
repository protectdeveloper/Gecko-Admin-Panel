import { BaseAxiosService } from '../BaseAxiosService';
import { GenericResponse } from '../types';
import {
  PostCreateManagementCustomerParams,
  GetManagementCustomersDTO,
  GetManagementCustomersParams,
  GetManagementCustomerByIdDTO,
  PutManagementCustomerByIdParams
} from './Customer.types';

export const CustomerApi = {
  getManagementCustomers: async (params: GetManagementCustomersParams): Promise<GetManagementCustomersDTO> => {
    const response = await BaseAxiosService.get('/management/customer', { params });
    return response.data;
  },

  getManagementCustomerById: async (id: string): Promise<GetManagementCustomerByIdDTO> => {
    const response = await BaseAxiosService.get(`/management/customer/${id}`);
    return response.data;
  },

  postCreateManagementCustomer: async (body: PostCreateManagementCustomerParams): Promise<GenericResponse> => {
    const response = await BaseAxiosService.post('/management/customer', body);
    return response.data;
  },

  putManagementCustomerById: async (id: string, body: PutManagementCustomerByIdParams): Promise<GenericResponse> => {
    const response = await BaseAxiosService.put(`/management/customer/${id}`, body);
    return response.data;
  },

  deleteManagementCustomerById: async (id: string): Promise<GenericResponse> => {
    const response = await BaseAxiosService.delete(`/management/customer/${id}`);
    return response.data;
  }
};
