export type GetManagementCustomersParams = {
  pageNumber: number;
  pageSize: number;
  searchTerm?: string;
  isActive?: boolean;
};

export type GetManagementCustomersDTO = {
  success: boolean;
  message: string;
  data: {
    customerID: string;
    customerName: string;
    logo: string | null;
    isActive: boolean;
    customerCode: string;
    rowGuid: string;
    createdAt: string;
    updatedAt: string;
  }[];
  error: string | null;
  statusCode: number;
  count: number;
  totalCount: number;
  pageNumber: number;
  pageSize: number;
};

export type PostCreateManagementCustomerParams = {
  customerName: string;
  logo: string;
  isActive: boolean;
  customerCode: string;
};

export type GetManagementCustomerByIdDTO = {
  success: boolean;
  message: string;
  data: {
    customerID: string;
    customerName: string;
    logo: string;
    isActive: boolean;
    customerCode: string;
    rowGuid: string;
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

export type PutManagementCustomerByIdParams = {
  customerID: string;
  customerName: string;
  logo: string;
  isActive: boolean;
  customerCode: string;
};
