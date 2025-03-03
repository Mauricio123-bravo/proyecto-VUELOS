import { SessionRepo } from "../models/session.repository";
import { TokenProvider } from "../models/providers/tokenProvider";
import { REFRESH_EXPIRATION_TIME } from "../../../config/vars";

export class AuthenticateUseCase {
  constructor(
    private readonly sessionRepo: SessionRepo,
    private readonly tokenProvider: TokenProvider,
  ) {}

  async authenticate(token_string: string) {
    this.tokenProvider.validate(token_string);
  }

  async getAccessToken(ip: string, refresh: string) {
    const decodedRefresh = this.tokenProvider.getPayload(refresh);
    const session = await this.sessionRepo.getSession(
      ip,
      decodedRefresh.userId,
    );

    if (session.revoked) {
      throw new Error("Forbidden");
    }

    return this.tokenProvider.generateToken(session.user!, REFRESH_EXPIRATION_TIME);
  }
}
