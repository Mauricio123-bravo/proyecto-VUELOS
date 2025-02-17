import { Flight } from "../../flights/models/flight.model";

export abstract class FlightHistory {
    id: number;
    duration: string;
    observation: string;
    flight: Flight;

}