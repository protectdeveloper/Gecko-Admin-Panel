import { useQuery } from '@tanstack/react-query';
import { AdminLogApi } from './AdminLog.api';
import { GetManagementAdminLogParams } from './AdminLog.types';

export const getManagementAdminLogQueryOptions = (params: GetManagementAdminLogParams) => ({
  queryKey: ['getManagementAdminLog', params],
  queryFn: () => AdminLogApi.getManagementAdminLog(params)
});

export const useGetAdminLogQuery = (params: GetManagementAdminLogParams) => {
  return useQuery(getManagementAdminLogQueryOptions(params));
};
