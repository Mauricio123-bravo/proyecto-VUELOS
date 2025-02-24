import { getPagination, getTotalPages } from "../../shared/utils/getPagination";
import { Track } from "../models/track.model";
import { TrackRepo } from "../models/track.repository";

export class FindTracksUseCase {
  constructor(private readonly repository: TrackRepo) { }

  public run = async (page: number, limit: number): Promise<{ data: Track[], total: number, totalPages: number }> => {

    const offset = getPagination(page, limit);

    const response = await this.repository.findAllPaginated(limit, offset);

    return getTotalPages<Track>(response.total, response.tracks, limit);
  };
}
