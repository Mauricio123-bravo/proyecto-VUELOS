import { Router } from "express";
import { MaintenanceController } from "./maintenanceController";

export default class MaintenanceRouter {
  constructor(private readonly maintenanceController: MaintenanceController) { }

  public getRoutes(): Router {
    const router = Router();
    router
      .route("/maintenances")
      .get(this.maintenanceController.findAll)
      .post(this.maintenanceController.create);

    router
      .route("/maintenances/:id")
      .get(this.maintenanceController.findById)
      .put(this.maintenanceController.update)
      .delete(this.maintenanceController.delete)

    return router;
  }
}