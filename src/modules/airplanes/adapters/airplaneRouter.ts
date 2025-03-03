import { Router } from "express";
import { AirplaneController } from "./airplaneController";

export default class AirplaneRouter {
  constructor(private readonly airplaneController: AirplaneController) { }

  public getRoutes(): Router {
    const router = Router();
    router
      .route("/airplanes")
      .get(this.airplaneController.findAll)
      .post(this.airplaneController.create);

    router
      .route("/airplanes/:id")
      .get(this.airplaneController.findById)
      .put(this.airplaneController.update)
      .delete(this.airplaneController.delete);

    return router;
  }
}
