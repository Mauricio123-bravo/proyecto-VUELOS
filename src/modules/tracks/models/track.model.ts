import { Flight } from "../../flights/models/flight.model";

export abstract class Track{
    id: number;
    location: string;
    length: string; 
    status: boolean;
    flights: Flight[]

}