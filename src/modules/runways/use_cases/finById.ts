import { Runway } from "../models/runway.model";
import { RunwayRepo } from "../models/runway.repository";


export class FindRunwayByIdUseCase {
    constructor(private readonly repository: RunwayRepo) { }

    public run = async (id: number): Promise<Runway | null> => {
        return this.repository.findById(id);
    };
}