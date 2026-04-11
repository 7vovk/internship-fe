import { ApiResult } from "./api.interface";

export interface HealthCheckResult {
  detail: string;
  result: string;
}

export type HealthStatus = Partial<
  ApiResult<HealthCheckResult> & {
    status: "ok" | "degraded" | "down";
  }
>;
