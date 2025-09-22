import { useQuery } from '@tanstack/react-query';
import { AnalyticsApi } from './Analytics.api';
import {
  GetManagementAnalyticsAdminLogsParams,
  GetManagementAnalyticsPackagesExpiringParams,
  GetManagementAnalyticsPassesCountParams,
  GetManagementAnalyticsPassesStatisticsParams,
  GetManagementAnalyticsTotalsParams
} from './Analytics.types';

export const getManagementAnalyticsTotalsQueryOptions = (params: GetManagementAnalyticsTotalsParams) => ({
  queryKey: ['getManagementAnalyticsTotals', params],
  queryFn: () => AnalyticsApi.getManagementAnalyticsTotals(params)
});

export const useGetManagementAnalyticsTotalsQuery = (params: GetManagementAnalyticsTotalsParams) => {
  return useQuery(getManagementAnalyticsTotalsQueryOptions(params));
};

export const getManagementAnalyticsCustomersCountQueryOptions = (params: GetManagementAnalyticsTotalsParams) => ({
  queryKey: ['getManagementAnalyticsCustomersCount', params],
  queryFn: () => AnalyticsApi.getManagementAnalyticsCustomersCount(params)
});

export const useGetManagementAnalyticsCustomersCountQuery = (params: GetManagementAnalyticsTotalsParams) => {
  return useQuery(getManagementAnalyticsCustomersCountQueryOptions(params));
};

export const getManagementAnalyticsUsersCountQueryOptions = (params: GetManagementAnalyticsTotalsParams) => ({
  queryKey: ['getManagementAnalyticsUsersCount', params],
  queryFn: () => AnalyticsApi.getManagementAnalyticsUsersCount(params)
});

export const useGetManagementAnalyticsUsersCountQuery = (params: GetManagementAnalyticsTotalsParams) => {
  return useQuery(getManagementAnalyticsUsersCountQueryOptions(params));
};

export const getManagementAnalyticsMachinesCountQueryOptions = (params: GetManagementAnalyticsTotalsParams) => ({
  queryKey: ['getManagementAnalyticsMachinesCount', params],
  queryFn: () => AnalyticsApi.getManagementAnalyticsMachinesCount(params)
});

export const useGetManagementAnalyticsMachinesCountQuery = (params: GetManagementAnalyticsTotalsParams) => {
  return useQuery(getManagementAnalyticsMachinesCountQueryOptions(params));
};

export const getManagementAnalyticsCustomersDetailedQueryOptions = (params: GetManagementAnalyticsTotalsParams) => ({
  queryKey: ['getManagementAnalyticsCustomersDetailed', params],
  queryFn: () => AnalyticsApi.getManagementAnalyticsCustomersDetailed(params)
});

export const useGetManagementAnalyticsCustomersDetailedQuery = (params: GetManagementAnalyticsTotalsParams) => {
  return useQuery(getManagementAnalyticsCustomersDetailedQueryOptions(params));
};

export const getManagementAnalyticsMessageCreditQueryOptions = (params: GetManagementAnalyticsTotalsParams) => ({
  queryKey: ['getManagementAnalyticsMessageCredit', params],
  queryFn: () => AnalyticsApi.getManagementAnalyticsMessageCredit(params)
});

export const useGetManagementAnalyticsMessageCreditQuery = (params: GetManagementAnalyticsTotalsParams) => {
  return useQuery(getManagementAnalyticsMessageCreditQueryOptions(params));
};

export const getManagementAnalyticsPassesCountQueryOptions = (params: GetManagementAnalyticsPassesCountParams) => ({
  queryKey: ['getManagementAnalyticsPassesCount', params],
  queryFn: () => AnalyticsApi.getManagementAnalyticsPassesCount(params)
});

export const useGetManagementAnalyticsPassesCountQuery = (params: GetManagementAnalyticsPassesCountParams) => {
  return useQuery(getManagementAnalyticsPassesCountQueryOptions(params));
};

export const getManagementAnalyticsPassesStatisticsQueryOptions = (params: GetManagementAnalyticsPassesStatisticsParams) => ({
  queryKey: ['getManagementAnalyticsPassesStatistics', params],
  queryFn: () => AnalyticsApi.getManagementAnalyticsPassesStatistics(params)
});

export const useGetManagementAnalyticsPassesStatisticsQuery = (params: GetManagementAnalyticsPassesStatisticsParams) => {
  return useQuery(getManagementAnalyticsPassesStatisticsQueryOptions(params));
};

export const getManagementAnalyticsMicroservicesHealthQueryOptions = (params: GetManagementAnalyticsTotalsParams) => ({
  queryKey: ['getManagementAnalyticsMicroservicesHealth', params],
  queryFn: () => AnalyticsApi.getManagementAnalyticsMicroservicesHealth(params)
});

export const useGetManagementAnalyticsMicroservicesHealthQuery = (params: GetManagementAnalyticsTotalsParams) => {
  return useQuery(getManagementAnalyticsMicroservicesHealthQueryOptions(params));
};

export const getManagementAnalyticsPackagesExpiringQueryOptions = (params: GetManagementAnalyticsPackagesExpiringParams) => ({
  queryKey: ['getManagementAnalyticsPackagesExpiring', params],
  queryFn: () => AnalyticsApi.getManagementAnalyticsPackagesExpiring(params)
});

export const useGetManagementAnalyticsPackagesExpiringQuery = (params: GetManagementAnalyticsPackagesExpiringParams) => {
  return useQuery(getManagementAnalyticsPackagesExpiringQueryOptions(params));
};

export const getManagementAnalyticsRabbitMQQueuesQueryOptions = (params: GetManagementAnalyticsTotalsParams) => ({
  queryKey: ['getManagementAnalyticsRabbitMQQueues', params],
  queryFn: () => AnalyticsApi.getManagementAnalyticsRabbitMQQueues(params)
});

export const useGetManagementAnalyticsRabbitMQQueuesQuery = (params: GetManagementAnalyticsTotalsParams) => {
  return useQuery(getManagementAnalyticsRabbitMQQueuesQueryOptions(params));
};

export const getManagementAnalyticsAdminLogsQueryOptions = (params: GetManagementAnalyticsAdminLogsParams) => ({
  queryKey: ['getManagementAnalyticsAdminLogs', params],
  queryFn: () => AnalyticsApi.getManagementAnalyticsAdminLogs(params)
});

export const useGetManagementAnalyticsAdminLogsQuery = (params: GetManagementAnalyticsAdminLogsParams) => {
  return useQuery(getManagementAnalyticsAdminLogsQueryOptions(params));
};
