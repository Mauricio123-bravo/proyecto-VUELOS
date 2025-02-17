
import { AppDataSource } from "../../../data/pg";
import { PilotRepo } from "../models/pilot.repository";
import { Pilot } from "../models/pilot.model";
import { PilotEntity } from "./pilot.entity";


export class PilotPgRepo implements PilotRepo{

    private repository = AppDataSource.getRepository(PilotEntity)
    findAll(): Promise<Pilot[]> {
        return this.repository.find();
    }
}
