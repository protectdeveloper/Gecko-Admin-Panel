export type GenericResponse = {
  success: boolean;
  message: string;
  data: any;
  error: string;
  statusCode: number;
  count: number | null;
  totalCount: number | null;
  pageNumber: number | null;
  pageSize: number | null;
};
