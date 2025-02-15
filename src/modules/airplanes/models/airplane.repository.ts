import { Airplane } from "./airplane.model";

export interface AirplaneRepo {
    findAll(): Promise<Airplane[]>
}
