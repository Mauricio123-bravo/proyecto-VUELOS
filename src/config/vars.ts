import "dotenv/config";

export const {
  DB_NAME = "",
  DB_PORT = 3306,
  DB_HOST = "localhost",
  SECRET = "",
  DB_PASSWORD = "",
  NODE_ENV = "dev",
} = process.env;
