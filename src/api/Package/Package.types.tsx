export type GetManagementPackageParams = {
  pageNumber?: number;
  pageSize?: number;
  searchTerm?: string;
  isActive?: boolean;
  minPrice?: number;
  maxPrice?: number;
};

export type GetManagementPackageDTO = {
  success: boolean;
  message: string;
  data: {
    packageID: string;
    packageName: string;
    description: string;
    totalPrice: number;
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

export type GetManagementPackageByIdDTO = {
  success: boolean;
  message: string;
  data: {
    packageID: string;
    packageName: string;
    description: string;
    totalPrice: number;
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

export type PostCreateManagementPackageParams = {
  packageName: string;
  description: string;
  totalPrice: number;
  isActive: boolean;
};

export type PutManagementPackageByIdParams = {
  packageID: string;
  packageName: string;
  description: string;
  totalPrice: number;
  isActive: boolean;
};
