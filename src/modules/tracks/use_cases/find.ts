import { Track } from "../models/track.model";
import { TrackRepo } from "../models/track.repository";

export class FindTracksUseCase {
  constructor(private readonly repository: TrackRepo) {}

  public run = async (): Promise<Track[]> => {
    return await this.repository.findAll();
  };
}
