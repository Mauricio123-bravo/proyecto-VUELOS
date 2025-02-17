import { Located } from "../models/located.model";
import { LocatedRepo } from "../models/located.repository";

export class FindLocatedUseCase {
  constructor(private readonly repository: LocatedRepo) {}

  public run = async (): Promise<Located[]> => {
    return await this.repository.findAll();
  };
}
