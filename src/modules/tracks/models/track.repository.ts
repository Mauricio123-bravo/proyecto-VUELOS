import { Track } from "./track.model";


export interface TrackRepo{
    findAll(): Promise<Track[]>
}