import { Maintenance } from "./maintenance.model";

export interface MaintenanceRepo {
    findAll(): Promise<Maintenance[]>
    findAllPaginated(limit: number, offset: number): Promise<{ maintenances: Maintenance[], total: number }>;
}