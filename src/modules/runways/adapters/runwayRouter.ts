import { Router } from "express";
import { AuthMiddleware } from "../../auth/adapters/authMiddelware";
import { UserRole } from "../../users/models/userRol.model";
import { RunwayController } from "./runwayController";

export default class RunwayRouter {
  constructor(
    private readonly runwayController: RunwayController,
    private readonly authMiddleware: AuthMiddleware
  ) { }

  public getRoutes(): Router {
    const router = Router();

    router
      .route("/runways")
      .get(
        this.authMiddleware.authorizeRole([UserRole.ADMIN, UserRole.PILOT]),
        this.runwayController.findAll
      )
      .post(this.authMiddleware.authorizeRole([UserRole.ADMIN]), this.runwayController.create);

    router
      .route("/runways/:id")
      .get(
        this.authMiddleware.authorizeRole([UserRole.ADMIN, UserRole.PILOT]),
        this.runwayController.findById
      )
      .put(this.authMiddleware.authorizeRole([UserRole.ADMIN]), this.runwayController.update)
      .delete(this.authMiddleware.authorizeRole([UserRole.ADMIN]), this.runwayController.delete);

    return router;
  }
}
