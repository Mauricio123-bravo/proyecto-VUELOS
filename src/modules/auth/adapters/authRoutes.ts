import { Router } from "express";
import { AuthController } from "./authController";

export default class AuthRouter {
  constructor(private readonly authController: AuthController) {}

  public getRoutes(): Router {
    const router = Router();
    router.route("/login").post(this.authController.login);
    router.route("/register").post(this.authController.register);

    return router;
  }
}
