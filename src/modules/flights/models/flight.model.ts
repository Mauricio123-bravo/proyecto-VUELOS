import { Airplane } from "../../airplanes/models/airplane.model";
import { Located } from "../../located/models/located.model";
import { Pilot } from "../../pilots/models/pilot.model";
import { Track } from "../../tracks/models/track.model";
import { UserFlight } from "../../userVuelos/models/userFlight.model";

export abstract class Flight {
  id: number;
  departureDate: Date;
  arrivalDate: Date;
  status: boolean;
  airplane: Airplane;
  pilot: Pilot;
  track: Track;
  origin: Located;
  destination: Located;
  userFlight: UserFlight[]
}
