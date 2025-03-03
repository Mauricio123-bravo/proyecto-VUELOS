import { Router } from "express";
import { TrackController } from "./trackController";

export default class TrackRouter {
  constructor(private readonly trackController: TrackController) { }

  public getRoutes(): Router {
    const router = Router();
    router
      .route("/tracks")
      .get(this.trackController.findAll)
      .post(this.trackController.create);

    router
      .route("/tracks/:id")
      .get(this.trackController.findById)
      .put(this.trackController.update)
      .delete(this.trackController.delete)

    return router;
  }
}
