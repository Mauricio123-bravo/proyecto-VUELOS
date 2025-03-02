import { SessionRepo } from "../models/session.repository";
import { TokenProvider } from "../models/providers/tokenProvider";

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

    const time = 60 * 60;
    return this.tokenProvider.generateToken(session.user!, time);
  }
}
