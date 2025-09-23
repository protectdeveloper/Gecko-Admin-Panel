export type GetManagementCustomerMachineParams = {
  pageNumber: number;
  pageSize: number;
  searchTerm?: string;
  customerId?: string;
  machineName?: string;
  assemblyName?: string;
  isActive?: boolean;
  isOnline?: boolean;
  isTasEnabled?: boolean;
};

export type GetManagementCustomerMachineDTO = {
  success: boolean;
  message: string;
  data: {
    customerMachineID: string;
    customerID: string;
    machineID: string;
    machineName: string;
    description: string | null;
    assemblyName: string;
    isActive: boolean;
    isOnline: boolean;
    latitude: number;
    longitude: number;
    tolerance: number;
    passiveCode: string | null;
    isTasEnabled: boolean;
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

export type PostCreateManagementCustomerMachineParams = {
  customerID: string;
  machineID: string;
  machineName: string;
  description: string;
  assemblyName: string;
  isActive: boolean;
  isOnline: boolean;
  latitude: number;
  longitude: number;
  tolerance: number;
  isTasEnabled: boolean;
};

export type GetManagementCustomerMachineByIdDTO = {
  success: boolean;
  message: string;
  data: {
    customerMachineID: string;
    customerID: string;
    machineID: string;
    machineName: string;
    description: string | null;
    assemblyName: string;
    isActive: boolean;
    isOnline: boolean;
    latitude: number;
    longitude: number;
    tolerance: number;
    passiveCode: string | null;
    isTasEnabled: boolean;
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

export type PutManagementCustomerMachineByIdParams = {
  customerMachineID: string;
  customerID: string;
  machineID: string;
  machineName: string;
  description: string;
  assemblyName: string;
  isActive: boolean;
  isOnline: boolean;
  latitude: number;
  longitude: number;
  tolerance: number;
  isTasEnabled: boolean;
};

export type GetManagementCustomerMachineByCustomerIdParams = {
  customerId: string;
  machineName?: string;
  assemblyName?: string;
  isActive?: boolean;
  isOnline?: boolean;
  isTasEnabled?: boolean;
};

export type GetManagementCustomerMachineByCustomerIdDTO = {
  success: boolean;
  message: string;
  data: {
    customerMachineID: string;
    customerID: string;
    machineID: string;
    machineName: string;
    description: string | null;
    assemblyName: string;
    isActive: boolean;
    isOnline: boolean;
    latitude: number;
    longitude: number;
    tolerance: number;
    passiveCode: string | null;
    isTasEnabled: boolean;
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
