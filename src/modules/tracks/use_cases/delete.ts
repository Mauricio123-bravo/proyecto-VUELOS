import { TrackRepo } from "../models/track.repository";

export class DeleteTrackUseCase {
    constructor(private readonly repository: TrackRepo) { }

    public async run(id: number): Promise<boolean> {
        return this.repository.delete(id);
    }
}   