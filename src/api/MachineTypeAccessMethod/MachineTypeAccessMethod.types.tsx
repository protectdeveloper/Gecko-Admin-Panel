export type GetManagementMachineTypeAccessMethodsParams = {
  pageNumber: number;
  pageSize: number;
  machineTypeId?: string;
  accessMethodId?: string;
  isActive?: boolean;
};

export type GetManagementMachineTypeAccessMethodsDTO = {
  success: boolean;
  message: string;
  data: {
    machineTypeAccessMethodID: string;
    machineTypeID: string;
    accessMethodID: string;
    isActive: boolean;
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

export type PostCreateManagementMachineTypeAccessMethodParams = {
  machineTypeID: string;
  accessMethodID: string;
  isActive: boolean;
};

export type GetManagementMachineTypeAccessMethodByIdDTO = {
  success: boolean;
  message: string;
  data: {
    machineTypeAccessMethodID: string;
    machineTypeID: string;
    accessMethodID: string;
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

export type PutManagementMachineTypeAccessMethodByIdParams = {
  machineTypeAccessMethodID: string;
  machineTypeID: string;
  accessMethodID: string;
  isActive: boolean;
};
