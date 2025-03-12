import { RunwayRepo } from "../models/runway.repository";

export class DeleteRunwayUseCase {
    constructor(private readonly repository: RunwayRepo) { }

    public async run(id: number): Promise<boolean> {
        return this.repository.delete(id);
    }
}   