import { Router } from "express";
import { MaintenanceController } from "./maintenanceController";

export default class MaintenanceRouter {
  constructor(private readonly maintenanceController: MaintenanceController) {}

  public getRoutes(): Router {
    const router = Router();
    router
    .route("/maintenances")
    .get(this.maintenanceController.findAll);

    return router;
  }
}