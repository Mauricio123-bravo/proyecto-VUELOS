import { Flight } from "../../flights/models/flight.model";
import { Maintenance } from "../../maintenances/models/maintenance.model";

export abstract class Airplane {
    id: number;
    name:string;
    modelYear: string;
    capacity: number;
    status: boolean;
    flights: Flight[]
    maintenances: Maintenance[] 
  
  }
  