import { AppDataSource } from "../../../data/pg";
import { Track } from "../models/track.model";
import { TrackRepo } from "../models/track.repository";
import { TrackEntity } from "./track.entity";

export class TrackPgRepo implements TrackRepo {
  private repository = AppDataSource.getRepository(TrackEntity);

  findAll(): Promise<Track[]> {
    return this.repository.find();
  }
  async findAllPaginated(limit: number, offset: number): Promise<{ tracks: TrackEntity[], total: number }> {
    const [tracks, total] = await this.repository.findAndCount({
      take: limit,  // Límite de registros por página
      skip: offset, // Desde qué registro empezar
    });

    return { tracks, total };
  }
}
