import { Maintenance } from "./maintenance.model";

export interface MaintenanceRepo{
    findAll(): Promise<Maintenance[]>
}