import { getPagination, getTotalPages } from "../../shared/utils/getPagination";
import { Flight } from "../models/flight.model";
import { FlightRepo } from "../models/flight.repository";

export class FindPaginatedFlightsUseCase {
  constructor(private readonly repository: FlightRepo) { }

  public run = async (page: number, limit: number, origin?: string, destination?: string): Promise<{ data: Flight[], total: number, totalPages: number }> => {

    const offset = getPagination(page, limit);

    const response = await this.repository.findAllPaginated(limit, offset, origin, destination);

    return getTotalPages<Flight>(response.total, response.flights, limit);
  };
}
