import { Track } from "../models/track.model";
import { TrackRepo } from "../models/track.repository";

export class UpdateTrackUseCase {
    constructor(private readonly repository: TrackRepo) { }

    public async run(id: number, track: Partial<Track>): Promise<Track | null> {
        return this.repository.update(id, track);
    }
}
