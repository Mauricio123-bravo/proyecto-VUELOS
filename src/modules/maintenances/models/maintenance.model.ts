import { Airplane } from "../../airplanes/models/airplane.model";

export abstract class Maintenance{
    id: number;
    date: Date;
    description: string; 
    status: boolean;
    airplane: Airplane

}