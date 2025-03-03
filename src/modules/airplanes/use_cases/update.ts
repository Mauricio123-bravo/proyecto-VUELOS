import { Airplane } from "../models/airplane.model";
import { AirplaneRepo } from "../models/airplane.repository";

export class UpdateAirplaneUseCase {
    constructor(private readonly repository: AirplaneRepo) { }

    public async run(id: number, airplane: Partial<Airplane>): Promise<Airplane | null> {
        return this.repository.update(id, airplane);
    }
}
