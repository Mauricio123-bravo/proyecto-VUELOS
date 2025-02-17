import { Flight } from "../../flights/models/flight.model";
import { Maintenance } from "../../maintenances/models/maintenance.model";

export abstract class Airplane {
    id: number;
    modelYear: string;
    capacity: string;
    status: boolean;
    flights: Flight[]
    maintenances: Maintenance[] 
  
  }
  