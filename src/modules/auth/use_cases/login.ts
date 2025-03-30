import { SessionRepo } from "../models/session.repository";
import { EncryptionProvider } from "../models/providers/encryptionProvider";
import { TokenProvider } from "../models/providers/tokenProvider";
import { InvalidCredentials } from "../models/errors/credential.error";
import { UserRepo } from "../../users/models/user.repository";
import { User, UserResponse } from "../../users/models/user.model";
import {
  ACCESS_EXPIRATION_TIME,
  REFRESH_EXPIRATION_TIME,
} from "../../../config/vars";
import { ServerError } from "../../shared/errors/server.error";
import { BadRequest } from "../../shared/errors/bad_request.error";

export default class LoginUseCase {
  constructor(
    private readonly userRepository: UserRepo,
    private readonly sessionRepository: SessionRepo,
    private readonly encryption: EncryptionProvider,
    private readonly token: TokenProvider,
  ) {}

  async login(
    { email, password }: User,
    ip: string,
  ): Promise<{ access: string; refresh: string; userDB: UserResponse }> {
    const user = await this.validateUser(email, password);
    const { access, refresh } = this.generateTokens(user);

    await this.saveSession(user, refresh, ip);
    const { password: _password, ...userResponse } = user;
    return { access, refresh, userDB: userResponse };
  }

  private async validateUser(email: string, password: string): Promise<User> {
    if (!email || !password) throw new BadRequest();

    const user = await this.userRepository.findByEmail(email);
    if (!user || !this.encryption.verifyHash(password, user.password)) {
      throw new InvalidCredentials();
    }
    return user;
  }

  private generateTokens(user: User): { access: string; refresh: string } {
    const refresh = this.token.generateToken(user, REFRESH_EXPIRATION_TIME);
    const access = this.token.generateToken(user, ACCESS_EXPIRATION_TIME);
    return { access, refresh };
  }

  private async saveSession(
    user: User,
    refresh: string,
    ip: string,
  ): Promise<void> {
    try {
      await this.sessionRepository.save({
        id: 0,
        token: refresh,
        user: user,
        revoked: false,
        ipAddress: ip,
      });
    } catch (err) {
      throw new ServerError();
    }
  }
}
