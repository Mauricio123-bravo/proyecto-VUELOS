import { Pilot } from "./pilot.model";

export interface PilotRepo {
    findAll(): Promise<Pilot[]>
    findAllPaginated(limit: number, offset: number): Promise<{ pilots: Pilot[], total: number }>;
    findById(id: number): Promise<Pilot | null>; 
    create(pilot: Pilot): Promise<Pilot>;
    update(id: number, pilot: Partial<Pilot>): Promise<Pilot | null>;
    delete(id: number): Promise<boolean>; 
    
}