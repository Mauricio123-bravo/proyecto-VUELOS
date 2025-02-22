import { PilotRepo } from "../models/pilot.repository";
import { Pilot } from "../models/pilot.model";
import { getPagination, getTotalPages } from "../../shared/utils/getPagination";

export class FindPilotsUseCase {
  constructor(private readonly repository: PilotRepo) {}

  public run = async (page: number, limit: number): Promise<{data: Pilot[], total:number, totalPages:number}> => {

    const offset = getPagination(page,limit);
    
    const response = await this.repository.findAllPaginated(limit, offset);
    
    return getTotalPages<Pilot>(response.total,response.pilots,limit);
  };
}
