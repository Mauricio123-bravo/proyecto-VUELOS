import { AuthMiddleware } from "../auth/adapters/authMiddelware";
import JWTProvider from "../auth/adapters/jwtTokenProvider";
import { SessionPgRepo } from "../auth/adapters/session.repo";
import { TokenProvider } from "../auth/models/providers/tokenProvider";
import { SessionRepo } from "../auth/models/session.repository";
import { AuthenticateUseCase } from "../auth/use_cases/authenticate";
import { UserPgRepo } from "./adapters/user.repo";
import { UserController } from "./adapters/userController";
import UserRouter from "./adapters/userRouter";
import { UserRepo } from "./models/user.repository";
import { FindUsersUseCase } from "./use_cases/find";
import { FindUserByIdUseCase } from "./use_cases/findById";

const userRepository: UserRepo = new UserPgRepo();

const findUsersUseCase: FindUsersUseCase = new FindUsersUseCase(
    userRepository
);
const findByIdUseCase: FindUserByIdUseCase = new FindUserByIdUseCase(
    userRepository
)
const userController: UserController = new UserController(
    findUsersUseCase, findByIdUseCase
);
const sessionRepo: SessionRepo = new SessionPgRepo();
const tokenProvider: TokenProvider = new JWTProvider();
const authUseCase: AuthenticateUseCase = new AuthenticateUseCase(sessionRepo, tokenProvider)

const jWTProvider: JWTProvider = new JWTProvider()

const authMiddleware = new AuthMiddleware(authUseCase, jWTProvider);
const userRouter: UserRouter = new UserRouter(userController, authMiddleware);

export { userRepository, userRouter };
