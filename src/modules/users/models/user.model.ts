import { UserFlight } from "../../userFlights/models/userFlight.model";
import { UserRole } from "./userRol.model";

export class User {
  id: number;
  email: string;
  username: string;
  password: string;
  role: UserRole;
  userFlight: UserFlight[];
}

export abstract class UserResponse {
  id: number;
  email: string;
  username: string;
  role: UserRole;
}
