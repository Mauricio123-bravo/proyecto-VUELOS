import { PilotRepo } from "../models/pilot.repository";
import { Pilot } from "../models/pilot.model";

export class FindPilotsUseCase {
  constructor(private readonly repository: PilotRepo) {}

  public run = async (page: number, limit: number): Promise<{pilots: Pilot[], total:number}> => {
    const offset = (page - 1 ) * limit; 
    return await this.repository.findAllPaginated(limit, offset);
  };
}
