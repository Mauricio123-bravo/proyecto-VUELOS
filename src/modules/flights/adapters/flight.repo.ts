import { AppDataSource } from "../../../data/pg";
import { Flight } from "../models/flight.model";
import { FlightRepo } from "../models/flight.repository";
import { FlightEntity } from "./flight.entity";

export class FlightPgRepo implements FlightRepo {
  private repository = AppDataSource.getRepository(FlightEntity);

  async findAll(): Promise<Flight[]> {
    return this.repository.find({
      relations: ["airplane", "pilot", "origin.location", "destination.location"],
    });
  }

  async findAllPaginated(limit: number, offset: number, origin?: string, destination?: string): Promise<{ flights: FlightEntity[], total: number }> {
    const query = this.repository
      .createQueryBuilder('flight')
      .leftJoinAndSelect('flight.origin', 'origin')
      .leftJoinAndSelect('origin.location', 'originLocation')
      .leftJoinAndSelect('flight.destination', 'destination')
      .leftJoinAndSelect('destination.location', 'destinationLocation')
      .skip(offset)
      .take(limit);
  
    if (origin) {
      query.andWhere('originLocation.name ILIKE :origin', { origin: `%${origin}%` });
    }
  
    if (destination) {
      query.andWhere('destinationLocation.name ILIKE :destination', { destination: `%${destination}%` });
    }
  
    const [flights, total] = await query.getManyAndCount();
  
    return { flights, total };
  }
  
  

  async findById(id: number): Promise<FlightEntity | null> {
    return this.repository.findOne({
      where: { id },
      relations: ["airplane", "pilot", "origin.location", "destination.location"],
    },

    );
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
