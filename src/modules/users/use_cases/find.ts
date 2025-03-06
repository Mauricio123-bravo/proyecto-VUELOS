import { getPagination, getTotalPages } from "../../shared/utils/getPagination";
import { User } from "../models/user.model";
import { UserRepo } from "../models/user.repository";

export class FindUsersUseCase {
  constructor(private readonly repository: UserRepo,
  ) { }

  public run = async (page: number, limit: number): Promise<{ data: User[], total: number, totalPages: number }> => {

    const offset = getPagination(page, limit);

    const response = await this.repository.findAllPaginated(limit, offset);

    response.users.forEach(user => user.password = "");

    return getTotalPages<User>(response.total, response.users, limit);
  };
}
