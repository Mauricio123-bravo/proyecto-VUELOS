
import { AppDataSource } from "../../../data/pg";
import { FlightEntity } from "../../flights/adapters/flight.entity";
import { UserEntity } from "../../users/adapters/user.entity";
import { UserFlightRepo } from "../models/userFlight.repository";
import { UserFlightEntity } from "./userFlight.entity";


export class UserFlightPgRepo implements UserFlightRepo {

    private repository = AppDataSource.getRepository(UserFlightEntity);

    findAll(): Promise<UserFlightEntity[]> {
        return this.repository.find();
    }

    async findAllPaginated(limit: number, offset: number): Promise<{ userFlight: UserFlightEntity[], total: number }> {
        const [userFlight, total] = await this.repository.findAndCount({
            take: limit,
            skip: offset,
        });

        return { userFlight, total };
    }

    async findById(id: string): Promise<UserFlightEntity | null> {
        return this.repository.findOneBy({ id });
    }

    async create(userFlight: UserFlightEntity): Promise<UserFlightEntity> {
        return this.repository.save(userFlight);
    }

    async update(id: string, userFlight: Partial<UserFlightEntity>): Promise<UserFlightEntity | null> {
        await this.repository.update(id, userFlight);
        return this.repository.findOneBy({ id });
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.repository.delete(id);
        return result.affected !== 0;
    }

    async isSeatAvailable(flightId: number, seatNumber: number): Promise<boolean> {
        const existingBooking = await this.repository.findOne({ where: { flight: { id: flightId }, numberOfSeats: seatNumber } });
        return !existingBooking;
    }

    async bookFlight(user: UserEntity, flight: FlightEntity, seatNumber: number): Promise<UserFlightEntity> {
        const newBooking = this.repository.create({ user, flight, numberOfSeats: seatNumber });
        return await this.repository.save(newBooking);
    }
}
