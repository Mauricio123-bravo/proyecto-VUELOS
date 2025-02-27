import { Maintenance } from "./maintenance.model";

export interface MaintenanceRepo {
    findAll(): Promise<Maintenance[]>
    findAllPaginated(limit: number, offset: number): Promise<{ maintenances: Maintenance[], total: number }>;
    findById(id: number): Promise<Maintenance | null>;
    create(maintenance: Maintenance): Promise<Maintenance>;
    update(id: number, maintenance: Partial<Maintenance>): Promise<Maintenance | null>;
    delete(id: number): Promise<boolean>;
}