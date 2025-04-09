import { Router } from "express";
import { FlightController } from "./flightController";
import { AuthMiddleware } from "../../auth/adapters/authMiddelware";
import { UserRole } from "../../users/models/userRol.model";

export default class FlightRouter {
  constructor(private readonly flightController: FlightController,
    private readonly authMiddleware: AuthMiddleware
  ) { }

  public getRoutes(): Router {
    const router = Router();

    router.use(
      this.authMiddleware.authorizeRole([UserRole.ADMIN])
    );

    router
      .route("/flights")
      .get(this.flightController.findAllPaginated)
      .post(this.flightController.create);

    router
      .route("/flights/all")
      .get(this.flightController.findAll)

    router
      .route("/flights/:id")
      .get(this.flightController.findById)
      .put(this.flightController.update)
      .delete(this.flightController.delete);

    return router;
  }
}
