import { User } from "./user.model";

export interface UserRepo {
  findAll(): Promise<User[]>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: number): Promise<User | null>; 
  save(user: User): Promise<number>;
  findAllPaginated(limit: number, offset: number): Promise<{ users: User[], total: number }>;
  update(user: User): Promise<void>; 

}
