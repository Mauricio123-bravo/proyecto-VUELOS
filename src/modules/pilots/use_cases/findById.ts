import { PilotRepo } from "../models/pilot.repository";
import { Pilot } from "../models/pilot.model";

export class FindPilotByIdUseCase {
    constructor(private readonly repository: PilotRepo) { }

    public run = async (id: number): Promise<Pilot | null> => {
        return this.repository.findById(id);
    };
}