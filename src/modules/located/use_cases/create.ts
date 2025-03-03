import { Located } from "../models/located.model";
import { LocatedRepo } from "../models/located.repository";

export class CreateLocatedUseCase {
    constructor(private readonly repository: LocatedRepo) { }

    public async run(located: Located): Promise<Located> {
        return this.repository.create(located);
    }
}