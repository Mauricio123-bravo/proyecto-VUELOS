import { getPagination, getTotalPages } from "../../shared/utils/getPagination";
import { Located } from "../models/located.model";
import { LocatedRepo } from "../models/located.repository";

export class FindLocatedUseCase {
  constructor(private readonly repository: LocatedRepo) { }

  public run = async (page: number, limit: number): Promise<{ data: Located[], total: number, totalPages: number }> => {

    const offset = getPagination(page, limit);

    const response = await this.repository.findAllPaginated(limit, offset);

    return getTotalPages<Located>(response.total, response.located, limit);
  };
}
