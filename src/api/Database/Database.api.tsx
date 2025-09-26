import { BaseAxiosService } from '../BaseAxiosService';
import { GenericResponse } from '../types';

export const DatabaseApi = {
  postCreateDatabase: async (body: { databaseName: string }): Promise<GenericResponse> => {
    const response = await BaseAxiosService.post('/Database/create', body);
    return response.data;
  }
};
