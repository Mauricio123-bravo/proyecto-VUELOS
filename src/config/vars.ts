import "dotenv/config";

export const {
  DB_NAME = "dbvuelos",
  DB_PORT = 5432,
  DB_HOST = "localhost",
  DB_USER = "postgres",
  SECRET = "",
  DB_PASSWORD = "0000",
  NODE_ENV = "dev",
  PORT = "3000"
} = process.env;
