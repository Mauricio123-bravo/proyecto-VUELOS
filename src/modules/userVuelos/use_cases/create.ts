import { UserFlight } from "../models/userFlight.model";
import { UserFlightRepo } from "../models/userFlight.repository";

export class CreateUserFlightsUseCase {
    constructor(private readonly repository: UserFlightRepo) { }

    public async run(userFlight: UserFlight): Promise<UserFlight> {
        return this.repository.create(userFlight);
    }
}