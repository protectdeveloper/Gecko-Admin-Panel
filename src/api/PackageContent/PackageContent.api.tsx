import { BaseAxiosService } from '../BaseAxiosService';
import { GenericResponse } from '../types';
import {
  GetManagementPackageContentDTO,
  GetManagementPackageContentParams,
  GetManagementPackageContentByIdDTO,
  PostCreateManagementPackageContentParams,
  PutManagementPackageContentByIdParams
} from './PackageContent.types';

export const PackageContentApi = {
  getManagementPackageContent: async (params: GetManagementPackageContentParams): Promise<GetManagementPackageContentDTO> => {
    const response = await BaseAxiosService.get('/management/package-content', { params });
    return response.data;
  },

  getManagementPackageContentById: async (id: string): Promise<GetManagementPackageContentByIdDTO> => {
    const response = await BaseAxiosService.get(`/management/package-content/${id}`);
    return response.data;
  },

  postCreateManagementPackageContent: async (body: PostCreateManagementPackageContentParams): Promise<GenericResponse> => {
    const response = await BaseAxiosService.post('/management/package-content', body);
    return response.data;
  },

  putManagementPackageContentById: async (id: string, body: PutManagementPackageContentByIdParams): Promise<GenericResponse> => {
    const response = await BaseAxiosService.put(`/management/package-content/${id}`, body);
    return response.data;
  },

  deleteManagementPackageContentById: async (id: string): Promise<GenericResponse> => {
    const response = await BaseAxiosService.delete(`/management/package-content/${id}`);
    return response.data;
  }
};
