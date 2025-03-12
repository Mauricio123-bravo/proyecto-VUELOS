import { getPagination, getTotalPages } from "../../shared/utils/getPagination";
import { Runway } from "../models/runway.model";
import { RunwayRepo } from "../models/runway.repository";

export class FindRunwaysUseCase {
  constructor(private readonly repository: RunwayRepo) { }

  public run = async (page: number, limit: number): Promise<{ data: Runway[], total: number, totalPages: number }> => {

    const offset = getPagination(page, limit);

    const response = await this.repository.findAllPaginated(limit, offset);

    return getTotalPages<Runway>(response.total, response.runways, limit);
  };
}
