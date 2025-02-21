import express, { Application } from "express";
import { AppDataSource } from "../data/pg";
import { PORT } from "./vars";
import { flightRouter } from "../modules/flights/dependencies";
import morgan from "morgan";
import { flightHistoryRouter } from "../modules/flightshistory/dependencies";
import { locatedRouter } from "../modules/located/dependencies";
import { airplaneRouter } from "../modules/airplanes/dependencies";
import { maintenanceRouter } from "../modules/maintenances/dependencies";
import { pilotRouter } from "../modules/pilots/dependencies";
import { userRouter } from "../modules/users/dependencies";
import cors from "cors";
import { trackRouter } from "../modules/tracks/dependencies";

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

    this.app.use(cors({
      origin: 'http://localhost:5173', 
      credentials: true
    }));
  }

  private static initRoutes() {
    this.app.use(flightRouter.getRoutes());
    this.app.use(flightHistoryRouter.getRoutes());
    this.app.use(locatedRouter.getRoutes());
    this.app.use(airplaneRouter.getRoutes());
    this.app.use(maintenanceRouter.getRoutes());
    this.app.use(pilotRouter.getRoutes());
    this.app.use(userRouter.getRoutes());
    this.app.use(trackRouter.getRoutes())
  }
}
