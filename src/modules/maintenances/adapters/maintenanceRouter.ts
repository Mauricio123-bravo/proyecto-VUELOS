import { Router } from "express";
import { MaintenanceController } from "./maintenanceController";
import { AuthMiddleware } from "../../auth/adapters/authMiddelware";
import { UserRole } from "../../users/models/userRol.model";

export default class MaintenanceRouter {
  constructor(
    private readonly maintenanceController: MaintenanceController,
    private readonly authMiddleware: AuthMiddleware
  ) { }

  public getRoutes(): Router {
    const router = Router();

    router
      .route("/maintenances")
      .get(
        this.authMiddleware.authorizeRole([UserRole.ADMIN, UserRole.PILOT]),
        this.maintenanceController.findAll
      )
      .post(this.authMiddleware.authorizeRole([UserRole.ADMIN]), this.maintenanceController.create);

    router
      .route("/maintenances/:id")
      .get(
        this.authMiddleware.authorizeRole([UserRole.ADMIN, UserRole.PILOT]),
        this.maintenanceController.findById
      )
      .put(this.authMiddleware.authorizeRole([UserRole.ADMIN]), this.maintenanceController.update)
      .delete(this.authMiddleware.authorizeRole([UserRole.ADMIN]), this.maintenanceController.delete);

    return router;
  }
}
