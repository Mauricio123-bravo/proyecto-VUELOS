import { Flight } from "./flight.model";

export interface FlightRepo {
    findAll(): Promise<Flight[]>
    findAllPaginated(limit: number, offset: number): Promise<{ flights: Flight[], total: number }>;
    findById(id: number): Promise<Flight | null>;
    create(flight: Flight): Promise<Flight>;
    update(id: number, flight: Partial<Flight>): Promise<Flight | null>;
    delete(id: number): Promise<boolean>;
}
