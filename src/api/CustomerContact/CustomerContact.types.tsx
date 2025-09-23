export type GetManagementCustomerContactParams = {
  customerId: string;
  pageNumber: number;
  pageSize: number;
  searchTerm?: string;
  contactKey?: string;
};

export type GetManagementCustomerContactDTO = {
  success: boolean;
  message: string;
  data: {}[];
  error: string | null;
  statusCode: number;
  count: number;
  totalCount: number;
  pageNumber: number;
  pageSize: number;
};

export type PostCreateManagementCustomerContactParams = {
  customerID: string;
  contactKey: string;
  contactValue: string;
};

export type GetManagementCustomerContactByIdDTO = {
  success: boolean;
  message: string;
  data: {};
  error: string;
  statusCode: number;
  count: number;
  totalCount: number;
  pageNumber: number;
  pageSize: number;
};

export type PutManagementCustomerContactByIdParams = {
  contactID: string;
  customerID: string;
  contactKey: string;
  contactValue: string;
};

export type GetManagementCustomerContactByCustomerIdParams = {
  customerId: string;
  contactKey?: string;
};

export type GetManagementCustomerContactByCustomerIdDTO = {};
