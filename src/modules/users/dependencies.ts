import { UserPgRepo } from "./adapters/user.repo";
import { UserController } from "./adapters/userController";
import UserRouter from "./adapters/userRouter";
import { UserRepo } from "./models/user.repository";
import { FindUsersUseCase } from "./use_cases/find";

const userRepository: UserRepo = new UserPgRepo();
const findUsersUseCase: FindUsersUseCase = new FindUsersUseCase(
    userRepository,
);
const userController: UserController = new UserController(
    findUsersUseCase,
);
const userRouter: UserRouter= new UserRouter(userController);

export { userRouter };
