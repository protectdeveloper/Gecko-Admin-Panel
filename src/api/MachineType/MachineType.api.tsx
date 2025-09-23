import { BaseAxiosService } from '../BaseAxiosService';
import { GenericResponse } from '../types';
import {
  PostCreateManagementMachineTypeParams,
  GetManagementMachineTypesDTO,
  GetManagementMachineTypesParams,
  GetManagementMachineTypeByIdDTO,
  PutManagementMachineTypeByIdParams
} from './MachineType.types';

export const MachineTypeApi = {
  getManagementMachineTypes: async (params: GetManagementMachineTypesParams): Promise<GetManagementMachineTypesDTO> => {
    const response = await BaseAxiosService.get('/management/machine-type', { params });
    return response.data;
  },

  getManagementMachineTypeById: async (id: string): Promise<GetManagementMachineTypeByIdDTO> => {
    const response = await BaseAxiosService.get(`/management/machine-type/${id}`);
    return response.data;
  },

  postCreateManagementMachineType: async (body: PostCreateManagementMachineTypeParams): Promise<GenericResponse> => {
    const response = await BaseAxiosService.post('/management/machine-type', body);
    return response.data;
  },

  putManagementMachineTypeById: async (id: string, body: PutManagementMachineTypeByIdParams): Promise<GenericResponse> => {
    const response = await BaseAxiosService.put(`/management/machine-type/${id}`, body);
    return response.data;
  },

  deleteManagementMachineTypeById: async (id: string): Promise<GenericResponse> => {
    const response = await BaseAxiosService.delete(`/management/machine-type/${id}`);
    return response.data;
  }
};
