export interface ApiResult<T = []> {
  message: string;
  method: string;
  path: string;
  result: T;
  statusCode: number;
  timestamp: string;
}
