import { Flight } from "../../flights/models/flight.model";

export abstract class Airplane {
    id: number;
    modelYear: string;
    capacity: string;
    status: boolean;
    flights: Flight[]
  
  }
  