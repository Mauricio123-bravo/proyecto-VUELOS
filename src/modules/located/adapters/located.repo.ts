import { AppDataSource } from "../../../data/pg";
import { Located } from "../models/located.model";
import { LocatedRepo } from "../models/located.repository";
import { LocatedEntity } from "./located.entity";


export class LocatedPgRepo implements LocatedRepo {
  private repository = AppDataSource.getRepository(LocatedEntity);

  findAll(): Promise<Located[]> {
    return this.repository.find();
  }

  async findAllPaginated(limit: number, offset: number): Promise<{ located: LocatedEntity[], total: number }> {
    const [located, total] = await this.repository.findAndCount({
      take: limit,  // Límite de registros por página
      skip: offset, // Desde qué registro empezar
    });

    return { located, total };
  }

  async findById(id: number): Promise<LocatedEntity | null> {
    return this.repository.findOneBy({ id });
  }

  async create(located: LocatedEntity): Promise<LocatedEntity> {
    return this.repository.save(located);
  }

  async update(id: number, located: Partial<LocatedEntity>): Promise<LocatedEntity | null> {
    await this.repository.update(id, located);
    return this.repository.findOneBy({ id });
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected !== 0;
  }

}
