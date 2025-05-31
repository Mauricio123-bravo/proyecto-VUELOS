import { LocatedPgRepo } from "../adapters/located.repo";
import { Located } from "../models/located.model";
import { LocatedRepo } from "../models/located.repository";

export class FindAllLocatedUseCase {
    constructor(private readonly repository: LocatedRepo) { }

    public run = async (): Promise<Located[]> => {
        return this.repository.findAll();
    };
}