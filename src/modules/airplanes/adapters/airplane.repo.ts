import { AppDataSource } from "../../../data/pg";
import { Airplane } from "../models/airplane.model";
import { AirplaneRepo } from "../models/airplane.repository";
import { AirplaneEntity } from "./airplane.entity";

export class AirplanePgRepo implements AirplaneRepo {
  private repository = AppDataSource.getRepository(AirplaneEntity);

  findAll(): Promise<Airplane[]> {
    return this.repository.find();
  }

  async findAllPaginated(limit: number, offset: number): Promise<{ airplanes: AirplaneEntity[], total: number }> {
    const [airplanes, total] = await this.repository.findAndCount({
      take: limit,  // Límite de registros por página
      skip: offset, // Desde qué registro empezar
    });

    return { airplanes, total };
  }


}
