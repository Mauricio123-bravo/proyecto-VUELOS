import { PilotRepo } from "../models/pilot.repository";
import { Pilot } from "../models/pilot.model";

export class CreatePilotUseCase {
    constructor(private readonly repository: PilotRepo) { }

    public async run(pilot: Pilot): Promise<Pilot> {
        return this.repository.create(pilot);
    }
}