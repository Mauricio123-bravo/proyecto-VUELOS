import * as jwt from "jsonwebtoken";
import { TokenProvider } from "../models/tokenProvider";
import { Token } from "../models/token.model";
import { ExpiredToken } from "../models/expired.error";
import { InvalidCredentials } from "../models/credential.error";
import { User } from "../../users/models/user.model";
import { SECRET } from "../../../config/vars";

export default class JWTProvider implements TokenProvider {
  getPayload(token: string): Token {
    const payload = jwt.verify(token, SECRET);
    return payload as Token;
  }

  validate(token: string): void {
    try {
      jwt.verify(token, SECRET);
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new ExpiredToken();
      }
      throw new InvalidCredentials();
    }
  }

  generateToken(user: User, expiration: number): string {

    return jwt.sign({ id: user.id, email: user.email }, SECRET, {
      expiresIn: expiration,
    });
  }
}
