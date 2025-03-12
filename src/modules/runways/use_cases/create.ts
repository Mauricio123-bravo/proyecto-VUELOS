import { Runway } from "../models/runway.model";
import { RunwayRepo } from "../models/runway.repository";


export class CreateRunwayUseCase {
    constructor(private readonly repository: RunwayRepo) { }

    public async run(runway: Runway): Promise<Runway> {
        return this.repository.create(runway);
    }
}