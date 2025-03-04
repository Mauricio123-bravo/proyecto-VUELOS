import express, { Application, Router } from "express";
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
import { authMiddleware, authRouter } from "../modules/auth/dependencies";
import { AuthMiddleware } from "../modules/auth/adapters/authMiddelware";

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
    const cookieParser = require("cookie-parser");
    this.app.use(morgan("dev"));
    this.app.use(express.json({ limit: "50mb" }));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());

    this.app.use(
      cors({
        origin: "http://localhost:5173",
        credentials: true,
      }),
    );
  }

  private static initRoutes() {
    const api = Router({});

    // Private routes
    api.use(flightRouter.getRoutes());
    api.use(flightHistoryRouter.getRoutes());
    api.use(locatedRouter.getRoutes());
    api.use(airplaneRouter.getRoutes());
    api.use(maintenanceRouter.getRoutes());
    api.use(pilotRouter.getRoutes());
    api.use(userRouter.getRoutes());
    api.use(trackRouter.getRoutes());

    this.app.use("/api", authMiddleware.authenticate);
    this.app.use("/api", api);

    // Public routes
    this.app.use(authRouter.getRoutes());
  }
}
