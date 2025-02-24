import { Airplane } from "./airplane.model";

export interface AirplaneRepo {
    findAll(): Promise<Airplane[]>
    findAllPaginated(limit: number, offset: number): Promise<{ airplanes: Airplane[], total: number }>;
}
