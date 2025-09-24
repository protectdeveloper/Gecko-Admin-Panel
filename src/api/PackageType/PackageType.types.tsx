export type GetManagementPackageTypeParams = {
  pageNumber: number;
  pageSize: number;
  searchTerm?: string;
  categoryName?: string;
  isActive?: boolean;
};

export type GetManagementPackageTypeDTO = {
  success: boolean;
  message: string;
  data: {
    packageTypeID: string;
    typeName: string;
    systemName: string;
    description: string;
    categoryName: string;
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

export type GetManagementPackageTypeByIdDTO = {
  success: boolean;
  message: string;
  data: {
    packageTypeID: string;
    typeName: string;
    systemName: string;
    description: string;
    categoryName: string;
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

export type PostCreateManagementPackageTypeParams = {
  typeName: string;
  systemName: string;
  description: string;
  categoryName: string;
  isActive: boolean;
};

export type PutManagementPackageTypeByIdParams = {
  packageTypeID: string;
  typeName: string;
  systemName: string;
  description: string;
  categoryName: string;
  isActive: boolean;
};
