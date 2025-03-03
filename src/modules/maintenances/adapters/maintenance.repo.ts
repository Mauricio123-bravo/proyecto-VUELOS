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

  async findById(id: number): Promise<MaintenanceEntity | null> {
    return this.repository.findOneBy({ id });
  }

  async create(maintenance: MaintenanceEntity): Promise<MaintenanceEntity> {
    return this.repository.save(maintenance);
  }

  async update(id: number, maintenance: Partial<MaintenanceEntity>): Promise<MaintenanceEntity | null> {
    await this.repository.update(id, maintenance);
    return this.repository.findOneBy({ id });
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected !== 0;
  }

}
