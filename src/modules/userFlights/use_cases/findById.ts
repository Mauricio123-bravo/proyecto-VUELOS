import { UserFlight } from "../models/userFlight.model";
import { UserFlightRepo } from "../models/userFlight.repository";


export class FindUserFlightByIdUseCase {
    constructor(private readonly repository: UserFlightRepo) { }

    public run = async (id: string): Promise<UserFlight | null> => {
        return this.repository.findById(id);
    };
}