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
}
