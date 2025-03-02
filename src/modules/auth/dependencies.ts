import { SessionPgRepo } from "./adapters/session.repo";
import { SessionRepo } from "./models/session.repository";
import LoginuseCase from "./use_cases/login";
import { EncryptionProvider } from "./models/providers/encryptionProvider";
import BcryptProvider from "./adapters/bcryptEncryptionProvider";
import JWTProvider from "./adapters/jwtTokenProvider";
import { TokenProvider } from "./models/providers/tokenProvider";
import RegisterUseCase from "./use_cases/register";
import { AuthController } from "./adapters/authController";
import AuthRouter from "./adapters/authRoutes";
import { userRepository } from "../users/dependencies";
import { AuthMiddleware } from "./adapters/authMiddelware";
import { AuthenticateUseCase } from "./use_cases/authenticate";

const sessionRepo: SessionRepo = new SessionPgRepo();
const encryptionProvider: EncryptionProvider = new BcryptProvider();
const tokenProvider: TokenProvider = new JWTProvider();

const loginUseCase = new LoginuseCase(
  userRepository,
  sessionRepo,
  encryptionProvider,
  tokenProvider,
);

const registerUseCase = new RegisterUseCase(userRepository, encryptionProvider);
const authUseCase = new AuthenticateUseCase(sessionRepo, tokenProvider)

const authController = new AuthController(loginUseCase, registerUseCase);
const authRouter = new AuthRouter(authController)
const authMiddleware = new AuthMiddleware(authUseCase)

export { authRouter, authMiddleware };
