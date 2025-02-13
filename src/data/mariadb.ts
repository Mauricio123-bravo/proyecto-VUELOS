import { DataSource } from "typeorm";
import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
  NODE_ENV,
} from "../config/vars.ts";

export const AppDataSource = new DataSource({
  type: "mariadb",
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  entities: [`${__dirname}/../../**/models/*.entity/*.{ts,js}`],
  migrations: [`${__dirname}/migrations/*.{ts,js}`],
  synchronize: false,
  logging: NODE_ENV == "dev" ? true : false,
});
