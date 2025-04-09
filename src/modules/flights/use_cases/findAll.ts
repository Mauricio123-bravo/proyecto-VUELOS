import { Flight } from "../models/flight.model";
import { FlightRepo } from "../models/flight.repository";

export class FindAllFlightUseCase {
    constructor(private readonly repository: FlightRepo) { }

    public run = async (): Promise<Flight[]> => {
        return this.repository.findAll();
    };
}