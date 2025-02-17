import { AppDataSource } from "../../../data/pg";
import { User } from "../models/user.model";
import { UserRepo } from "../models/user.repository";
import { UserEntity } from "./user.entity";

export class UserPgRepo implements UserRepo {
  private repository = AppDataSource.getRepository(UserEntity);

  findAll(): Promise<User[]> {
    return this.repository.find();
  }
}
