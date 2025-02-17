import { AppDataSource } from "../../../data/pg";
import { Located } from "../models/located.model";
import { LocatedRepo } from "../models/located.repository";
import { LocatedEntity } from "./located.entity";


export class LocatedPgRepo implements LocatedRepo {
  private repository = AppDataSource.getRepository(LocatedEntity);

  findAll(): Promise<Located[]> {
    return this.repository.find();
  }
}
