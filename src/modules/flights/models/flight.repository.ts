import { Flight } from "./flight.entity";

export interface FlightRepo {
    findAll(): Promise<Flight[]>
}
