import { BaseAxiosService } from '../BaseAxiosService';
import { GenericResponse } from '../types';
import {
  GetManagementAccessMethodDTO,
  GetManagementAccessMethodParams,
  GetManagementAccessMethodByIdDTO,
  PostCreateManagementAccessMethodParams,
  PutManagementAccessMethodByIdParams
} from './AccessMethod.types';

export const AccessMethodApi = {
  getManagementAccessMethod: async (params: GetManagementAccessMethodParams): Promise<GetManagementAccessMethodDTO> => {
    const response = await BaseAxiosService.get('/management/access-method', { params });
    return response.data;
  },

  getManagementAccessMethodById: async (id: string): Promise<GetManagementAccessMethodByIdDTO> => {
    const response = await BaseAxiosService.get(`/management/access-method/${id}`);
    return response.data;
  },

  postCreateManagementAccessMethod: async (body: PostCreateManagementAccessMethodParams): Promise<GenericResponse> => {
    const response = await BaseAxiosService.post('/management/access-method', body);
    return response.data;
  },

  putManagementAccessMethodById: async (id: string, body: PutManagementAccessMethodByIdParams): Promise<GenericResponse> => {
    const response = await BaseAxiosService.put(`/management/access-method/${id}`, body);
    return response.data;
  },

  deleteManagementAccessMethodById: async (id: string): Promise<GenericResponse> => {
    const response = await BaseAxiosService.delete(`/management/access-method/${id}`);
    return response.data;
  }
};
