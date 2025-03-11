import { FlightEntity } from "../../flights/adapters/flight.entity";
import { UserEntity } from "../../users/adapters/user.entity";
import { UserFlight } from "./userFlight.model";

export interface UserFlightRepo {
    findAll(): Promise<UserFlight[]>
    findAllPaginated(limit: number, offset: number): Promise<{ userFlight: UserFlight[], total: number }>;
    findById(id: string): Promise<UserFlight | null>;
    create(userFlight: UserFlight): Promise<UserFlight>;
    update(id: string, userFlight: Partial<UserFlight>): Promise<UserFlight | null>;
    delete(id: string): Promise<boolean>;
    isSeatAvailable(flightId: number, seatNumber: number): Promise<boolean>;
    bookFlight(user: UserEntity, flight: FlightEntity, seatNumber: number): Promise<UserFlight>;

}