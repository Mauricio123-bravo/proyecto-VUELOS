import express, { Application } from "express";
import { AppDataSource } from "../data/pg";
import { PORT } from "./vars";

export class App {
  public static async init() {
    const app: Application = express();

    await AppDataSource.initialize();
    console.log("PgAdmin driver was successfully connected");

    app.listen(PORT, () => {
      console.log("Server Started");
    });
  }
}
