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

  export const { ACCESS_EXPIRATION_TIME, REFRESH_EXPIRATION_TIME }={
    ACCESS_EXPIRATION_TIME: 60 * 60,
    REFRESH_EXPIRATION_TIME: 60 * 60 * 24 * 5
  };
