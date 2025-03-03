import { AppDataSource } from "../../../data/pg";
import { FlightHistory } from "../models/flightHistory.model";
import { FlightHistoryRepo } from "../models/flightHistory.repository";
import { FlightHistoryEntity } from "./flightHistory.entity";


export class FlightHistoryPgRepo implements FlightHistoryRepo {
  private repository = AppDataSource.getRepository(FlightHistoryEntity);

  findAll(): Promise<FlightHistory[]> {
    return this.repository.find();
  }

  async findAllPaginated(limit: number, offset: number): Promise<{ flightsHistory: FlightHistoryEntity[], total: number }> {
    const [flightsHistory, total] = await this.repository.findAndCount({
      take: limit,  // Límite de registros por página
      skip: offset, // Desde qué registro empezar
    });

    return { flightsHistory, total };
  }


  async findById(id: number): Promise<FlightHistoryEntity | null> {
    return this.repository.findOneBy({ id });
  }

  async create(flightHistory: FlightHistoryEntity): Promise<FlightHistoryEntity> {
    return this.repository.save(flightHistory);
  }

  async update(id: number, flightHistory: Partial<FlightHistoryEntity>): Promise<FlightHistoryEntity | null> {
    await this.repository.update(id, flightHistory);
    return this.repository.findOneBy({ id });
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected !== 0;
  }

}
