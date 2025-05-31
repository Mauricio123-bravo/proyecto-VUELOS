import { Flight } from "../../flights/models/flight.model";
import { Located } from "../../located/models/located.model";

export abstract class Runway{
    id: number;
    location: Located;
    length: number; 
    width:number;
    status: boolean;
    flightsOrigin: Flight[];
    flightsDestination: Flight[];
}