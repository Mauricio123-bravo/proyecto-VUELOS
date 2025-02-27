import { Track } from "../models/track.model";
import { TrackRepo } from "../models/track.repository";

export class FindTrackByIdUseCase {
    constructor(private readonly repository: TrackRepo) { }

    public run = async (id: number): Promise<Track | null> => {
        return this.repository.findById(id);
    };
}