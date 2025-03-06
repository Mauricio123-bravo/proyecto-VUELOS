import { Router } from "express";
import { UserController } from "./userController";
import { AuthMiddleware } from "../../auth/adapters/authMiddelware";
import { UserRole } from "../models/userRol.model";

export default class UserRouter {
  constructor(private readonly userController: UserController,
    private readonly authMiddleware: AuthMiddleware
  ) { }

  public getRoutes(): Router {
    const router = Router();

    router.use(
      this.authMiddleware.authorizeRole([UserRole.ADMIN])
    );

    router
      .route("/users")
      .get(this.userController.findAll);

    router
      .route("/users/:id")
      .get(this.userController.findById);

    return router;
  }
}
