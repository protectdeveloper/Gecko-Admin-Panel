import { BaseAxiosService } from '../BaseAxiosService';
import { GenericResponse } from '../types';
import {
  GetManagementPackageByIdDTO,
  GetManagementPackageDTO,
  GetManagementPackageParams,
  PostCreateManagementPackageParams,
  PutManagementPackageByIdParams
} from './Package.types';

export const PackageApi = {
  getManagementPackage: async (params: GetManagementPackageParams): Promise<GetManagementPackageDTO> => {
    const response = await BaseAxiosService.get('/management/package', { params });
    return response.data;
  },

  getManagementPackageById: async (id: string): Promise<GetManagementPackageByIdDTO> => {
    const response = await BaseAxiosService.get(`/management/package/${id}`);
    return response.data;
  },

  postCreateManagementPackage: async (body: PostCreateManagementPackageParams): Promise<GenericResponse> => {
    const response = await BaseAxiosService.post('/management/package', body);
    return response.data;
  },

  putManagementPackageById: async (id: string, body: PutManagementPackageByIdParams): Promise<GenericResponse> => {
    const response = await BaseAxiosService.put(`/management/package/${id}`, body);
    return response.data;
  },

  deleteManagementPackageById: async (id: string): Promise<GenericResponse> => {
    const response = await BaseAxiosService.delete(`/management/package/${id}`);
    return response.data;
  }
};
