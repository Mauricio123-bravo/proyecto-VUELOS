import { InvalidCredentials } from "@auth/models/credentialError";
import { EncryptionProvider } from "@auth/models/encryptionProvider";
import { TokenProvider } from "@auth/models/tokenProvider";
import { User } from "@users/models/user.model";
import { UserRepo } from "@users/models/user.repository";

export default class Login {
  constructor(
    private readonly userRepository: UserRepo,
    private readonly encryption: EncryptionProvider,
    private readonly token: TokenProvider,
  ) {}

  async login({ email, password }: User): Promise<string> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new InvalidCredentials();
    }

    const valid = this.encryption.verifyHash(password, user.password);
    if (!valid) {
      throw new InvalidCredentials();
    }

    return this.token.getToken(user);
  }
}
