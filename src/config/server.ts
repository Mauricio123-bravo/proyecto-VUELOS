import express, { Application } from "express";
import { AppDataSource } from "../data/pg";
import { PORT } from "./vars";
import { flightRouter } from "../modules/flights/dependencies";
import morgan from "morgan";

export class App {
  private static app: Application = express();

  public static async init() {
    this.middlewares();
    this.initRoutes();

    this.app.listen(PORT, () => {
      AppDataSource.initialize()
        .then(() => {
          console.log("Started Connection");
        })
        .catch((reason) => {
          console.log(reason);
        });
    });
  }

  private static middlewares() {
    this.app.use(morgan("dev"));
    this.app.use(express.json({ limit: "50mb" }));
    this.app.use(express.urlencoded({ extended: true }));
  }

  private static initRoutes() {
    this.app.use(flightRouter.getRoutes());
  }
}
