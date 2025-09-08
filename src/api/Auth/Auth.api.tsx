import { BaseAxiosService } from '../BaseAxiosService';
import { GenericResponse } from '../types';
import {
  GetCustomersAuthUserCheckReservationDTO,
  GetCustomersUserCheckReservationDTO,
  GetCustomersUserCheckReservationParams,
  GetCustomersVisitorPreviewDTO,
  GetCustomersVisitorPreviewParams,
  GetMeUserDetailDTO,
  PostCustomersUserAuthUserCompleteReservationParams,
  PostCustomersUserCompleteReservationParams,
  PostCustomerUserForgotPasswordCheckParams,
  PostCustomerUserForgotPasswordCheckResponse,
  PostCustomerUserForgotPasswordConfirmParams,
  PostCustomerUserForgotPasswordConfirmResponse,
  PostCustomerUserForgotPasswordParams,
  PostCustomerUserForgotPasswordResponse,
  PostCustomerUserLoginParams,
  PostCustomerUserLoginResponse,
  PostCustomerUserValidateParams,
  PostCustomerUserValidateResponse
} from './Auth.types';

export const AuthApi = {
  postCustomerUserLogin: async (body: PostCustomerUserLoginParams): Promise<PostCustomerUserLoginResponse> => {
    const response = await BaseAxiosService.post('/auth/customers/auth-user/login', body);

    return {
      data: response.data,
      headers: {
        'x-authuserpretoken': response.headers['x-authuserpretoken']
      }
    };
  },

  postCustomerUserValidate: async (body: PostCustomerUserValidateParams): Promise<PostCustomerUserValidateResponse> => {
    const response = await BaseAxiosService.post('/auth/customers/auth-user/validate', body);
    return {
      data: response.data,
      headers: {
        'x-authusertoken': response.headers['x-authusertoken']
      }
    };
  },

  getCustomerUserValidateToken: async (): Promise<GenericResponse> => {
    const response = await BaseAxiosService.get('/auth/customers/auth-user/validate-token');
    return response.data;
  },

  postCustomerUserForgotPassword: async (
    body: PostCustomerUserForgotPasswordParams
  ): Promise<PostCustomerUserForgotPasswordResponse> => {
    const response = await BaseAxiosService.post('/auth/customers/auth-user/forgot-password', body);

    return response.data;
  },

  postCustomerUserForgotPasswordCheck: async (
    body: PostCustomerUserForgotPasswordCheckParams
  ): Promise<PostCustomerUserForgotPasswordCheckResponse> => {
    const response = await BaseAxiosService.post('/auth/customers/auth-user/forgot-password-check', body);

    return response.data;
  },

  postCustomerUserForgotPasswordConfirm: async (
    body: PostCustomerUserForgotPasswordConfirmParams
  ): Promise<PostCustomerUserForgotPasswordConfirmResponse> => {
    const response = await BaseAxiosService.post('/auth/customers/auth-user/forgot-password-confirm', body);

    return response.data;
  },

  getMeUserDetail: async (): Promise<GetMeUserDetailDTO> => {
    const response = await BaseAxiosService.get('/auth/customers/auth-user/detail');
    return response.data;
  },

  getCustomersAuthUserCheckReservation: async (
    params: GetCustomersUserCheckReservationParams
  ): Promise<GetCustomersAuthUserCheckReservationDTO> => {
    const response = await BaseAxiosService.get(`/auth/customers/auth-user/check-reservation`, { params });
    return response.data;
  },

  getCustomersUserCheckReservation: async (
    params: GetCustomersUserCheckReservationParams
  ): Promise<GetCustomersUserCheckReservationDTO> => {
    const response = await BaseAxiosService.get(`/auth/customers/user/check-reservation`, { params });
    return response.data;
  },

  postCustomersUserCompleteReservation: async (body: PostCustomersUserCompleteReservationParams): Promise<GenericResponse> => {
    const response = await BaseAxiosService.post('/auth/customers/user/complete-reservation', body);
    return response.data;
  },

  postCustomersUserAuthUserCompleteReservation: async (
    body: PostCustomersUserAuthUserCompleteReservationParams
  ): Promise<GenericResponse> => {
    const response = await BaseAxiosService.post('/auth/customers/auth-user/complete-reservation', body);
    return response.data;
  },

  getCustomersVisitorPreview: async (params: GetCustomersVisitorPreviewParams): Promise<GetCustomersVisitorPreviewDTO> => {
    const response = await BaseAxiosService.get('/auth/customers/visitor/preview', {
      params
    });
    return response.data;
  }
};
