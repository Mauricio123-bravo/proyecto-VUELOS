import { Flight } from "./flight.model";

export interface FlightRepo {
    findAll(): Promise<Flight[]>
}
