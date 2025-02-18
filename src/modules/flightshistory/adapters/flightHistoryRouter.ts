import { Router } from "express";
import { FlightHistoryController } from "./flightHistoryController";

export default class FlightHistoryRouter {
  constructor(private readonly flightHistoryController: FlightHistoryController) {}

  public getRoutes(): Router {
    const router = Router();
    router
    .route("/flightsHistory")
    .get(this.flightHistoryController.findAll);

    return router;
  }
}
