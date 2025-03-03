import { Located } from "../models/located.model";
import { LocatedRepo } from "../models/located.repository";

export class UpdateLocatedUseCase {
    constructor(private readonly repository: LocatedRepo) { }

    public async run(id: number, located: Partial<Located>): Promise<Located | null> {
        return this.repository.update(id, located);
    }
}
