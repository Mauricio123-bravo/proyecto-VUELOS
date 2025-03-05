
import { AppDataSource } from "../../../data/pg";
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

    async findById(id: number): Promise<UserFlightEntity | null> {
        return this.repository.findOneBy({ id });
    }

    async create(userFlight: UserFlightEntity): Promise<UserFlightEntity> {
        return this.repository.save(userFlight);
    }

    async update(id: number,userFlight: Partial<UserFlightEntity>): Promise<UserFlightEntity | null> {
        await this.repository.update(id, userFlight);
        return this.repository.findOneBy({ id });
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.repository.delete(id);
        return result.affected !== 0;
    }

}
