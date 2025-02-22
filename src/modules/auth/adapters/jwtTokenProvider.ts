import * as jwt from "jsonwebtoken";
import { SECRET } from "@config/vars";
import { TokenProvider } from "@auth/models/tokenProvider";
import { Token } from "@auth/models/token";
import { User } from "@users/models/user.model";

export default class JWTProvider implements TokenProvider {
  getPayload(token: string): Token {
    const payload = jwt.verify(token, SECRET);
    return payload as Token;
  }

  validate(token: string): boolean {
    try {
      jwt.verify(token, SECRET);
      return true;
    } catch {
      return false;
    }
  }

  getToken(user: User): string {
    return jwt.sign({ id: user.id, email: user.email }, SECRET, {
      expiresIn: "8h",
    });
  }
}
