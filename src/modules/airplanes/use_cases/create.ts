import { AirplanePgRepo } from "../adapters/airplane.repo";
import { Airplane } from "../models/airplane.model";
import { AirplaneRepo } from "../models/airplane.repository";

export class CreateAirplaneUseCase {
    constructor(private readonly repository: AirplaneRepo) { }

    public async run(airplane: Airplane): Promise<Airplane> {
        return this.repository.create(airplane);
    }
}