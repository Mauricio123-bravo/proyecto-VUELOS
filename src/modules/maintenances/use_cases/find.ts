import { Maintenance } from "../models/maintenance.model";
import { MaintenanceRepo } from "../models/maintenance.repository";

export class FindMaintenancesUseCase {
  constructor(private readonly repository: MaintenanceRepo) {}

  public run = async (): Promise<Maintenance[]> => {
    return await this.repository.findAll();
  };
}
