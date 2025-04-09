import { Pilot } from "../models/pilot.model";
import { PilotRepo } from "../models/pilot.repository";

export class FindAllPilotUseCase {
    constructor(private readonly repository: PilotRepo) { }

    public run = async (): Promise<Pilot[]> => {
        return this.repository.findAll();
    };
}