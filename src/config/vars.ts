import "dotenv/config";

export const {
  DB_NAME = "",
  DB_PORT = 5432,
  DB_HOST = "",
  DB_USER = "",
  SECRET = "",
  DB_PASSWORD = "",
  NODE_ENV = "dev",
  PORT = "3000",
} = process.env;
