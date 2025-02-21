
import { AppDataSource } from "../../../data/pg";
import { PilotRepo } from "../models/pilot.repository";
import { Pilot } from "../models/pilot.model";
import { PilotEntity } from "./pilot.entity";


export class PilotPgRepo implements PilotRepo{

    private repository = AppDataSource.getRepository(PilotEntity);

    async findAll(): Promise<PilotEntity[]> {
        return this.repository.find();
    }

    async findAllPaginated(limit: number, offset: number): Promise<{ pilots: PilotEntity[], total: number }> {
        const [pilots, total] = await this.repository.findAndCount({
            take: limit,  // Límite de registros por página
            skip: offset, // Desde qué registro empezar
        });

        return { pilots, total };
    }
}
