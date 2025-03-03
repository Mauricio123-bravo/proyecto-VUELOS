import { Flight } from "../models/flight.model";
import { FlightRepo } from "../models/flight.repository";

export class CreateFlightUseCase {
    constructor(private readonly repository: FlightRepo) { }

    public async run(flight: Flight): Promise<Flight> {
        return this.repository.create(flight);
    }
}