export const NODE_ENV = process.env.NODE_ENV || "development";

export const PORT = process.env.PORT || 5000;

export const DB_URL = process.env.DB_URL || "";

export const DB_HOST =
  process.env.TEST_ENV !== "local" ? process.env.DB_HOST : "localhost";

export const DB_USER = process.env.DB_USER || "";

export const DB_PASSWORD = process.env.DB_PASSWORD || "";

export const DB_SCHEMA = process.env.DB_SCHEMA || "";

export const JWT_SECRET = process.env.JWT_SECRET || "dadggfssd";

export const EXPO_ACCESS_TOKEN = process.env.EXPO_ACCESS_TOKEN as string;
