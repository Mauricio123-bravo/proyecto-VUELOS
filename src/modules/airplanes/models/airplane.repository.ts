import { Airplane } from "./airplane.model";

export interface AirplaneRepo {
    findAll(): Promise<Airplane[]>
    findAllPaginated(limit: number, offset: number): Promise<{ airplanes: Airplane[], total: number }>;
    findById(id: number): Promise<Airplane | null>;
    create(airplane: Airplane): Promise<Airplane>;
    update(id: number, airplane: Partial<Airplane>): Promise<Airplane | null>;
    delete(id: number): Promise<boolean>;
}
