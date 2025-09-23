export type GetManagementMachineTypesParams = {
  pageNumber: number;
  pageSize: number;
  searchTerm?: string;
  isActive?: boolean;
};

export type GetManagementMachineTypesDTO = {
  success: boolean;
  message: string;
  data: {
    machineTypeID: string;
    typeName: string;
    systemName: string;
    description: string;
    isActive: boolean;
    originalImage: string | null;
    thumbnailImage: string | null;
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

export type PostCreateManagementMachineTypeParams = {
  typeName: string;
  systemName: string;
  description: string;
  isActive: boolean;
  originalImage: string;
  thumbnailImage: string;
};

export type GetManagementMachineTypeByIdDTO = {
  success: boolean;
  message: string;
  data: {
    machineTypeID: string;
    typeName: string;
    systemName: string;
    description: string;
    isActive: boolean;
    originalImage: string | null;
    thumbnailImage: string | null;
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

export type PutManagementMachineTypeByIdParams = {
  machineTypeID: string;
  typeName: string;
  systemName: string;
  description: string;
  isActive: boolean;
  originalImage: string;
  thumbnailImage: string;
};
