import { PilotRepo } from "../models/pilot.repository";

export class DeletePilotUseCase {
    constructor(private readonly repository: PilotRepo) { }

    public async run(id: number): Promise<boolean> {
        return this.repository.delete(id);
    }
}   