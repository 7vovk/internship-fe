function getEnv(key: string): string {
  const value = process.env[key];
  if (value === undefined || value === "") {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

function getEnvOptional(key: string): string | undefined {
  return process.env[key] || undefined;
}

export const env = {
  HOST: getEnvOptional("HOST") ?? "localhost",
  PORT: getEnvOptional("PORT") ?? "3000",
  NEXT_PUBLIC_APP_URL:
    getEnvOptional("NEXT_PUBLIC_APP_URL") ?? "http://localhost:3000",
  NEXT_PUBLIC_API_URL: getEnvOptional("NEXT_PUBLIC_API_URL") ?? "",
  SECRET_KEY: getEnvOptional("SECRET_KEY") ?? "",
} as const;
