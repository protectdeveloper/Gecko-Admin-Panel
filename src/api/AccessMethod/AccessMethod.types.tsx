export type GetManagementAccessMethodParams = {
  pageNumber: number;
  pageSize: number;
  searchTerm?: string;
  isActive?: boolean;
};

export type GetManagementAccessMethodDTO = {
  success: boolean;
  message: string;
  data: {
    accessMethodID: string;
    methodName: string;
    systemName: string;
    description: string;
    isActive: boolean;
    identifierCode: string;
    icon: string | null;
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

export type GetManagementAccessMethodByIdDTO = {
  success: boolean;
  message: string;
  data: {
    accessMethodID: string;
    methodName: string;
    systemName: string;
    description: string;
    isActive: boolean;
    identifierCode: string;
    icon: string | null;
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

export type PostCreateManagementAccessMethodParams = {
  methodName: string;
  systemName: string;
  description: string;
  isActive: boolean;
  identifierCode: string;
  icon: string;
};

export type PutManagementAccessMethodByIdParams = {
  accessMethodID: string;
  methodName: string;
  systemName: string;
  description: string;
  isActive: boolean;
  identifierCode: string;
  icon: string;
};
