import { Flight } from "../models/flight.entity";
import { FlightRepo } from "../models/flight.repository";

export class FindFlightsUseCase {
  constructor(private readonly repository: FlightRepo) {}

  public run = async (): Promise<Flight[]> => {
    return await this.repository.findAll();
  };
}
