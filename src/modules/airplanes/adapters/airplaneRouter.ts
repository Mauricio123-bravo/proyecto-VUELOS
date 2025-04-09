import { Router } from "express";
import { AirplaneController } from "./airplaneController";
import { AuthMiddleware } from "../../auth/adapters/authMiddelware";
import { UserRole } from "../../users/models/userRol.model";

export default class AirplaneRouter {
  constructor(private readonly airplaneController: AirplaneController,
    private readonly authMiddleware: AuthMiddleware
  ) { }

  public getRoutes(): Router {
    const router = Router();

    router.use(
      this.authMiddleware.authorizeRole([UserRole.ADMIN])
    );

    router
      .route("/airplanes")
      .get(this.airplaneController.findAllPaginated)
      .post(this.airplaneController.create);

    router
      .route("/airplanes/all")
      .get(this.airplaneController.findAll);

    router
      .route("/airplanes/:id")
      .get(this.airplaneController.findById)
      .put(this.airplaneController.update)
      .delete(this.airplaneController.delete);

    return router;
  }
}
