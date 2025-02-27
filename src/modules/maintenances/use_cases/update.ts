import { Maintenance } from "../models/maintenance.model";
import { MaintenanceRepo } from "../models/maintenance.repository";

export class UpdateMaintenanceUseCase {
    constructor(private readonly repository: MaintenanceRepo) { }

    public async run(id: number, maintenance: Partial<Maintenance>): Promise<Maintenance | null> {
        return this.repository.update(id, maintenance);
    }
}
