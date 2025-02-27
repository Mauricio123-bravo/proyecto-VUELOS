import { Maintenance } from "../models/maintenance.model";
import { MaintenanceRepo } from "../models/maintenance.repository";

export class FindMaintenanceByIdUseCase {
    constructor(private readonly repository: MaintenanceRepo) { }

    public run = async (id: number): Promise<Maintenance | null> => {
        return this.repository.findById(id);
    };
}