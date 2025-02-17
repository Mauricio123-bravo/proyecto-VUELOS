import express, { Application } from "express";
import { AppDataSource } from "../data/pg";
import { PORT } from "./vars";

export class App {
  public static async init() {
    const app: Application = express();

    app.listen(PORT, () => {
      AppDataSource.initialize()
        .then(() => {
          console.log("Started Connection");
        })
        .catch((reason) => {
          console.log(reason);
        });
    });
  }
}
