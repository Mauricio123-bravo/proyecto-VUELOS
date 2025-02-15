import { AppDataSource } from "../../../data/pg";
import { Airplane } from "../models/airplane.model";
import { AirplaneRepo } from "../models/airplane.repository";
import { AirplaneEntity } from "./airplane.entity";

export class AirplanePgRepo implements AirplaneRepo {
  private repository = AppDataSource.getRepository(AirplaneEntity);

  findAll(): Promise<Airplane[]> {
    return this.repository.find();
  }
}
