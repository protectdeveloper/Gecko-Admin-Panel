import { BaseAxiosService } from '../BaseAxiosService';
import { GenericResponse } from '../types';
import {
  GetManagementPublicHolidayByIdDTO,
  GetManagementPublicHolidayByYearDTO,
  GetManagementPublicHolidayDTO,
  GetManagementPublicHolidayParams,
  PostCreateManagementPublicHolidayParams,
  PutManagementPublicHolidayByIdParams
} from './PublicHoliday.types';

export const PublicHolidayApi = {
  getManagementPublicHoliday: async (params: GetManagementPublicHolidayParams): Promise<GetManagementPublicHolidayDTO> => {
    const response = await BaseAxiosService.get('/management/public-holiday', { params });
    return response.data;
  },

  getManagementPublicHolidayById: async (id: string): Promise<GetManagementPublicHolidayByIdDTO> => {
    const response = await BaseAxiosService.get(`/management/public-holiday/${id}`);
    return response.data;
  },

  postCreateManagementPublicHoliday: async (body: PostCreateManagementPublicHolidayParams): Promise<GenericResponse> => {
    const response = await BaseAxiosService.post('/management/public-holiday', body);
    return response.data;
  },

  putManagementPublicHolidayById: async (id: string, body: PutManagementPublicHolidayByIdParams): Promise<GenericResponse> => {
    const response = await BaseAxiosService.put(`/management/public-holiday/${id}`, body);
    return response.data;
  },

  deleteManagementPublicHolidayById: async (id: string): Promise<GenericResponse> => {
    const response = await BaseAxiosService.delete(`/management/public-holiday/${id}`);
    return response.data;
  },

  getManagementPublicHolidayByYear: async (year: number): Promise<GetManagementPublicHolidayByYearDTO> => {
    const response = await BaseAxiosService.get(`/management/public-holiday/year/${year}`);
    return response.data;
  }
};
