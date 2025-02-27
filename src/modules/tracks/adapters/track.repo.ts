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
  async findById(id: number): Promise<TrackEntity | null> {
    return this.repository.findOneBy({ id });
  }

  async create(track: TrackEntity): Promise<TrackEntity> {
    return this.repository.save(track);
  }

  async update(id: number, track: Partial<TrackEntity>): Promise<TrackEntity | null> {
    await this.repository.update(id, track);
    return this.repository.findOneBy({ id });
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected !== 0;
  }
}
