import { Flight } from "../models/flight.model";
import { FlightRepo } from "../models/flight.repository";

export class UpdateFlightUseCase {
    constructor(private readonly repository: FlightRepo) { }

    public async run(id: number, flight: Partial<Flight>): Promise<Flight | null> {
        return this.repository.update(id, flight);
    }
}
