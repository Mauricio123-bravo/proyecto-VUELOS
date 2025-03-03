import { FlightHistory } from "../models/flightHistory.model";
import { FlightHistoryRepo } from "../models/flightHistory.repository";

export class FindFlightHistoryByIdUseCase {
    constructor(private readonly repository: FlightHistoryRepo) { }

    public run = async (id: number): Promise<FlightHistory | null> => {
        return this.repository.findById(id);
    };
}