import { LocatedRepo } from "../models/located.repository";

export class DeleteLocatedUseCase {
    constructor(private readonly repository: LocatedRepo) { }

    public async run(id: number): Promise<boolean> {
        return this.repository.delete(id);
    }
}   