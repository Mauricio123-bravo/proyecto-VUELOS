
import { UserRole } from "../../users/models/userRol.model";
import { User } from "../../users/models/user.model";
import { UserRepo } from "../../users/models/user.repository";

export class ChangeRoleUseCase {
    constructor(private readonly userRepo: UserRepo) { }

    async change(userId: number, newRole: UserRole): Promise<User | null> {

        if (![UserRole.ADMIN, UserRole.PILOT, UserRole.USER].includes(newRole)) {
            throw new Error("Invalid role");
        }

        const user = await this.userRepo.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }

        user.role = newRole;


        await this.userRepo.update(user);
        user.password=""
        return user
    }
}
