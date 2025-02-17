import { AppDataSource } from "../../../data/pg";
import { Track } from "../models/track.model";
import { TrackRepo } from "../models/track.repository";
import { TrackEntity } from "./track.entity";

export class TrackPgRepo implements TrackRepo {
  private repository = AppDataSource.getRepository(TrackEntity);

  findAll(): Promise<Track[]> {
    return this.repository.find();
  }
}
