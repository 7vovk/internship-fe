export interface HealthCheckResult {
  detail: string;
  result: string;
}

export type HealthStatus = Partial<{
  message: string;
  method: string;
  path: string;
  result: HealthCheckResult;
  statusCode: number;
  timestamp: string;
  status: "ok" | "degraded" | "down";
}>;
