import { Runway } from "./runway.model";


export interface RunwayRepo {
    findAll(): Promise<Runway[]>
    findAllPaginated(limit: number, offset: number): Promise<{ runways: Runway[], total: number }>;
    findById(id: number): Promise<Runway | null>;
    create(runways: Runway): Promise<Runway>;
    update(id: number, runways: Partial<Runway>): Promise<Runway | null>;
    delete(id: number): Promise<boolean>;
}