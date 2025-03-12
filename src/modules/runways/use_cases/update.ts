import { Runway } from "../models/runway.model";
import { RunwayRepo } from "../models/runway.repository";


export class UpdateRunwayUseCase {
    constructor(private readonly repository: RunwayRepo) { }

    public async run(id: number, runways: Partial<Runway>): Promise<Runway | null> {
        return this.repository.update(id, runways);
    }
}
