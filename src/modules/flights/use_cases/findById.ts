import { Flight } from "../models/flight.model";
import { FlightRepo } from "../models/flight.repository";

export class FindFlightByIdUseCase {
    constructor(private readonly repository: FlightRepo) { }

    public run = async (id: number): Promise<Flight | null> => {
        return this.repository.findById(id);
    };
}