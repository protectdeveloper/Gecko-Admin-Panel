export type GetManagementAdminLogParams = {
  pageNumber: number;
  pageSize: number;
  adminId?: string;
  adminName?: string;
  actionType?: string;
  controller?: string;
  action?: string;
  requestMethod?: string;
  isAuthorized?: boolean;
  statusCode?: number;
  startDate?: string;
  endDate?: string;
  searchTerm?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
};

export type GetManagementAdminLogDTO = {
  success: boolean;
  message: string;
  data: {
    logID: string;
    adminID: string;
    adminName: string;
    actionType: string;
    controller: string;
    action: string;
    requestUrl: string;
    requestMethod: string;
    requestData: string;
    responseData: string;
    ipAddress: string;
    userAgent: string;
    isAuthorized: boolean;
    authorizationMessage: string;
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
