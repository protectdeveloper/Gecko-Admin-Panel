export type PostSystemAdminLoginParams = {
  username: string;
  password: string;
};

export type PostSystemAdminLoginDTO = {
  data: {
    success: boolean;
    message: string;
    expirationTime: string;
  };
  headers: {
    'x-adminpretoken': string;
  };
};

export type PostSystemAdminValidateParams = {
  verificationCode: string;
};

export type PostSystemAdminValidateResponse = {
  data: {
    success: boolean;
    message: string;
    expirationTime: string;
  };
  headers?: {
    'x-admintoken': string;
  };
};

export type GetMeSystemAdminDetailDTO = {
  success: boolean;
  message: string;
  data: {
    authUserID: string;
    customerID: string;
    firstName: string;
    lastName: string;
    fullName: string;
    roleID: string;
    isSuperUser: boolean;
    canAddAuthUser: boolean;
    modules: {
      moduleID: string;
      moduleViewName: string;
      moduleName: string;
      canView: boolean;
      canEdit: boolean;
      canReport: boolean;
    }[];
    originalImage: string;
    thumbnailImage: string;
    defaultUserImage: string;
    defaultUserThumbnailImage: string;
    defaultAuthUserImage: string;
    defaultAuthUserThumbnailImage: string;
    mainAccount: {
      authUserID: string;
      roleName: string;
      twoLevelRole: string;
      token: string;
      isMainAccount: boolean;
    };
    subAuthUsers: {
      authUserID: string;
      twoLevelRole: string;
      roleName: string;
      token: string;
    }[];
  };
  error: string;
  statusCode: number;
  count: number;
  totalCount: number;
  pageNumber: number;
  pageSize: number;
};
