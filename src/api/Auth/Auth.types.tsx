export type PostCustomerUserLoginParams = {
  customerCode: string;
  username: string;
  password: string;
};

export type PostCustomerUserForgotPasswordParams = {
  customerCode: string;
  username: string;
};

export type PostCustomerUserForgotPasswordCheckParams = {
  customerID: string;
  authUserID: string;
  verificationCode: string;
};

export type PostCustomerUserLoginResponse = {
  data: {
    success: boolean;
    message: string;
    expirationTime: string;
  };
  headers: {
    'x-authuserpretoken': string;
  };
};

export type PostCustomerUserValidateParams = {
  verificationCode: string;
};

export type PostCustomerUserForgotPasswordConfirmParams = {
  customerID: string;
  authUserID: string;
  password: string;
  verificationCode: string;
};

export type PostCustomerUserValidateResponse = {
  data: {
    success: boolean;
    message: string;
    expirationTime: string;
  };
  headers?: {
    'x-authusertoken': string;
  };
};

export type PostCustomerUserForgotPasswordResponse = {
  data: {
    success: boolean;
    message: string;
    data: {
      customerID: string;
      customerName: string;
      authUserID: string;
      firstName: string;
      lastName: string;
    };
    error: string;
    statusCode: number;
    count: number;
    totalCount: number;
    pageNumber: number;
    pageSize: number;
  };
};

export type PostCustomerUserForgotPasswordCheckResponse = {
  data: {
    success: boolean;
    message: string;
    data: null;
    error: string;
    statusCode: number;
    count: number;
    totalCount: number;
    pageNumber: number;
    pageSize: number;
  };
};

export type PostCustomerUserForgotPasswordConfirmResponse = {
  data: {
    success: boolean;
    message: string;
    data: null;
    error: string;
    statusCode: number;
    count: number;
    totalCount: number;
    pageNumber: number;
    pageSize: number;
  };
};

export type GetMeUserDetailDTO = {
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

export type GetCustomersUserCheckReservationParams = {
  customerCode: string;
  reservationCode: string;
};

export type GetCustomersUserCheckReservationDTO = {
  success: boolean;
  message: string;
  data: {
    userID: string;
    customerID: string;
    fullName: string;
    reservationDate: string;
    customerName: string;
  };
  error: string;
  statusCode: number;
  count: number;
  totalCount: number;
  pageNumber: number;
  pageSize: number;
};

export type GetCustomersAuthUserCheckReservationDTO = {
  success: boolean;
  message: string;
  data: {
    authUserID: string;
    customerID: string;
    fullName: string;
    reservationDate: string;
    customerName: string;
  };
  error: string;
  statusCode: number;
  count: number;
  totalCount: number;
  pageNumber: number;
  pageSize: number;
};

export type PostCustomersUserCompleteReservationParams = {
  customerID: string;
  userID: string;
  password: string;
  reservationCode: string;
};

export type PostCustomersUserAuthUserCompleteReservationParams = {
  customerID: string;
  authUserID: string;
  password: string;
  reservationCode: string;
};

export type GetCustomersVisitorPreviewParams = {
  CustomerCode: string;
  ReservationCode: string;
};

export type GetCustomersVisitorPreviewDTO = {
  success: boolean;
  message: string;
  data: {
    visitorID: string;
    fullName: string;
    phone: string;
    reservationStart: string;
    reservationEnd: string;
  };
  error: string;
  statusCode: number;
  count: number;
  totalCount: number;
  pageNumber: number;
  pageSize: number;
};
