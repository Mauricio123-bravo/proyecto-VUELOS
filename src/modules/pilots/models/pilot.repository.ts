import { Pilot } from "./pilot.model";

export interface PilotRepo {
    findAll(): Promise<Pilot[]>
    findAllPaginated(limit: number, offset: number): Promise<{ pilots: Pilot[], total: number }>;
}