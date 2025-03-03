import { FlightRepo } from "../models/flight.repository";

export class DeleteFlightUseCase {
    constructor(private readonly repository: FlightRepo) { }

    public async run(id: number): Promise<boolean> {
        return this.repository.delete(id);
    }
}   