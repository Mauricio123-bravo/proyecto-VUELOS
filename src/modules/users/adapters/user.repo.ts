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

  async findAllPaginated(limit: number, offset: number): Promise<{ users: UserEntity[], total: number }> {
    const [users, total] = await this.repository.findAndCount({
      take: limit,  // Límite de registros por página
      skip: offset, // Desde qué registro empezar
    });

    return { users, total };
  }
}
