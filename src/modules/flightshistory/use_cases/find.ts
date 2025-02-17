
import { FlightHistory } from "../models/flightHistory.model";
import { FlightHistoryRepo } from "../models/flightHistory.repository";

export class FindFlightsHistoryUseCase {
  constructor(private readonly repository: FlightHistoryRepo) {}

  public run = async (): Promise<FlightHistory[]> => {
    return await this.repository.findAll();
  };
}
