// Environment variables loaded via dotenv.

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
  // Server host (e.g. localhost)
  HOST: getEnvOptional("HOST") ?? "localhost",
  // Server port (e.g. 3000)
  PORT: getEnvOptional("PORT") ?? "3000",
  // Public app URL (for links, redirects). Use NEXT_PUBLIC_ for client exposure.
  NEXT_PUBLIC_APP_URL:
    getEnvOptional("NEXT_PUBLIC_APP_URL") ?? "http://localhost:3000",
  // Optional API base URL for backend
  NEXT_PUBLIC_API_URL: getEnvOptional("NEXT_PUBLIC_API_URL") ?? "",
  // Optional secret key (server-side only)
  SECRET_KEY: getEnvOptional("SECRET_KEY") ?? "",
} as const;
