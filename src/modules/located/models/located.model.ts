import { Flight } from "../../flights/models/flight.model";

export abstract class Located {
    id: number;
    longitude: number;
    latitude: number;
    flightsOrigin: Flight[];
    flightsDestination: Flight[];

}