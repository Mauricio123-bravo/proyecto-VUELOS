import { Airplane } from "../models/airplane.model";
import { AirplaneRepo } from "../models/airplane.repository";

export class FindAirplaneByIdUseCase {
    constructor(private readonly repository: AirplaneRepo) { }

    public run = async (id: number): Promise<Airplane | null> => {
        return this.repository.findById(id);
    };
}