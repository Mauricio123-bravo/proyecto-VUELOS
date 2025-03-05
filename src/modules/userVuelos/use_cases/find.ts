import { getPagination, getTotalPages } from "../../shared/utils/getPagination";
import { UserFlight } from "../models/userFlight.model";
import { UserFlightRepo } from "../models/userFlight.repository";

export class FindUserFlightsUseCase {
  constructor(private readonly repository: UserFlightRepo) { }

  public run = async (page: number, limit: number): Promise<{ data: UserFlight[], total: number, totalPages: number }> => {

    const offset = getPagination(page, limit);

    const response = await this.repository.findAllPaginated(limit, offset);

    return getTotalPages<UserFlight>(response.total, response.userFlight, limit);
  };
}
