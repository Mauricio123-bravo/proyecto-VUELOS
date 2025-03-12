import { Runway } from "../../runways/models/runway.model";

export abstract class Located {
    id: number;
    longitude: number;
    latitude: number;
    name:string;
    runways: Runway[];

}