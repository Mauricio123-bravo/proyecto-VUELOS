import { Located } from "../models/located.model";
import { LocatedRepo } from "../models/located.repository";

export class FindLocatedByIdUseCase {
    constructor(private readonly repository: LocatedRepo) { }

    public run = async (id: number): Promise<Located | null> => {
        return this.repository.findById(id);
    };
}