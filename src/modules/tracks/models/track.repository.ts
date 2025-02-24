import { Track } from "./track.model";


export interface TrackRepo {
    findAll(): Promise<Track[]>
    findAllPaginated(limit: number, offset: number): Promise<{ tracks: Track[], total: number }>;
}