import { Flight } from "../../flights/models/flight.model";

export abstract class Located {
    id: number;
    longitude: number;
    latitude: number;
    name:string;
    flightsOrigin: Flight[];
    flightsDestination: Flight[];

}