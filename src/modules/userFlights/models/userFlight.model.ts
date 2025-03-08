import { Flight } from "../../flights/models/flight.model";
import { User } from "../../users/models/user.model";

export abstract class UserFlight{
    id:string;
    user: User;
    flight: Flight;
    numberOfSeats:number 

}