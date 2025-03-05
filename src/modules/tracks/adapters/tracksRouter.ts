import { Router } from "express";
import { TrackController } from "./trackController";
import { AuthMiddleware } from "../../auth/adapters/authMiddelware";
import { UserRole } from "../../users/models/userRol.model";

export default class TrackRouter {
  constructor(
    private readonly trackController: TrackController,
    private readonly authMiddleware: AuthMiddleware
  ) { }

  public getRoutes(): Router {
    const router = Router();

    router
      .route("/tracks")
      .get(
        this.authMiddleware.authorizeRole([UserRole.ADMIN, UserRole.PILOT]),
        this.trackController.findAll
      )
      .post(this.authMiddleware.authorizeRole([UserRole.ADMIN]), this.trackController.create);

    router
      .route("/tracks/:id")
      .get(
        this.authMiddleware.authorizeRole([UserRole.ADMIN, UserRole.PILOT]),
        this.trackController.findById
      )
      .put(this.authMiddleware.authorizeRole([UserRole.ADMIN]), this.trackController.update)
      .delete(this.authMiddleware.authorizeRole([UserRole.ADMIN]), this.trackController.delete);

    return router;
  }
}
