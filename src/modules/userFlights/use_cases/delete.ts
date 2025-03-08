import { UserFlightRepo } from "../models/userFlight.repository";


export class DeleteUserFlightsUseCase {
    constructor(private readonly repository: UserFlightRepo) { }

    public async run(id: string): Promise<boolean> {
        return this.repository.delete(id);
    }
}   