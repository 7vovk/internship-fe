import { api, ApiError } from "./client";

interface HealthStatus {
  status: "ok" | "degraded" | "down";
  timestamp: string;
  version?: string;
}

export async function checkHealth(): Promise<HealthStatus> {
  try {
    return await api.get<HealthStatus>("/", { next: { revalidate: 60 } });
  } catch (error) {
    const apiError = error as ApiError;
    // 408 = timeout, anything else = service down
    return {
      status: apiError.status === 408 ? "degraded" : "down",
      timestamp: new Date().toISOString(),
    };
  }
}
