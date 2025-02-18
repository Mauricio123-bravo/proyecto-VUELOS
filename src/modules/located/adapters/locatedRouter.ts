import { Router } from "express";
import { LocatedController } from "./locatedController";

export default class LocatedRouter {
  constructor(private readonly locatedController: LocatedController) {}

  public getRoutes(): Router {
    const router = Router();
    router
    .route("/located")
    .get(this.locatedController.findAll);

    return router;
  }
}
