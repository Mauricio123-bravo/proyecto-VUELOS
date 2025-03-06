import { Router } from "express";
import { AuthController } from "./authController";
import { AuthMiddleware } from "./authMiddelware";
import { UserRole } from "../../users/models/userRol.model";

export default class AuthRouter {
  constructor(private readonly authController: AuthController,
    private readonly authMiddleware: AuthMiddleware
  ) { }

  public getRoutes(): Router {
    const router = Router();
    router.route("/login").post(this.authController.login);
    router.route("/register").post(this.authController.register);
    router.route("/changeRole").put(
      this.authMiddleware.authenticate,
      this.authMiddleware.authorizeRole([UserRole.ADMIN]),
      this.authController.changeUserRole
    );

    return router;
  }
}
