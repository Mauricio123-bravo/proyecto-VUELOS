import { AppDataSource } from "../../../data/pg";
import { FlightHistory } from "../models/flightHistory.model";
import { FlightHistoryRepo } from "../models/flightHistory.repository";
import { FlightHistoryEntity } from "./flightHistory.entity";


export class FlightHistoryPgRepo implements FlightHistoryRepo {
  private repository = AppDataSource.getRepository(FlightHistoryEntity);

  findAll(): Promise<FlightHistory[]> {
    return this.repository.find();
  }
}
