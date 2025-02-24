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
}
