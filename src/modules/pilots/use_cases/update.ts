import { PilotRepo } from "../models/pilot.repository";
import { Pilot } from "../models/pilot.model";

export class UpdatePilotUseCase {
    constructor(private readonly repository: PilotRepo) { }

    public async run(id: number, pilot: Partial<Pilot>): Promise<Pilot | null> {
        return this.repository.update(id, pilot);
    }
}
