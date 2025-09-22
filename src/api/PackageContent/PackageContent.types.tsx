export type GetManagementPackageContentParams = {
  pageNumber: number;
  pageSize: number;
  packageId?: string;
  packageTypeId?: string;
};

export type GetManagementPackageContentDTO = {
  success: boolean;
  message: string;
  data: {
    packageContentID: string;
    packageID: string;
    packageTypeID: string;
    quantity: number;
    unitPrice: number;
    createdAt: string;
    updatedAt: string;
    packageName: string;
    packageTypeName: string;
  }[];
  error: string;
  statusCode: number;
  count: number;
  totalCount: number;
  pageNumber: number;
  pageSize: number;
};

export type GetManagementPackageContentByIdDTO = {
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

export type PostCreateManagementPackageContentParams = {
  packageID: string;
  packageTypeID: string;
  quantity: number;
  unitPrice: number;
};

export type PutManagementPackageContentByIdParams = {
  packageContentID: string;
  packageID: string;
  packageTypeID: string;
  quantity: number;
  unitPrice: number;
};
