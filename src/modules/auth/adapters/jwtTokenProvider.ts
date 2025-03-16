import * as jwt from "jsonwebtoken";
import { TokenProvider } from "../models/providers/tokenProvider";
import { Token } from "../models/models/token.model";
import { ExpiredToken } from "../models/errors/expired.error";
import { InvalidCredentials } from "../models/errors/credential.error";
import { User } from "../../users/models/user.model";
import { SECRET } from "../../../config/vars";

export default class JWTProvider implements TokenProvider {
  getPayload(token: string): Token {
    const payload = jwt.verify(token, SECRET);
    return payload as Token;
  }

  validate(token: string): void {
    console.log(token);
    
    try {
      jwt.verify(token, SECRET);
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new ExpiredToken();
      }
      console.log(error);
      
      throw new InvalidCredentials();
    }
  }

  generateToken(user: User, expiration: number): string {
    console.log(user);
    
    return jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      SECRET,
      {
        expiresIn: `${expiration}s`,
      },
    );
  }
}
