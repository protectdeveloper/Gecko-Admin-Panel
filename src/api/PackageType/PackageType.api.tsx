import { BaseAxiosService } from '../BaseAxiosService';
import { GenericResponse } from '../types';
import {
  GetManagementPackageTypeDTO,
  GetManagementPackageTypeParams,
  GetManagementPackageTypeByIdDTO,
  PostCreateManagementPackageTypeParams,
  PutManagementPackageTypeByIdParams
} from './PackageType.types';

export const PackageTypeApi = {
  getManagementPackageType: async (params: GetManagementPackageTypeParams): Promise<GetManagementPackageTypeDTO> => {
    const response = await BaseAxiosService.get('/management/package-type', { params });
    return response.data;
  },

  getManagementPackageTypeById: async (id: string): Promise<GetManagementPackageTypeByIdDTO> => {
    const response = await BaseAxiosService.get(`/management/package-type/${id}`);
    return response.data;
  },

  postCreateManagementPackageType: async (body: PostCreateManagementPackageTypeParams): Promise<GenericResponse> => {
    const response = await BaseAxiosService.post('/management/package-type', body);
    return response.data;
  },

  putManagementPackageTypeById: async (id: string, body: PutManagementPackageTypeByIdParams): Promise<GenericResponse> => {
    const response = await BaseAxiosService.put(`/management/package-type/${id}`, body);
    return response.data;
  },

  deleteManagementPackageTypeById: async (id: string): Promise<GenericResponse> => {
    const response = await BaseAxiosService.delete(`/management/package-type/${id}`);
    return response.data;
  }
};
