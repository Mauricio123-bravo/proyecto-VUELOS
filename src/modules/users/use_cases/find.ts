import { User } from "../models/user.model";
import { UserRepo } from "../models/user.repository";

export class FindUsersUseCase {
  constructor(private readonly repository: UserRepo) {}

  public run = async (): Promise<User[]> => {
    return await this.repository.findAll();
  };
}
