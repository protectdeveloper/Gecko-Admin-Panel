export type GetManagementPublicHolidayParams = {
  pageNumber: number;
  pageSize: number;
  searchTerm?: string;
  year?: number;
  startDate?: string;
  endDate?: string;
};

export type GetManagementPublicHolidayDTO = {
  success: boolean;
  message: string;
  data: {
    holidayID: string;
    holidayName: string;
    startTime: string;
    endTime: string;
  }[];
  error: string;
  statusCode: number;
  count: number;
  totalCount: number;
  pageNumber: number;
  pageSize: number;
};

export type GetManagementPublicHolidayByIdDTO = {
  success: boolean;
  message: string;
  data: {
    holidayID: string;
    holidayName: string;
    startTime: string;
    endTime: string;
  };
  error: string;
  statusCode: number;
  count: number;
  totalCount: number;
  pageNumber: number;
  pageSize: number;
};

export type PostCreateManagementPublicHolidayParams = {
  holidayName: string;
  startTime: string;
  endTime: string;
};

export type PutManagementPublicHolidayByIdParams = {
  holidayID: string;
  holidayName: string;
  startTime: string;
  endTime: string;
};

export type GetManagementPublicHolidayByYearDTO = {
  success: boolean;
  message: string;
  data: {
    holidayID: string;
    holidayName: string;
    startTime: string;
    endTime: string;
  }[];
  error: string;
  statusCode: number;
  count: number;
  totalCount: number;
  pageNumber: number;
  pageSize: number;
};
