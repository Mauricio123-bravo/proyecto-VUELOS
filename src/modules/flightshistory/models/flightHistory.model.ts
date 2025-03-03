import { Flight } from "../../flights/models/flight.model";

export abstract class FlightHistory {
    id: number;
    duration: number;
    observation: string;
    flight: Flight;

}