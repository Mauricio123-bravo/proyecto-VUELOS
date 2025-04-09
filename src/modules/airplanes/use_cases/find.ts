import { getPagination, getTotalPages } from "../../shared/utils/getPagination";
import { Airplane } from "../models/airplane.model";
import { AirplaneRepo } from "../models/airplane.repository";

export class FindPaginatedAirplanesUseCase {
  constructor(private readonly repository: AirplaneRepo) { }

  public run = async (page: number, limit: number): Promise<{ data: Airplane[], total: number, totalPages: number }> => {

    const offset = getPagination(page, limit);

    const response = await this.repository.findAllPaginated(limit, offset);

    return getTotalPages<Airplane>(response.total, response.airplanes, limit);
  };
}
