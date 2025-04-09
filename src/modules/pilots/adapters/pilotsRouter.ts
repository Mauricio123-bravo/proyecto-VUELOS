import { Router } from "express";
import { PilotController } from "./pilotController";
import { AuthMiddleware } from "../../auth/adapters/authMiddelware";
import { UserRole } from "../../users/models/userRol.model";

export default class PilotRouter {
  constructor(
    private readonly pilotController: PilotController,
    private readonly authMiddleware: AuthMiddleware
  ) { }

  public getRoutes(): Router {
    const router = Router();

    router
      .route("/pilots")
      .get(
        this.authMiddleware.authorizeRole([UserRole.ADMIN, UserRole.PILOT]),
        this.pilotController.findAllPaginated
      )
      .post(this.authMiddleware.authorizeRole([UserRole.ADMIN]), this.pilotController.create);

    router
      .route("/pilots/all")
      .get(
        this.authMiddleware.authorizeRole([UserRole.ADMIN, UserRole.PILOT]),
        this.pilotController.findAll
      );
      
    router
      .route("/pilots/:id")
      .get(
        this.authMiddleware.authorizeRole([UserRole.ADMIN, UserRole.PILOT]),
        this.pilotController.findById
      )
      .put(this.authMiddleware.authorizeRole([UserRole.ADMIN]), this.pilotController.update)
      .delete(this.authMiddleware.authorizeRole([UserRole.ADMIN]), this.pilotController.delete);

    return router;
  }
}
