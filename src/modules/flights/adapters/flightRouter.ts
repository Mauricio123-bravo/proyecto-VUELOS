import { Router } from "express";
import { FlightController } from "./flightController";

export default class FlightRouter {
  constructor(private readonly flightController: FlightController) {}

  public getRoutes(): Router {
    const router = Router();

    router
    .route("")
    .get(this.flightController.findAll);

    return router;
  }
}
