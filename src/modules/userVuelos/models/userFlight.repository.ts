import { UserFlight } from "./userFlight.model";

export interface UserFlightRepo {
    findAll(): Promise<UserFlight[]>
    findAllPaginated(limit: number, offset: number): Promise<{ userFlight: UserFlight[], total: number }>;
    findById(id: number): Promise<UserFlight | null>; 
    create(userFlight: UserFlight): Promise<UserFlight>;
    update(id: number, userFlight: Partial<UserFlight>): Promise<UserFlight | null>;
    delete(id: number): Promise<boolean>; 
    
}