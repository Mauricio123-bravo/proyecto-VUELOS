import { PilotRepo } from "../models/pilot.repository";
import { Pilot } from "../models/pilot.model";

export class FindPilotsUseCase {
  constructor(private readonly repository: PilotRepo) {}

  public run = async (): Promise<Pilot[]> => {
    return await this.repository.findAll();
  };
}
