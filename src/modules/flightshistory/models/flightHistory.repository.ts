import { FlightHistory } from "../models/flightHistory.model";

export interface FlightHistoryRepo {
    findAll(): Promise<FlightHistory[]>
    findAllPaginated(limit: number, offset: number): Promise<{ flightsHistory: FlightHistory[], total: number }>;
}