import { AppDataSource } from "../../../data/pg";
import { Flight } from "../models/flight.model";
import { FlightRepo } from "../models/flight.repository";
import { FlightEntity } from "./flight.entity";

export class FlightPgRepo implements FlightRepo {
  private repository = AppDataSource.getRepository(FlightEntity);

  findAll(): Promise<Flight[]> {
    return this.repository.find();
  }

  async findAllPaginated(limit: number, offset: number): Promise<{ flights: FlightEntity[], total: number }> {
    const [flights, total] = await this.repository.findAndCount({
      take: limit,  // Límite de registros por página
      skip: offset, // Desde qué registro empezar
    });

    return { flights, total };
  }

  async findById(id: number): Promise<FlightEntity | null> {
    return this.repository.findOneBy({ id });
  }

  async create(flight: FlightEntity): Promise<FlightEntity> {
    return this.repository.save(flight);
  }

  async update(id: number, flight: Partial<FlightEntity>): Promise<FlightEntity | null> {
    await this.repository.update(id, flight);
    return this.repository.findOneBy({ id });
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected !== 0;
  }
}
