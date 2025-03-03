import { FlightHistory } from "../models/flightHistory.model";
import { FlightHistoryRepo } from "../models/flightHistory.repository";

export class CreateFlightHistoryUseCase {
    constructor(private readonly repository: FlightHistoryRepo) { }

    public async run(flightHistory: FlightHistory): Promise<FlightHistory> {
        return this.repository.create(flightHistory);
    }
}