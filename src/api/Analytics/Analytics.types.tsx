export type GetManagementAnalyticsTotalsParams = {
  forceRefresh?: boolean;
};

export type GetManagementAnalyticsTotalsDTO = {
  success: boolean;
  message: string;
  data: {
    totalCustomers: number;
    totalUsers: number;
    totalMachines: number;
    lastUpdated: string;
    fromCache: boolean;
  };
  error: string;
  statusCode: number;
  count: number;
  totalCount: number;
  pageNumber: number;
  pageSize: number;
};

export type GetManagementAnalyticsCustomersCountDTO = {
  success: boolean;
  message: string;
  data: {
    totalCustomers: number;
    lastUpdated: string;
    fromCache: boolean;
  };
  error: string;
  statusCode: number;
  count: number;
  totalCount: number;
  pageNumber: number;
  pageSize: number;
};

export type GetManagementAnalyticsUsersCountDTO = {
  success: boolean;
  message: string;
  data: {
    totalUsers: number;
    processedCustomers: number;
    lastUpdated: string;
    fromCache: boolean;
  };
  error: string;
  statusCode: number;
  count: number;
  totalCount: number;
  pageNumber: number;
  pageSize: number;
};

export type GetManagementAnalyticsMachinesCountDTO = {
  success: boolean;
  message: string;
  data: {
    totalMachines: number;
    lastUpdated: string;
    fromCache: boolean;
  };
  error: string;
  statusCode: number;
  count: number;
  totalCount: number;
  pageNumber: number;
  pageSize: number;
};

export type GetManagementAnalyticsCustomersDetailedDTO = {
  success: boolean;
  message: string;
  data: {
    customerStats: {
      customerID: string;
      customerName: string;
      userCount: number;
      machineCount: number;
      isActive: boolean;
      createdAt: string;
    }[];
    totalCustomers: number;
    lastUpdated: string;
    fromCache: boolean;
  };
  error: string;
  statusCode: number;
  count: number;
  totalCount: number;
  pageNumber: number;
  pageSize: number;
};

export type GetManagementAnalyticsMessageCreditDTO = {
  success: boolean;
  message: string;
  data: {
    creditAmount: number;
    lastUpdated: string;
    fromCache: boolean;
  } | null;
  error: string;
  statusCode: number;
  count: number;
  totalCount: number;
  pageNumber: number;
  pageSize: number;
};

export type GetManagementAnalyticsPassesCountParams = {
  startDate: string;
  endDate: string;
  forceRefresh?: boolean;
};

export type GetManagementAnalyticsPassesCountDTO = {
  success: boolean;
  message: string;
  data: {
    totalPassCount: number;
    startDate: string | null;
    endDate: string | null;
    lastUpdated: string;
    processedCustomers: number;
    fromCache: boolean;
  };
  error: string;
  statusCode: number;
  count: number;
  totalCount: number;
  pageNumber: number;
  pageSize: number;
};

export type GetManagementAnalyticsPassesStatisticsParams = {
  startDate: string;
  endDate: string;
  groupBy: 'daily' | 'weekly' | 'monthly';
  forceRefresh?: boolean;
};

export type GetManagementAnalyticsPassesStatisticsDTO = {
  success: boolean;
  message: string;
  data: {
    statistics: {
      period: string;
      periodLabel: string;
      passCount: number;
      periodStart: string;
      periodEnd: string;
    }[];
    totalPassCount: number;
    startDate: string;
    endDate: string;
    groupBy: string;
    lastUpdated: string;
    processedCustomers: number;
    fromCache: boolean;
  };
  error: string;
  statusCode: number;
  count: number;
  totalCount: number;
  pageNumber: number;
  pageSize: number;
};

export type GetManagementAnalyticsMicroservicesHealthDTO = {
  success: boolean;
  message: string;
  data: {
    services: {
      serviceName: string;
      serviceUrl: string;
      isHealthy: boolean;
      responseTimeMs: number;
      status: string;
      errorMessage: string;
      checkedAt: string;
    }[];
    totalServices: number;
    healthyServices: number;
    unhealthyServices: number;
    lastUpdated: string;
    fromCache: boolean;
  };
  error: string;
  statusCode: number;
  count: number;
  totalCount: number;
  pageNumber: number;
  pageSize: number;
};

export type GetManagementAnalyticsPackagesExpiringParams = {
  limit: number;
  daysAhead: number;
  forceRefresh?: boolean;
};

