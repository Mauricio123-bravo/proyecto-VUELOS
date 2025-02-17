import { AppDataSource } from "../../../data/pg";
import { Maintenance } from "../models/maintenance.model";
import { MaintenanceRepo } from "../models/maintenance.repository";
import { MaintenanceEntity } from "./maintenance.entity";

export class MaintenancePgRepo implements MaintenanceRepo {
  private repository = AppDataSource.getRepository(MaintenanceEntity);

  findAll(): Promise<Maintenance[]> {
    return this.repository.find();
  }
}
