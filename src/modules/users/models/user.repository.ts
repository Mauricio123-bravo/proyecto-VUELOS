import { User } from "./user.model";

export interface UserRepo {
  findAll(): Promise<User[]>;
  findByEmail(email: string): Promise<User | null>;
  findAllPaginated(limit: number, offset: number): Promise<{ users: User[], total: number }>;
}