export type GetManagementAnalyticsPackagesExpiringDTO = {
  success: boolean;
  message: string;
  data: {
    expiringPackages: {
      customerID: string;
      customerName: string;
      customerCode: string;
      packageID: string;
      packageName: string;
      packageDescription: string;
      packagePrice: number;
      startDate: string;
      endDate: string;
      daysUntilExpiry: number;
      isActive: boolean;
      createdAt: string;
    }[];
    totalCount: number;
    daysAhead: number;
    lastUpdated: string;
    fromCache: boolean;
  };
  error: string;
  statusCode: number;
  count: number;
  totalCount: number;
  pageNumber: number;
  pageSize: number;
};

export type GetManagementAnalyticsRabbitMQQueuesDTO = {
  success: boolean;
  message: string;
  data: {
    queues: {
      name: string;
      vhost: string;
      durable: boolean;
      autoDelete: boolean;
      arguments: string;
      messages: number;
      messagesReady: number;
      messagesUnacknowledged: number;
      consumers: number;
      consumerUtilisation: number;
      messageStatsPublish: number;
      messageStatsDeliver: number;
      messageStatsAck: number;
      messageStatsRedeliver: number;
      isActive: boolean;
      lastUpdated: string;
    }[];
    totalQueues: number;
    activeQueues: number;
    inactiveQueues: number;
    lastUpdated: string;
    fromCache: boolean;
  };
  error: string;
  statusCode: number;
  count: number;
  totalCount: number;
  pageNumber: number;
  pageSize: number;
};

export type GetManagementAnalyticsAdminLogsParams = {
  pageNumber: number;
  pageSize: number;
  searchTerm?: string;
  requestMethod?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
};

export type GetManagementAnalyticsAdminLogsDTO = {
  success: boolean;
  message: string;
  data: {
    logID: string;
    adminID: string;
    adminName: string;
    actionType: string;
    controller: string;
    action: string;
    requestMethod: string;
    ipAddress: string;
    isAuthorized: boolean;
    executionTime: number;
    statusCode: number;
    errorMessage: string | null;
    createdAt: string;
  }[];
  error: string;
  statusCode: number;
  count: number;
  totalCount: number;
  pageNumber: number;
  pageSize: number;
};

export type GetManagementAnalyticsCustomersDatabaseSizesDTO = {
  success: true;
  message: string;
  data: {
    customerId: string;
    customerName: string;
    databaseName: string;
    serverName: string;
    databaseSizeGB: number;
    dataSizeGB: number;
    logSizeGB: number;
    lastUpdated: string;
    isConnected: boolean;
    connectionError: string | null;
  }[];
  error: string;
  statusCode: number;
  count: number;
  totalCount: number;
  pageNumber: number;
  pageSize: number;
};

export type GetManagementAnalyticsDatabaseSizeSummaryDTO = {
  success: boolean;
  message: string;
  data: {
    totalDatabaseSizeGB: number;
    totalDataSizeGB: number;
    totalLogSizeGB: number;
    totalCustomers: number;
    connectedCustomers: number;
    disconnectedCustomers: number;
    averageDatabaseSizeGB: number;
    averageDataSizeGB: number;
    averageLogSizeGB: number;
    lastUpdated: string;
  };
  error: string;
  statusCode: number;
  count: number;
  totalCount: number;
  pageNumber: number;
  pageSize: number;
};

export type GetManagementAnalyticsDatabaseBlockAnalysisDTO = {
  success: boolean;
  message: string;
  data: {
    customerId: string;
    customerName: string;
    databaseName: string;
    serverName: string;
    isConnected: boolean;
    connectionError: string | null;
    blockedSessions: {
      sessionId: number;
      status: string;
      command: string;
      waitType: string;
      blockingSessionId: number;
      sqlText: string;
      waitTime: number;
      lastWaitType: string;
      cpuTime: number;
      totalElapsedTime: number;
    }[];
    totalBlockedSessions: number;
    lastUpdated: string;
  }[];
  error: string;
  statusCode: number;
  count: number;
  totalCount: number;
  pageNumber: number;
  pageSize: number;
};

export type GetManagementAnalyticsDatabaseBlockSummaryDTO = {
  success: boolean;
  message: string;
  data: {
    totalCustomers: number;
    connectedCustomers: number;
    disconnectedCustomers: number;
    customersWithBlocks: number;
    totalBlockedSessions: number;
    mostCommonWaitType: string;
    averageBlockedSessionsPerCustomer: number;
    lastUpdated: string;
  };
  error: string;
  statusCode: number;
  count: number;
  totalCount: number;
  pageNumber: number;
  pageSize: number;
};
