import { AppDataSource } from "../../../data/mariadb";
import { Flight } from "../models/flight.model";
import { FlightRepo } from "../models/flight.repository";
import { FlightEntity } from "./flightMariadb.entity";

export class FlightMariaDBRepo implements FlightRepo {
  private repository = AppDataSource.getRepository(FlightEntity);

  findAll(): Promise<Flight[]> {
    return this.repository.find();
  }
}
