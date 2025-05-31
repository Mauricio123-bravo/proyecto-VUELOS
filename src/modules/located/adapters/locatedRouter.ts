import { Router } from "express";
import { LocatedController } from "./locatedController";
import { AuthMiddleware } from "../../auth/adapters/authMiddelware";
import { UserRole } from "../../users/models/userRol.model";

export default class LocatedRouter {
  constructor(
    private readonly locatedController: LocatedController,
    private readonly authMiddleware: AuthMiddleware
  ) { }

  public getRoutes(): Router {
    const router = Router();

    router
      .route("/located")
      .get(
        this.authMiddleware.authorizeRole([UserRole.ADMIN, UserRole.PILOT]),
        this.locatedController.findAllPaginated
      )
      .post(this.authMiddleware.authorizeRole([UserRole.ADMIN]), this.locatedController.create);

    router
      .route("/located/all")
      .get(
        this.authMiddleware.authorizeRole([UserRole.ADMIN, UserRole.PILOT]),
        this.locatedController.findAll
      )

    router
      .route("/located/:id")
      .get(
        this.authMiddleware.authorizeRole([UserRole.ADMIN, UserRole.PILOT]),
        this.locatedController.findById
      )
      .put(this.authMiddleware.authorizeRole([UserRole.ADMIN]), this.locatedController.update)
      .delete(this.authMiddleware.authorizeRole([UserRole.ADMIN]), this.locatedController.delete);

    return router;
  }
}
