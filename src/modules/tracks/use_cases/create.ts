import { Track } from "../models/track.model";
import { TrackRepo } from "../models/track.repository";

export class CreateTrackUseCase {
    constructor(private readonly repository: TrackRepo) { }

    public async run(track: Track): Promise<Track> {
        return this.repository.create(track);
    }
}