import { FlightHistory } from "../models/flightHistory.model";

export interface FlightHistoryRepo {
    findAll(): Promise<FlightHistory[]>
    findAllPaginated(limit: number, offset: number): Promise<{ flightsHistory: FlightHistory[], total: number }>;
    findById(id: number): Promise<FlightHistory | null>;
    create(flightHistory: FlightHistory): Promise<FlightHistory>;
    update(id: number, flightHistory: Partial<FlightHistory>): Promise<FlightHistory | null>;
    delete(id: number): Promise<boolean>;
}
