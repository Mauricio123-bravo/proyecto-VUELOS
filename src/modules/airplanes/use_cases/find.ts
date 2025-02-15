import { Airplane } from "../models/airplane.model";
import { AirplaneRepo } from "../models/airplane.repository";

export class FindAirplanesUseCase {
  constructor(private readonly repository: AirplaneRepo) {}

  public run = async (): Promise<Airplane[]> => {
    return await this.repository.findAll();
  };
}
