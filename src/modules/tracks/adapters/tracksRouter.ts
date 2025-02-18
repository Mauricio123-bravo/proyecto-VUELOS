import { Router } from "express";
import { TrackController } from "./trackController";

export default class TrackRouter {
  constructor(private readonly trackController: TrackController) {}

  public getRoutes(): Router {
    const router = Router();
    router
    .route("/tracks")
    .get(this.trackController.findAll);

    return router;
  }
}
