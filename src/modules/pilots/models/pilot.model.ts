import { Flight } from "../../flights/models/flight.model";

export abstract class Pilot{
    id: number;
    name: string;
    licence: string; 
    experienceYears: string; 
    rank : string; 
    status: boolean;
    flights: Flight[]

}