import { AppDataSource } from "../../../data/pg";
import { Flight } from "../models/flight.model";
import { FlightRepo } from "../models/flight.repository";
import { FlightEntity } from "./flight.entity";

export class FlightPgRepo implements FlightRepo {
  private repository = AppDataSource.getRepository(FlightEntity);

  findAll(): Promise<Flight[]> {
    return this.repository.find();
  }
}
