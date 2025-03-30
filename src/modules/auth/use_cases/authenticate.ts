import { SessionRepo } from "../models/session.repository";
import { TokenProvider } from "../models/providers/tokenProvider";
import { ACCESS_EXPIRATION_TIME } from "../../../config/vars";
import { ForbiddenError } from "../../shared/errors/forbidden.error";
import { InvalidCredentials } from "../models/errors/credential.error";

export class AuthenticateUseCase {
  constructor(
    private readonly sessionRepo: SessionRepo,
    private readonly tokenProvider: TokenProvider,
  ) { }

  async authenticate(token_string: string) {
    this.validateToken(token_string);
  }

  async getAccessToken(ip: string, refresh: string) {
    const session = await this.retrieveAndValidateSession(ip, refresh);
    return this.tokenProvider.generateToken(
      session.user!,
      ACCESS_EXPIRATION_TIME,
    );
  }

  private validateToken(token_string: string): void {
    this.tokenProvider.validate(token_string);
  }

  private async retrieveAndValidateSession(ip: string, refresh: string) {
    const decodedRefresh = this.tokenProvider.getPayload(refresh);
    const session = await this.sessionRepo.getSession(
      ip,
      decodedRefresh.userId,
    );

    if (!session) {
      throw new InvalidCredentials();
    }

    if (session.revoked) {
      throw new ForbiddenError();
    }

    if (!session.user) {
      throw new Error("User not found in session");
    }

    return session;
  }
}
