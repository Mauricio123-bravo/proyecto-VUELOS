import LoginUseCase from "../login";
import { InvalidCredentials } from "../../models/errors/credential.error";
import { User } from "../../../users/models/user.model";
import { ServerError } from "../../../shared/errors/server.error";

import { UserPgRepo } from "../../../users/adapters/user.repo";
import { SessionPgRepo } from "../../adapters/session.repo";
import JWTProvider from "../../adapters/jwtTokenProvider";
import BcryptProvider from "../../adapters/bcryptEncryptionProvider";
import { LoginUser } from "../../models/models/user.model";
import { UserRole } from "../../../users/models/userRol.model";
import { BadRequest } from "../../../shared/errors/bad_request.error";

jest.mock("../../models/session.repository");
jest.mock("../../models/providers/encryptionProvider");
jest.mock("../../models/providers/tokenProvider");
jest.mock("../../../users/models/user.repository");

describe("LoginUseCase", () => {
  let loginUseCase: LoginUseCase;
  let userRepository: jest.Mocked<UserPgRepo>;
  let sessionRepository: jest.Mocked<SessionPgRepo>;
  let encryption: jest.Mocked<BcryptProvider>;
  let token: jest.Mocked<JWTProvider>;

  beforeEach(() => {
    userRepository = {
      findByEmail: jest.fn(),
    } as unknown as jest.Mocked<UserPgRepo>;

    sessionRepository = {
      save: jest.fn(),
    } as unknown as jest.Mocked<SessionPgRepo>;

    token = {
      generateToken: jest.fn(),
    } as unknown as jest.Mocked<JWTProvider>;

    encryption = {
      verifyHash: jest.fn(),
    } as unknown as jest.Mocked<BcryptProvider>;

    loginUseCase = new LoginUseCase(
      userRepository,
      sessionRepository,
      encryption,
      token,
    );
  });

  it("should login successfully with valid credentials", async () => {
    const user: User = {
      email: "test@example.com",
      password: "hashedPassword",
      id: 1,
      username: "juan",
      role: UserRole.USER,
      userFlight: [],
    };

    userRepository.findByEmail.mockResolvedValue(user);
    encryption.verifyHash.mockReturnValue(true);
    token.generateToken.mockReturnValue("token");

    const credentials = { email: "test@example.com", password: "password" };
    const result = await loginUseCase.login(credentials as User, "127.0.0.1");

    expect(result).toEqual({
      access: "token",
      refresh: "token",
      userDB: {
        id: 1,
        email: "test@example.com",
        password: undefined,
        username: "juan",
        role: UserRole.USER,
        userFlight: [],
      },
    });
    expect(sessionRepository.save).toHaveBeenCalled();
  });

  it("should throw BadRequest error when email is undefined", async () => {
    const credentials = { password: "password" } as User;
    await expect(loginUseCase.login(credentials, "127.0.0.1")).rejects.toThrow(
      BadRequest,
    );
  });

  it("should throw BadRequest error when password is undefined", async () => {
    const credentials = { email: "test@example.com" } as User;
    await expect(loginUseCase.login(credentials, "127.0.0.1")).rejects.toThrow(
      BadRequest,
    );
  });

  it("should throw InvalidCredentials error with invalid credentials", async () => {
    userRepository.findByEmail.mockResolvedValue(null);

    const credentials = { email: "test@example.com", password: "password" };
    await expect(
      loginUseCase.login(credentials as User, "127.0.0.1"),
    ).rejects.toThrow(InvalidCredentials);
  });

  it("should throw ServerError if session saving fails", async () => {
    const user: LoginUser = {
      email: "test@example.com",
      password: "hashedPassword",
    };
    userRepository.findByEmail.mockResolvedValue(user as User);
    encryption.verifyHash.mockReturnValue(true);
    token.generateToken.mockReturnValue("token");
    sessionRepository.save.mockRejectedValue(new Error("DB error"));

    const credentials = { email: "test@example.com", password: "password" };

    await expect(
      loginUseCase.login(credentials as User, "127.0.0.1"),
    ).rejects.toThrow(ServerError);
  });
});
