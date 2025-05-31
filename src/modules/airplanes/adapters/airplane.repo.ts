import { AppDataSource } from "../../../data/pg";
import { Airplane } from "../models/airplane.model";
import { AirplaneRepo } from "../models/airplane.repository";
import { AirplaneEntity } from "./airplane.entity";

export class AirplanePgRepo implements AirplaneRepo {
  private repository = AppDataSource.getRepository(AirplaneEntity);

  async findAll(): Promise<Airplane[]> {
    return this.repository.find();
  }

  async findAllPaginated(limit: number, offset: number): Promise<{ airplanes: AirplaneEntity[], total: number }> {
    const [airplanes, total] = await this.repository.findAndCount({
      take: limit,  // Límite de registros por página
      skip: offset, // Desde qué registro empezar
    });

    return { airplanes, total };
  }

  async findById(id: number): Promise<AirplaneEntity | null> {
    return this.repository.findOneBy({ id });
  }

  async create(airplane: AirplaneEntity): Promise<AirplaneEntity> {
    return this.repository.save(airplane);
  }

  async update(id: number, airplane: Partial<AirplaneEntity>): Promise<AirplaneEntity | null> {
    await this.repository.update(id, airplane);
    return this.repository.findOneBy({ id });
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected !== 0;
  }


}
