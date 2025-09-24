export type GetManagementConnectionParams = {
  pageNumber: number;
  pageSize: number;
  searchTerm?: string;
  customerId?: string;
  connectionType?: string;
  isActive?: boolean;
};

export type GetManagementConnectionDTO = {
  success: boolean;
  message: string;
  data: {
    connectionID: string;
    customerID: string;
    connectionType: string;
    connectionString: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    customerName: string;
  }[];
  error: string;
  statusCode: number;
  count: number;
  totalCount: number;
  pageNumber: number;
  pageSize: number;
};

export type GetManagementConnectionByIdDTO = {
  success: boolean;
  message: string;
  data: {
    connectionID: string;
    customerID: string;
    connectionType: string;
    connectionString: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  };
  error: string;
  statusCode: number;
  count: number;
  totalCount: number;
  pageNumber: number;
  pageSize: number;
};

export type PostCreateManagementConnectionParams = {
  customerID: string;
  connectionType: string;
  connectionString: string;
  isActive: boolean;
};

export type PutManagementConnectionByIdParams = {
  connectionID: string;
  customerID: string;
  connectionType: string;
  connectionString: string;
  isActive: boolean;
};

export type GetManagementConnectionCustomerByIdParams = {
  customerId: string;
  connectionType?: string;
  isActive?: boolean;
};

export type GetManagementConnectionCustomerByIdDTO = {
  success: boolean;
  message: string;
  data: {
    connectionID: string;
    customerID: string;
    connectionType: string;
    connectionString: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  }[];
  error: string;
  statusCode: number;
  count: number;
  totalCount: number;
  pageNumber: number;
  pageSize: number;
};
