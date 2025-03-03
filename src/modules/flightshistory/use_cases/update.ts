import { FlightHistoryEntity } from "../adapters/flightHistory.entity";
import { FlightHistory } from "../models/flightHistory.model";
import { FlightHistoryRepo } from "../models/flightHistory.repository";

export class UpdateFlightHistoryUseCase {
    constructor(private readonly repository: FlightHistoryRepo) { }

    public async run(id: number, flightHistory: Partial<FlightHistory>): Promise<FlightHistory | null> {
        return this.repository.update(id, flightHistory);
    }
}
