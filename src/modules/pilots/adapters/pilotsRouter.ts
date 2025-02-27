import { Router } from "express";
import { PilotController } from "./pilotController";

export default class PilotRouter {
  constructor(private readonly pilotController: PilotController) {}

  public getRoutes(): Router {
    const router = Router();
    router
    .route("/pilots")
    .get(this.pilotController.findAll)
    .post(this.pilotController.create);

    router
    .route("/pilots/:id")
    .get(this.pilotController.findById)
    .put(this.pilotController.update)
    .delete(this.pilotController.delete)

    return router;
  }
}
