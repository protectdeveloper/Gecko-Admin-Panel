import { BaseAxiosService } from '../BaseAxiosService';
import { GenericResponse } from '../types';
import {
  PostCreateManagementMachineTypeAccessMethodParams,
  GetManagementMachineTypeAccessMethodsDTO,
  GetManagementMachineTypeAccessMethodsParams,
  GetManagementMachineTypeAccessMethodByIdDTO,
  PutManagementMachineTypeAccessMethodByIdParams
} from './MachineTypeAccessMethod.types';

export const MachineTypeAccessMethodApi = {
  getManagementMachineTypeAccessMethods: async (
    params: GetManagementMachineTypeAccessMethodsParams
  ): Promise<GetManagementMachineTypeAccessMethodsDTO> => {
    const response = await BaseAxiosService.get('/management/machine-type-access-method', { params });
    return response.data;
  },

  getManagementMachineTypeAccessMethodById: async (id: string): Promise<GetManagementMachineTypeAccessMethodByIdDTO> => {
    const response = await BaseAxiosService.get(`/management/machine-type-access-method/${id}`);
    return response.data;
  },

  postCreateManagementMachineTypeAccessMethod: async (
    body: PostCreateManagementMachineTypeAccessMethodParams
  ): Promise<GenericResponse> => {
    const response = await BaseAxiosService.post('/management/machine-type-access-method', body);
    return response.data;
  },

  putManagementMachineTypeAccessMethodById: async (
    id: string,
    body: PutManagementMachineTypeAccessMethodByIdParams
  ): Promise<GenericResponse> => {
    const response = await BaseAxiosService.put(`/management/machine-type-access-method/${id}`, body);
    return response.data;
  },

  deleteManagementMachineTypeAccessMethodById: async (id: string): Promise<GenericResponse> => {
    const response = await BaseAxiosService.delete(`/management/machine-type-access-method/${id}`);
    return response.data;
  }
};
