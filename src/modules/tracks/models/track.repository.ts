import { Track } from "./track.model";


export interface TrackRepo {
    findAll(): Promise<Track[]>
    findAllPaginated(limit: number, offset: number): Promise<{ tracks: Track[], total: number }>;
    findById(id: number): Promise<Track | null>;
    create(track: Track): Promise<Track>;
    update(id: number, track: Partial<Track>): Promise<Track | null>;
    delete(id: number): Promise<boolean>;
}