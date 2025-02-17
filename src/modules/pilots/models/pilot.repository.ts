import { Pilot } from "./pilot.model";

export interface PilotRepo{
    findAll(): Promise<Pilot[]>
}