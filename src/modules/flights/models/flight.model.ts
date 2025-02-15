import { Airplane } from "../../airplanes/models/airplane.model";

export abstract class Flight {
  id: number;
  origin: string;
  destination: string;
  departureDate: Date;
  arrivalDate: Date;
  status: boolean;
  airplane: Airplane;


}
