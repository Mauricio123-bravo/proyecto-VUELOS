import { SessionRepo } from "../models/session.repository";
import { EncryptionProvider } from "../models/providers/encryptionProvider";
import { TokenProvider } from "../models/providers/tokenProvider";
import { InvalidCredentials } from "../models/errors/credential.error";
import { UserRepo } from "../../users/models/user.repository";
import { User } from "../../users/models/user.model";
import { ACCESS_EXPIRATION_TIME, REFRESH_EXPIRATION_TIME } from "../../../config/vars";

export default class LoginUseCase {
  constructor(
    private readonly userRepository: UserRepo,
    private readonly sessionRepository: SessionRepo,
    private readonly encryption: EncryptionProvider,
    private readonly token: TokenProvider,
  ) {}

  async login({
    email,
    password,
  }: User, ip: string): Promise<{ access: string; refresh: string }> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      console.log("user not found");
      throw new InvalidCredentials();
    }

    const valid = this.encryption.verifyHash(password, user.password);
    if (!valid) {
      console.log("invalid hash");

      throw new InvalidCredentials();
    }

    try {
      const refresh = this.token.generateToken(user, REFRESH_EXPIRATION_TIME);
      const access = this.token.generateToken(user, ACCESS_EXPIRATION_TIME);

      await this.sessionRepository.save({
        id: 0,
        token: refresh,
        user: user,
        revoked: false,
        ipAddress: ip,
      });

      return { access, refresh };
    } catch (err) {
      console.log("error saving session");
      return { access: "empty", refresh: "empty" };
    }
  }
}
