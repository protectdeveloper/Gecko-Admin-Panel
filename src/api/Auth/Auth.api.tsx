import { BaseAxiosService } from '../BaseAxiosService';
import { GenericResponse } from '../types';
import {
  GetMeSystemAdminDetailDTO,
  PostSystemAdminLoginDTO,
  PostSystemAdminLoginParams,
  PostSystemAdminValidateParams,
  PostSystemAdminValidateResponse
} from './Auth.types';

export const AuthApi = {
  postSystemAdminLogin: async (body: PostSystemAdminLoginParams): Promise<PostSystemAdminLoginDTO> => {
    const response = await BaseAxiosService.post('/auth/system/admin/login', body);

    return {
      data: response.data,
      headers: {
        'x-adminpretoken': response.headers['x-adminpretoken']
      }
    };
  },

  postSystemAdminValidate: async (body: PostSystemAdminValidateParams): Promise<PostSystemAdminValidateResponse> => {
    const response = await BaseAxiosService.post('/auth/system/admin/validate', body);
    return {
      data: response.data,
      headers: {
        'x-admintoken': response.headers['x-admintoken']
      }
    };
  },

  getMeSystemAdminDetail: async (): Promise<GetMeSystemAdminDetailDTO> => {
    const response = await BaseAxiosService.get('/auth/system/admin/detail');
    return response.data;
  }
};
