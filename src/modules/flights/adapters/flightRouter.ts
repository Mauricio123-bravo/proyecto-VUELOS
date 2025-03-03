import { Router } from "express";
import { FlightController } from "./flightController";

export default class FlightRouter {
  constructor(private readonly flightController: FlightController) {}

  public getRoutes(): Router {
    const router = Router();

    router
      .route("")
      .get(this.flightController.findAll)
      .post(this.flightController.create);

    router
      .route(":id")
      .get(this.flightController.findById)
      .put(this.flightController.update)
      .delete(this.flightController.delete);

    return router;
  }
}
