import { Equal } from "typeorm";
import { AppDataSource } from "../../../data/pg";
import { User } from "../models/user.model";
import { UserRepo } from "../models/user.repository";
import { UserEntity } from "./user.entity";

export class UserPgRepo implements UserRepo {
  private repository = AppDataSource.getRepository(UserEntity);

  findAll(): Promise<User[]> {
    return this.repository.find();
  }

  findByEmail(email: string): Promise<User | null> {
    return this.repository.findOneBy({ email: Equal(email) });
  }
}
