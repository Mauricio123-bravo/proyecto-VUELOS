import { AirplaneRepo } from "../models/airplane.repository";

export class DeleteAirplaneUseCase {
    constructor(private readonly repository: AirplaneRepo) { }

    public async run(id: number): Promise<boolean> {
        return this.repository.delete(id);
    }
}   