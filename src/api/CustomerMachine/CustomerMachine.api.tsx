import { BaseAxiosService } from '../BaseAxiosService';
import { GenericResponse } from '../types';
import {
  PostCreateManagementCustomerMachineParams,
  GetManagementCustomerMachineDTO,
  GetManagementCustomerMachineParams,
  GetManagementCustomerMachineByIdDTO,
  PutManagementCustomerMachineByIdParams,
  GetManagementCustomerMachineByCustomerIdParams,
  GetManagementCustomerMachineByCustomerIdDTO
} from './CustomerMachine.types';

export const CustomerMachineApi = {
  getManagementCustomerMachine: async (params: GetManagementCustomerMachineParams): Promise<GetManagementCustomerMachineDTO> => {
    const response = await BaseAxiosService.get('/management/customer-machine', { params });
    return response.data;
  },

  getManagementCustomerMachineById: async (id: string): Promise<GetManagementCustomerMachineByIdDTO> => {
    const response = await BaseAxiosService.get(`/management/customer-machine/${id}`);
    return response.data;
  },

  postCreateManagementCustomerMachine: async (body: PostCreateManagementCustomerMachineParams): Promise<GenericResponse> => {
    const response = await BaseAxiosService.post('/management/customer-machine', body);
    return response.data;
  },

  putManagementCustomerMachineById: async (
    id: string,
    body: PutManagementCustomerMachineByIdParams
  ): Promise<GenericResponse> => {
    const response = await BaseAxiosService.put(`/management/customer-machine/${id}`, body);
    return response.data;
  },

  deleteManagementCustomerMachineById: async (id: string): Promise<GenericResponse> => {
    const response = await BaseAxiosService.delete(`/management/customer-machine/${id}`);
    return response.data;
  },

  getManagementCustomerMachineByCustomerId: async (
    params: GetManagementCustomerMachineByCustomerIdParams
  ): Promise<GetManagementCustomerMachineByCustomerIdDTO> => {
    const response = await BaseAxiosService.get(`/management/customer-machine/${params.customerId}`, {
      params: { ...params, customerId: undefined }
    });
    return response.data;
  }
};
