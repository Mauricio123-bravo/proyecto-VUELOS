import { MaintenanceRepo } from "../models/maintenance.repository";

export class DeleteMaintenanceUseCase {
    constructor(private readonly repository: MaintenanceRepo) { }

    public async run(id: number): Promise<boolean> {
        return this.repository.delete(id);
    }
}   