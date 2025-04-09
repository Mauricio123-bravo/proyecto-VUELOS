import { Airplane } from "../models/airplane.model";
import { AirplaneRepo } from "../models/airplane.repository";

export class FindAllAirplaneUseCase {
    constructor(private readonly repository: AirplaneRepo) { }

    public run = async (): Promise<Airplane[]> => {
        return this.repository.findAll();
    };
}