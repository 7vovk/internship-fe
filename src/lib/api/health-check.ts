import { api, ApiError } from "./client";
import { HealthStatus } from "../interfaces";

export async function checkHealth(): Promise<HealthStatus> {
  try {
    return await api.get<HealthStatus>("/", { next: { revalidate: 6 } });
  } catch (error) {
    const apiError = error as ApiError;
    return {
      status: apiError.status === 408 ? "degraded" : "down",
      timestamp: new Date().toISOString(),
    };
  }
}
