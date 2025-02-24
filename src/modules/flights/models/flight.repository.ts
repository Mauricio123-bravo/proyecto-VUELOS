import { Flight } from "./flight.model";

export interface FlightRepo {
    findAll(): Promise<Flight[]>
    findAllPaginated(limit: number, offset: number): Promise<{ flights: Flight[], total: number }>;
}
