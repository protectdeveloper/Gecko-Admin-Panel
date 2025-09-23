import { BaseAxiosService } from '../BaseAxiosService';
import { GenericResponse } from '../types';
import {
  PostCreateManagementMachineParams,
  GetManagementMachinesDTO,
  GetManagementMachinesParams,
  GetManagementMachineByIdDTO,
  PutManagementMachineByIdParams
} from './Machine.types';

export const MachineApi = {
  getManagementMachines: async (params: GetManagementMachinesParams): Promise<GetManagementMachinesDTO> => {
    const response = await BaseAxiosService.get('/management/machine', { params });
    return response.data;
  },

  getManagementMachineById: async (id: string): Promise<GetManagementMachineByIdDTO> => {
    const response = await BaseAxiosService.get(`/management/machine/${id}`);
    return response.data;
  },

  postCreateManagementMachine: async (body: PostCreateManagementMachineParams): Promise<GenericResponse> => {
    const response = await BaseAxiosService.post('/management/machine', body);
    return response.data;
  },

  putManagementMachineById: async (id: string, body: PutManagementMachineByIdParams): Promise<GenericResponse> => {
    const response = await BaseAxiosService.put(`/management/machine/${id}`, body);
    return response.data;
  },

  deleteManagementMachineById: async (id: string): Promise<GenericResponse> => {
    const response = await BaseAxiosService.delete(`/management/machine/${id}`);
    return response.data;
  }
};
