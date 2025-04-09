import { Runway } from "../models/runway.model";
import { RunwayRepo } from "../models/runway.repository";

export class FindAllRunwayUseCase {
    constructor(private readonly repository: RunwayRepo) { }

    public run = async (): Promise<Runway[]> => {
        return this.repository.findAll();
    };
}