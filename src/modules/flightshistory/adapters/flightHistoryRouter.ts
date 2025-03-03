import { Router } from "express";
import { FlightHistoryController } from "./flightHistoryController";

export default class FlightHistoryRouter {
  constructor(private readonly flightHistoryController: FlightHistoryController) {}

  public getRoutes(): Router {
    const router = Router();
    router
    .route("/flightsHistory")
    .get(this.flightHistoryController.findAll)
    .post(this.flightHistoryController.create);

    router
    .route("/flightsHistory/:id")
    .get(this.flightHistoryController.findById)
    .put(this.flightHistoryController.update)
    .delete(this.flightHistoryController.delete);

    return router;
  }
}
