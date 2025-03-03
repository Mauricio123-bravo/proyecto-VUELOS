import { Router } from "express";
import { LocatedController } from "./locatedController";

export default class LocatedRouter {
  constructor(private readonly locatedController: LocatedController) { }

  public getRoutes(): Router {
    const router = Router();
    router
      .route("/located")
      .get(this.locatedController.findAll)
      .post(this.locatedController.create)


    router
      .route("/located/:id")
      .get(this.locatedController.findById)
      .put(this.locatedController.update)
      .delete(this.locatedController.delete);

    return router;
  }
}
