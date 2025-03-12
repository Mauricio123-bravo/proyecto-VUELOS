import { Airplane } from "../../airplanes/models/airplane.model";
import { Pilot } from "../../pilots/models/pilot.model";
import { Runway} from "../../runways/models/runway.model";
import { UserFlight } from "../../userFlights/models/userFlight.model";

export abstract class Flight {
  id: number;
  departureDate: Date;
  arrivalDate: Date;
  status: boolean;
  airplane: Airplane;
  pilot: Pilot;
  origin: Runway;
  destination: Runway;
  usersFlight: UserFlight[]
}
