import { Router } from "express";
import { AirplaneController } from "./airplaneController";

export default class AirplaneRouter {
  constructor(private readonly airplaneController: AirplaneController) {}

  public getRoutes(): Router {
    const router = Router();
    router
    .route("/airplanes")
    .get(this.airplaneController.findAll);

    return router;
  }
}
