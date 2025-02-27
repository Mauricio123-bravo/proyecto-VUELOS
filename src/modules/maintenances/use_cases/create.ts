import { Maintenance } from "../models/maintenance.model";
import { MaintenanceRepo } from "../models/maintenance.repository";

export class CreateMaintenanceUseCase {
    constructor(private readonly repository: MaintenanceRepo) { }

    public async run(maintenance: Maintenance): Promise<Maintenance> {
        return this.repository.create(maintenance);
    }
}