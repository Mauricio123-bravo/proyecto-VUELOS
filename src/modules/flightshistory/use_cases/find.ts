
import { getPagination, getTotalPages } from "../../shared/utils/getPagination";
import { FlightHistoryEntity } from "../adapters/flightHistory.entity";
import { FlightHistory } from "../models/flightHistory.model";
import { FlightHistoryRepo } from "../models/flightHistory.repository";

export class FindFlightsHistoryUseCase {
  constructor(private readonly repository: FlightHistoryRepo) { }

  public run = async (page: number, limit: number): Promise<{ data: FlightHistoryEntity[], total: number, totalPages: number }> => {

    const offset = getPagination(page, limit);

    const response = await this.repository.findAllPaginated(limit, offset);

    return getTotalPages<FlightHistory>(response.total, response.flightsHistory, limit);
  };
}

