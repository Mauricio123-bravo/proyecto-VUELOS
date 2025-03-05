import { Router } from "express";
import { UserFlightController } from "./userFlightController";


export default class UserFlightRouter {
  constructor(private readonly userFlightController: UserFlightController) { }

  public getRoutes(): Router {
    const router = Router();
    router
      .route("/userFlights")
      .get(this.userFlightController.findAll)
      .post(this.userFlightController.create);

    router
      .route("/userFlights/:id")
      .get(this.userFlightController.findById)
      .put(this.userFlightController.update)
      .delete(this.userFlightController.delete)

    return router;
  }
}
