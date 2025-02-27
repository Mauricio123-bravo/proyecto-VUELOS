
import { AppDataSource } from "../../../data/pg";
import { PilotRepo } from "../models/pilot.repository";
import { Pilot } from "../models/pilot.model";
import { PilotEntity } from "./pilot.entity";


export class PilotPgRepo implements PilotRepo {

    private repository = AppDataSource.getRepository(PilotEntity);

    async findAll(): Promise<PilotEntity[]> {
        return this.repository.find();
    }

    async findAllPaginated(limit: number, offset: number): Promise<{ pilots: PilotEntity[], total: number }> {
        const [pilots, total] = await this.repository.findAndCount({
            take: limit,
            skip: offset,
        });

        return { pilots, total };
    }

    async findById(id: number): Promise<PilotEntity | null> {
        return this.repository.findOneBy({ id });
    }

    async create(pilot: PilotEntity): Promise<PilotEntity> {
        return this.repository.save(pilot);
    }

    async update(id: number, pilot: Partial<PilotEntity>): Promise<PilotEntity | null> {
        await this.repository.update(id, pilot);
        return this.repository.findOneBy({ id });
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.repository.delete(id);
        return result.affected !== 0;
    }

}
