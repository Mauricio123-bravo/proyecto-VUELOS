import { AppDataSource } from "../../../data/pg";
import { Runway } from "../models/runway.model";
import { RunwayRepo } from "../models/runway.repository";
import { RunwayEntity } from "./runway.entity";

export class RunwaykPgRepo implements RunwayRepo {
  private repository = AppDataSource.getRepository(RunwayEntity);

  findAll(): Promise<Runway[]> {
    return this.repository.find();
  }
  async findAllPaginated(limit: number, offset: number): Promise<{ runways: RunwayEntity[], total: number }> {
    const [runways, total] = await this.repository.findAndCount({
      take: limit,  // Límite de registros por página
      skip: offset, // Desde qué registro empezar
    });

    return { runways, total };
  }
  async findById(id: number): Promise<RunwayEntity | null> {
    return this.repository.findOneBy({ id });
  }

  async create(runways: RunwayEntity): Promise<RunwayEntity> {
    return this.repository.save(runways);
  }

  async update(id: number, runways: Partial<RunwayEntity>): Promise<RunwayEntity | null> {
    await this.repository.update(id, runways);
    return this.repository.findOneBy({ id });
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected !== 0;
  }
}
