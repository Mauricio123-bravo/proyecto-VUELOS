import { Router } from "express";
import { UserController } from "./userController";

export default class UserRouter {
  constructor(private readonly userController: UserController) {}

  public getRoutes(): Router {
    const router = Router();
    router
    .route("/users")
    .get(this.userController.findAll);

    return router;
  }
}
