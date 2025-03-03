import { FlightHistoryRepo } from "../models/flightHistory.repository";

export class DeleteFlightHistoryUseCase {
    constructor(private readonly repository: FlightHistoryRepo) { }

    public async run(id: number): Promise<boolean> {
        return this.repository.delete(id);
    }
}   