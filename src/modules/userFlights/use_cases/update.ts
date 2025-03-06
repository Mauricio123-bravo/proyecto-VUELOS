import { UserFlight } from "../models/userFlight.model";
import { UserFlightRepo } from "../models/userFlight.repository";


export class UpdateUserFlightUseCase {
    constructor(private readonly repository: UserFlightRepo) { }

    public async run(id: number, userFlight: Partial<UserFlight>): Promise<UserFlight | null> {
        return this.repository.update(id, userFlight);
    }
}
