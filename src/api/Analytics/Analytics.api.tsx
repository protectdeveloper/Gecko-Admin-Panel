import { get } from 'http';
import { BaseAxiosService } from '../BaseAxiosService';
import {
  GetManagementAnalyticsAdminLogsDTO,
  GetManagementAnalyticsAdminLogsParams,
  GetManagementAnalyticsCustomersCountDTO,
  GetManagementAnalyticsCustomersDatabaseSizesDTO,
  GetManagementAnalyticsCustomersDetailedDTO,
  GetManagementAnalyticsDatabaseBlockAnalysisDTO,
  GetManagementAnalyticsDatabaseBlockSummaryDTO,
  GetManagementAnalyticsDatabaseSizeSummaryDTO,
  GetManagementAnalyticsMachinesCountDTO,
  GetManagementAnalyticsMessageCreditDTO,
  GetManagementAnalyticsMicroservicesHealthDTO,
  GetManagementAnalyticsPackagesExpiringDTO,
  GetManagementAnalyticsPackagesExpiringParams,
  GetManagementAnalyticsPassesCountDTO,
  GetManagementAnalyticsPassesCountParams,
  GetManagementAnalyticsPassesStatisticsDTO,
  GetManagementAnalyticsPassesStatisticsParams,
  GetManagementAnalyticsRabbitMQQueuesDTO,
  GetManagementAnalyticsTotalsDTO,
  GetManagementAnalyticsTotalsParams,
  GetManagementAnalyticsUsersCountDTO
} from './Analytics.types';

export const AnalyticsApi = {
  getManagementAnalyticsTotals: async (params: GetManagementAnalyticsTotalsParams): Promise<GetManagementAnalyticsTotalsDTO> => {
    const response = await BaseAxiosService.get('/management/analytics/totals', { params });
    return response.data;
  },

  getManagementAnalyticsCustomersCount: async (
    params: GetManagementAnalyticsTotalsParams
  ): Promise<GetManagementAnalyticsCustomersCountDTO> => {
    const response = await BaseAxiosService.get('/management/analytics/customers/count', { params });
    return response.data;
  },

  getManagementAnalyticsUsersCount: async (
    params: GetManagementAnalyticsTotalsParams
  ): Promise<GetManagementAnalyticsUsersCountDTO> => {
    const response = await BaseAxiosService.get('/management/analytics/users/count', { params });
    return response.data;
  },

  getManagementAnalyticsMachinesCount: async (
    params: GetManagementAnalyticsTotalsParams
  ): Promise<GetManagementAnalyticsMachinesCountDTO> => {
    const response = await BaseAxiosService.get('/management/analytics/machines/count', { params });
    return response.data;
  },

  getManagementAnalyticsCustomersDetailed: async (
    params: GetManagementAnalyticsTotalsParams
  ): Promise<GetManagementAnalyticsCustomersDetailedDTO> => {
    const response = await BaseAxiosService.get('/management/analytics/customers/detailed', { params });
    return response.data;
  },

  getManagementAnalyticsMessageCredit: async (
    params: GetManagementAnalyticsTotalsParams
  ): Promise<GetManagementAnalyticsMessageCreditDTO> => {
    const response = await BaseAxiosService.get('/management/analytics/message-credit', { params });
    return response.data;
  },

  getManagementAnalyticsPassesCount: async (
    params: GetManagementAnalyticsPassesCountParams
  ): Promise<GetManagementAnalyticsPassesCountDTO> => {
    const response = await BaseAxiosService.get('/management/analytics/passes/count', { params });
    return response.data;
  },

  getManagementAnalyticsPassesStatistics: async (
    params: GetManagementAnalyticsPassesStatisticsParams
  ): Promise<GetManagementAnalyticsPassesStatisticsDTO> => {
    const response = await BaseAxiosService.get('/management/analytics/passes/statistics', { params });
    return response.data;
  },

  getManagementAnalyticsMicroservicesHealth: async (
    params: GetManagementAnalyticsTotalsParams
  ): Promise<GetManagementAnalyticsMicroservicesHealthDTO> => {
    const response = await BaseAxiosService.get('/management/analytics/microservices/health', { params });
    return response.data;
  },

  getManagementAnalyticsPackagesExpiring: async (
    params: GetManagementAnalyticsPackagesExpiringParams
  ): Promise<GetManagementAnalyticsPackagesExpiringDTO> => {
    const response = await BaseAxiosService.get('/management/analytics/packages/expiring', { params });
    return response.data;
  },

  getManagementAnalyticsRabbitMQQueues: async (
    params: GetManagementAnalyticsTotalsParams
  ): Promise<GetManagementAnalyticsRabbitMQQueuesDTO> => {
    const response = await BaseAxiosService.get('/management/analytics/rabbitmq/queues', { params });
    return response.data;
  },

  getManagementAnalyticsAdminLogs: async (
    params: GetManagementAnalyticsAdminLogsParams
  ): Promise<GetManagementAnalyticsAdminLogsDTO> => {
    const response = await BaseAxiosService.get('/management/analytics/admin-logs', { params });
    return response.data;
  },

  getManagementAnalyticsCustomersDatabaseSizes: async (
    params: GetManagementAnalyticsTotalsParams
  ): Promise<GetManagementAnalyticsCustomersDatabaseSizesDTO> => {
    const response = await BaseAxiosService.get('/management/analytics/customers/database-sizes', { params });
    return response.data;
  },

  getManagementAnalyticsDatabaseSizeSummary: async (
    params: GetManagementAnalyticsTotalsParams
  ): Promise<GetManagementAnalyticsDatabaseSizeSummaryDTO> => {
    const response = await BaseAxiosService.get('/management/analytics/database-size-summary', { params });
    return response.data;
  },

  // management/analytics/database-block-analysis

  getManagementAnalyticsDatabaseBlockAnalysis: async (
    params: GetManagementAnalyticsTotalsParams
  ): Promise<GetManagementAnalyticsDatabaseBlockAnalysisDTO> => {
    const response = await BaseAxiosService.get('/management/analytics/database-block-analysis', { params });
    return response.data;
  },

  // management/analytics/database-block-summary
  getManagementAnalyticsDatabaseBlockSummary: async (
    params: GetManagementAnalyticsTotalsParams
  ): Promise<GetManagementAnalyticsDatabaseBlockSummaryDTO> => {
    const response = await BaseAxiosService.get('/management/analytics/database-block-summary', { params });
    return response.data;
  }
};
