import { Equal } from "typeorm";
import { AppDataSource } from "../../../data/pg";
import { User } from "../models/user.model";
import { UserRepo } from "../models/user.repository";
import { UserEntity } from "./user.entity";

export class UserPgRepo implements UserRepo {
  async save(user: User): Promise<number> {
    return (await this.repository.save(user)).id;
  }
  private repository = AppDataSource.getRepository(UserEntity);

  findAll(): Promise<User[]> {
    return this.repository.find();
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.repository.findOneBy({ email: Equal(email) });
    return user
  }

  async findById(id: number): Promise<UserEntity | null> {
    return this.repository.findOneBy({ id });
  }

  async findAllPaginated(limit: number, offset: number): Promise<{ users: UserEntity[], total: number }> {
    const [users, total] = await this.repository.findAndCount({
      take: limit,  // Límite de registros por página
      skip: offset, // Desde qué registro empezar
    });

    return { users, total };
  }

  async update(user: User): Promise<void> {
    const userToUpdate = await this.repository.findOneBy({ id: user.id });

    if (!userToUpdate) {
      throw new Error("User Not Found")
    }

    await this.repository.update({ id: user.id }, user);
  }
}
