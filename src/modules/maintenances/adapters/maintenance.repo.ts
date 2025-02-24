import { AppDataSource } from "../../../data/pg";
import { Maintenance } from "../models/maintenance.model";
import { MaintenanceRepo } from "../models/maintenance.repository";
import { MaintenanceEntity } from "./maintenance.entity";

export class MaintenancePgRepo implements MaintenanceRepo {
  private repository = AppDataSource.getRepository(MaintenanceEntity);

  findAll(): Promise<Maintenance[]> {
    return this.repository.find();
  }

  async findAllPaginated(limit: number, offset: number): Promise<{ maintenances: MaintenanceEntity[], total: number }> {
    const [maintenances, total] = await this.repository.findAndCount({
      take: limit,  // Límite de registros por página
      skip: offset, // Desde qué registro empezar
    });

    return { maintenances, total };
  }

}
