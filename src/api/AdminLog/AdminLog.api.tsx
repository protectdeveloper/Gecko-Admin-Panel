import { BaseAxiosService } from '../BaseAxiosService';
import { GetManagementAdminLogDTO, GetManagementAdminLogParams } from './AdminLog.types';

export const AdminLogApi = {
  getManagementAdminLog: async (params: GetManagementAdminLogParams): Promise<GetManagementAdminLogDTO> => {
    const response = await BaseAxiosService.get('/management/admin-log', { params });
    return response.data;
  }
};
