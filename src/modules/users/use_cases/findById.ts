import { User } from "../models/user.model";
import { UserRepo } from "../models/user.repository";

export class FindUserByIdUseCase {
    constructor(private readonly repository: UserRepo) { }

    public run = async (id: number): Promise<User | null> => {

        const user = await this.repository.findById(id);

        if (!user) {
            return null; 
        }
        
        user.password = ""
        return user
    };
}